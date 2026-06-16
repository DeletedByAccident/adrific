/* =====================================================================
   AdRific — "The Drawing"
   Progressive enhancement only. The page is complete and contactable
   with this file absent. See PRODUCT.md / DESIGN.md.
   ===================================================================== */
(function () {
    'use strict';

    var docEl = document.documentElement;
    docEl.classList.add('js'); // also set inline in <head>; harmless to repeat
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    /* ---------------------------------------------------------------
       Mobile navigation
    --------------------------------------------------------------- */
    (function nav() {
        var toggle = document.querySelector('.nav__toggle');
        var menu = document.getElementById('nav-menu');
        if (!toggle || !menu) return;

        function setOpen(open) {
            toggle.setAttribute('aria-expanded', String(open));
            toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
            menu.dataset.open = String(open);
        }
        setOpen(false);

        toggle.addEventListener('click', function () {
            setOpen(toggle.getAttribute('aria-expanded') !== 'true');
        });
        menu.addEventListener('click', function (e) {
            if (e.target.closest('a')) setOpen(false);
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
                setOpen(false);
                toggle.focus();
            }
        });
    })();

    /* ---------------------------------------------------------------
       Reveal on scroll — enhances an already-visible default
    --------------------------------------------------------------- */
    (function reveals() {
        if (reduceMotion.matches) return; // content stays visible, no pre-hide

        var belowFold = document.querySelectorAll(
            '.work .section-head, .work .plate, .services .section-head, ' +
            '.capabilities .cap, .services__throughline, .studio__inner, ' +
            '.contact__inner, .title-block'
        );
        Array.prototype.forEach.call(belowFold, function (el) { el.classList.add('reveal'); });

        var plate = document.querySelector('.hero__plate');
        if (plate) plate.style.setProperty('--reveal-delay', '120ms');
        stagger(document.querySelectorAll('.work .plate'), 70);
        stagger(document.querySelectorAll('.capabilities .cap'), 90);

        var items = document.querySelectorAll('.reveal');
        if (!('IntersectionObserver' in window)) {
            Array.prototype.forEach.call(items, function (el) { el.classList.add('is-visible'); });
            return;
        }
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) {
                    e.target.classList.add('is-visible');
                    io.unobserve(e.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });
        Array.prototype.forEach.call(items, function (el) { io.observe(el); });

        // Failsafe: never let a reveal stay hidden (crawlers, headless renderers,
        // hidden tabs, or a user who simply doesn't scroll). Reveal anything still
        // pending a short while after load. The on-scroll effect fires first.
        window.addEventListener('load', function () {
            setTimeout(function () {
                Array.prototype.forEach.call(
                    document.querySelectorAll('.reveal:not(.is-visible)'),
                    function (el) { el.classList.add('is-visible'); }
                );
            }, 2500);
        });

        function stagger(nodes, step) {
            Array.prototype.forEach.call(nodes, function (el, i) {
                el.style.setProperty('--reveal-delay', (i * step) + 'ms');
            });
        }
    })();

    /* ---------------------------------------------------------------
       Generative hero — a parametric isometric lattice that draws
       itself in green ink, then breathes. Canvas 2D, no dependencies.
    --------------------------------------------------------------- */
    (function hero() {
        if (reduceMotion.matches) return; // keep the static SVG schematic

        var canvas = document.querySelector('.hero__canvas');
        if (!canvas) return;
        var ctx = canvas.getContext('2d');
        if (!ctx) return;

        var cs = getComputedStyle(document.body);
        function tok(name, fallback) {
            var v = cs.getPropertyValue(name).trim();
            return v || fallback;
        }
        var COL = {
            line: tok('--green-500', '#2f8f63'),
            node: tok('--green-700', '#246b4a'),
            dim: tok('--ink-muted', '#5c685f'),
            signal: tok('--signal', '#df5a37'),
            grid: tok('--grid-line', '#dde7e0')
        };

        var COLS = 13, ROWS = 13;
        var edges = buildEdges();          // sorted for a diagonal draw-in sweep
        var nodes = [];                    // projected positions, refreshed per frame

        var W = 0, H = 0, DPR = 1;
        var t0 = null, progress = 0;
        var REVEAL_MS = 1700;
        var px = 0, py = 0, tpx = 0, tpy = 0; // pointer parallax (current / target)
        var rafId = null, visible = true, drewOnce = false;

        function buildEdges() {
            var e = [];
            for (var j = 0; j < ROWS; j++) {
                for (var i = 0; i < COLS; i++) {
                    if (i < COLS - 1) e.push([i, j, i + 1, j]);
                    if (j < ROWS - 1) e.push([i, j, i, j + 1]);
                }
            }
            e.sort(function (a, b) { return (a[0] + a[1]) - (b[0] + b[1]); });
            return e;
        }

        function resize() {
            DPR = Math.min(window.devicePixelRatio || 1, 2);
            var r = canvas.getBoundingClientRect();
            W = Math.max(1, r.width); H = Math.max(1, r.height);
            canvas.width = Math.round(W * DPR);
            canvas.height = Math.round(H * DPR);
            ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
        }

        function project(i, j, t) {
            var gx = i / (COLS - 1) - 0.5;
            var gy = j / (ROWS - 1) - 0.5;
            var z = Math.sin(gx * 4.2 + t * 0.55) * Math.cos(gy * 4.2 + t * 0.4) * 0.11;
            var scale = Math.min(W, H) * 0.86;
            var isoX = (gx - gy) * Math.cos(0.52);
            var isoY = (gx + gy) * Math.sin(0.52) - z;
            return [
                W / 2 + isoX * scale + px * 20,
                H * 0.5 + isoY * scale + py * 14,
                z
            ];
        }

        function refreshNodes(t) {
            for (var j = 0; j < ROWS; j++) {
                for (var i = 0; i < COLS; i++) {
                    nodes[j * COLS + i] = project(i, j, t);
                }
            }
        }
        function P(i, j) { return nodes[j * COLS + i]; }

        function draw(ts) {
            rafId = null;
            if (W < 2 || H < 2) { schedule(); return; } // size not ready yet
            if (t0 === null) t0 = ts;
            var elapsed = ts - t0;
            progress = Math.min(1, elapsed / REVEAL_MS);
            var eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
            var t = elapsed / 1000;

            // pointer parallax easing
            px += (tpx - px) * 0.06;
            py += (tpy - py) * 0.06;

            refreshNodes(t);
            ctx.clearRect(0, 0, W, H);

            // faint internal construction grid
            drawBackGrid();

            // lattice edges (progressive during reveal, full after)
            var shown = eased * edges.length;
            var full = Math.floor(shown);
            var frac = shown - full;

            ctx.lineWidth = 1.1;
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
            ctx.strokeStyle = COL.line;
            for (var k = 0; k < full && k < edges.length; k++) strokeEdge(edges[k], 1);
            var lead = null;
            if (full < edges.length && frac > 0) {
                strokeEdge(edges[full], frac);
                lead = edges[full];
            }

            // nodes (fade in with reveal)
            ctx.fillStyle = COL.node;
            var nodeShown = Math.floor(eased * COLS * ROWS);
            var shownCount = 0;
            for (var jj = 0; jj < ROWS; jj++) {
                for (var ii = 0; ii < COLS; ii++) {
                    if (shownCount++ > nodeShown) break;
                    var p = P(ii, jj);
                    ctx.beginPath();
                    ctx.arc(p[0], p[1], 1.4, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            // dimension annotations (after the structure is mostly drawn)
            if (eased > 0.55) drawDimensions((eased - 0.55) / 0.45);

            // the coral pen tip
            drawPen(t, eased, lead);

            drewOnce = true;
            // keep animating: reveal not finished, OR ambient breathing
            schedule();
        }

        function strokeEdge(e, frac) {
            var a = P(e[0], e[1]); var b = P(e[2], e[3]);
            ctx.beginPath();
            ctx.moveTo(a[0], a[1]);
            if (frac >= 1) ctx.lineTo(b[0], b[1]);
            else ctx.lineTo(a[0] + (b[0] - a[0]) * frac, a[1] + (b[1] - a[1]) * frac);
            ctx.stroke();
        }

        function drawBackGrid() {
            ctx.save();
            ctx.strokeStyle = COL.grid;
            ctx.lineWidth = 1;
            var step = 28;
            ctx.beginPath();
            for (var x = (W / 2) % step; x < W; x += step) { ctx.moveTo(x, 0); ctx.lineTo(x, H); }
            for (var y = (H / 2) % step; y < H; y += step) { ctx.moveTo(0, y); ctx.lineTo(W, y); }
            ctx.globalAlpha = 0.5;
            ctx.stroke();
            ctx.restore();
        }

        function drawDimensions(a) {
            a = Math.min(1, a);
            var topL = P(0, 0), topR = P(COLS - 1, 0);
            // bottom span line under the lattice
            var minY = Math.max(P(0, ROWS - 1)[1], P(COLS - 1, ROWS - 1)[1]);
            var y = minY + 26;
            var x1 = P(0, ROWS - 1)[0], x2 = P(COLS - 1, ROWS - 1)[0];
            var xe = x1 + (x2 - x1) * a;
            ctx.save();
            ctx.strokeStyle = COL.dim; ctx.fillStyle = COL.dim; ctx.lineWidth = 1;
            ctx.globalAlpha = 0.85;
            ctx.beginPath();
            ctx.moveTo(x1, y); ctx.lineTo(xe, y);
            ctx.moveTo(x1, y - 4); ctx.lineTo(x1, y + 4);
            if (a > 0.98) { ctx.moveTo(x2, y - 4); ctx.lineTo(x2, y + 4); }
            ctx.stroke();
            if (a > 0.98) {
                ctx.font = '10px "Spline Sans Mono", ui-monospace, monospace';
                ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                ctx.fillText('SPAN — 12U', (x1 + x2) / 2, y + 6);
            }
            // top tie line to the apex marker
            ctx.setLineDash([3, 4]);
            ctx.beginPath();
            ctx.moveTo((topL[0] + topR[0]) / 2, (topL[1] + topR[1]) / 2);
            ctx.lineTo((topL[0] + topR[0]) / 2, 14);
            ctx.stroke();
            ctx.restore();
        }

        function drawPen(t, eased, lead) {
            var p;
            if (eased < 1 && lead) {
                p = P(lead[2], lead[3]); // leading vertex while drawing
            } else {
                // after reveal, walk the top row back and forth
                var f = (Math.sin(t * 0.5) * 0.5 + 0.5) * (COLS - 1);
                var i = Math.floor(f), fr = f - i;
                var a = P(i, 0), b = P(Math.min(i + 1, COLS - 1), 0);
                p = [a[0] + (b[0] - a[0]) * fr, a[1] + (b[1] - a[1]) * fr];
            }
            ctx.save();
            // leader line
            ctx.strokeStyle = COL.signal; ctx.lineWidth = 1.2;
            ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(p[0] + 16, p[1] - 16); ctx.stroke();
            // dot
            ctx.fillStyle = COL.signal;
            ctx.beginPath(); ctx.arc(p[0], p[1], 3.4, 0, Math.PI * 2); ctx.fill();
            // ring
            ctx.globalAlpha = 0.5;
            ctx.beginPath(); ctx.arc(p[0], p[1], 7, 0, Math.PI * 2); ctx.stroke();
            ctx.restore();
        }

        function schedule() {
            if (!rafId && visible) rafId = requestAnimationFrame(draw);
        }
        function stop() { if (rafId) { cancelAnimationFrame(rafId); rafId = null; } }

        // pointer parallax (relative to plate center)
        var plate = canvas.parentElement;
        plate.addEventListener('pointermove', function (e) {
            var r = plate.getBoundingClientRect();
            tpx = ((e.clientX - r.left) / r.width - 0.5) * 2;
            tpy = ((e.clientY - r.top) / r.height - 0.5) * 2;
        });
        plate.addEventListener('pointerleave', function () { tpx = 0; tpy = 0; });

        // pause when off-screen / tab hidden
        if ('IntersectionObserver' in window) {
            new IntersectionObserver(function (ents) {
                visible = ents[0].isIntersecting;
                if (visible) schedule(); else stop();
            }, { threshold: 0.01 }).observe(canvas);
        }
        document.addEventListener('visibilitychange', function () {
            if (document.hidden) stop(); else if (visible) schedule();
        });

        // Keep the bitmap matched to the rendered size. ResizeObserver fires
        // once layout is known (fixing the first-paint zero-size race that made
        // the canvas a 1x1 upscaled block) and on every size change thereafter.
        if ('ResizeObserver' in window) {
            var ro = new ResizeObserver(function () { resize(); schedule(); });
            ro.observe(canvas);
        } else {
            var resizeRAF = null;
            window.addEventListener('resize', function () {
                if (resizeRAF) cancelAnimationFrame(resizeRAF);
                resizeRAF = requestAnimationFrame(function () { resize(); schedule(); });
            });
        }

        // boot — defer one frame so layout (and the canvas-live display swap) settle
        docEl.classList.add('canvas-live'); // CSS reveals canvas + hides SVG only now
        requestAnimationFrame(function () { resize(); schedule(); });

        // if the user switches to reduced motion mid-session, bail out gracefully
        var onPref = function () {
            if (reduceMotion.matches) { stop(); docEl.classList.remove('canvas-live'); }
        };
        if (reduceMotion.addEventListener) reduceMotion.addEventListener('change', onPref);
    })();
})();
