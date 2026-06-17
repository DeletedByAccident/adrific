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
       Theme toggle (light / dark). Initial theme is set pre-paint by the
       inline <head> script (saved choice or system preference).
    --------------------------------------------------------------- */
    (function theme() {
        var btn = document.querySelector('.theme-toggle');
        var meta = document.querySelector('meta[name="theme-color"]');
        var COLOR = { light: '#f4f7f1', dark: '#0b0b0b' };
        function mode() { return docEl.getAttribute('data-theme') ? 'dark' : 'light'; }
        function apply(m) {
            if (m === 'dark') docEl.setAttribute('data-theme', 'dark');
            else docEl.removeAttribute('data-theme');
            if (meta) meta.setAttribute('content', COLOR[m]);
            if (btn) {
                btn.setAttribute('aria-pressed', String(m === 'dark'));
                btn.setAttribute('aria-label', m === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
            }
        }
        apply(mode()); // sync meta + button state with the pre-painted theme
        if (!btn) return;
        btn.addEventListener('click', function () {
            var next = mode() === 'dark' ? 'light' : 'dark';
            apply(next);
            try { localStorage.setItem('adrific-theme', next); } catch (e) {}
        });
    })();

    /* ---------------------------------------------------------------
       Language — EN authored in the HTML; FI is an overlay. Initial
       <html lang> is set pre-paint by the inline <head> script
       (saved choice or browser language). Finnish flagged for native
       review — see TODO.
    --------------------------------------------------------------- */
    (function i18n() {
        var q = function (s) { return document.querySelector(s); };
        var qa = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };

        var EN_TITLE = document.title;
        var FI_TITLE = 'AdRific — Digitaalinen studio Helsingissä';

        var T = []; // innerHTML targets: {el, en, fi}
        var A = []; // attribute targets: {el, name, en, fi}
        function reg(el, fi) { if (el && fi != null) T.push({ el: el, en: el.innerHTML, fi: fi }); }
        function regList(sel, arr) { qa(sel).forEach(function (el, i) { if (arr[i] != null) reg(el, arr[i]); }); }
        function attr(el, name, fi) { if (el && fi != null) A.push({ el: el, name: name, en: el.getAttribute(name), fi: fi }); }

        // Small repeated labels, matched by their English text.
        var LABELS = {
            'Type': 'Tyyppi', 'Platform': 'Alusta', 'Link': 'Linkki', 'Status': 'Tila',
            'Project': 'Projekti', 'Discipline': 'Toimiala', 'Scale': 'Mittakaava', 'Sheet': 'Lehti',
            'Drawn by': 'Piirtänyt', 'Address': 'Osoite', 'VAT': 'ALV', 'Contact': 'Yhteys',
            'Date': 'Päiväys', 'Rev': 'Ver.', 'Live': 'Käytössä', 'Beta': 'Beta', 'Internal test': 'Sisäinen testi'
        };
        qa('.plate__meta dt, .tb-cell__k, .tag').forEach(function (el) {
            var en = el.textContent.trim(); if (LABELS[en]) reg(el, LABELS[en]);
        });

        // Nav + skip link
        regList('.nav__links a', ['Työt', 'Studio', 'Ota yhteyttä']);
        reg(q('.skip-link'), 'Siirry sisältöön');

        // Hero
        reg(q('.kicker'), 'AdRific — Digitaalinen studio · Helsinki');
        reg(q('.hero__title'), 'Emme lupaile.<br><span class="hero__title-em">Me toimitamme.</span>');
        reg(q('.hero__lede'), 'Pieni studio Helsingissä. Alla on se, mitä olemme suunnitelleet, rakentaneet ja tuoneet maailmaan.');
        reg(q('.btn--stamp'), 'Katso työt <span aria-hidden="true">↓</span>');
        reg(q('.btn--ghost'), 'Ota yhteyttä');
        reg(q('.hero__caption'), 'KUVA 01 — kuusi tuotetta ja lisää tulossa, sekä valittuja asiakastöitä.');
        reg(q('.hero__plate-label'), 'RAKENNE · GENEROITU LIVENÄ');
        regList('.hero__rule .mono', ['A — STUDIO', 'VIERITÄ ↓']);

        // Work / build log
        reg(q('.work .section-head__tag'), 'Lehti A — Tuotteet käytössä');
        reg(q('#work-title'), 'Rakennusloki');
        reg(q('.work .section-head__intro'), 'Kuusi tuotetta käytössä. Suunnittelemme, rakennamme ja pyöritämme ne alusta loppuun — samalla tekniikalla ja tasolla kuin asiakastyöt.');
        regList('.work .plate .plate__desc', [
            'Takuuajan hallinta uudiskohteiden taloyhtiöille. Vapaaehtoiset hallitukset keräävät rakennusvirheet, laativat reklamaatiot eivätkä myöhästy lakisääteisistä määräajoista kymmenen vuoden vastuuaikana — ilman juridista erityisosaamista.',
            'Vuokraa autopaikka helposti. Etsi, varaa ja hallitse pysäköintiä koko Suomessa yhdestä paikasta.',
            'Ampumaharjoittelun seuranta ja valmentaja radalle. Kirjaa jokainen laukaus, saa heti korjaukset otteeseen, asentoon ja liipaisuun, lue lämpökartat ja kehitys harjoitusten välillä, ja kisaa kavereita vastaan reaaliajassa.',
            'Estää ilmoitusroskan välittömästi. Chrome-laajennus ja Android-sovellus suodattavat push-ilmoitusten tulvan reaaliaikaista roskatietokantaa vasten — ennen kuin ne tavoittavat sinut.',
            'Todistettavan reilut arvonnat someen. Tuo kommentit yhdellä klikkauksella Facebookista ja YouTubesta ja suorita kryptografisesti todennettava arvonta — voittajat, joita kukaan ei voi kiistää, ja matematiikka, jonka kuka tahansa voi tarkistaa.',
            'Riippumaton työkalu suomalaiselle metsänomistajalle — kartta, arvonmääritys, hoitomuistutukset ja neutraali puukauppa <em>talousmetsälle</em>, kaikki yhdessä paikassa.'
        ]);
        reg(qa('.work .plate .plate__name')[5], 'Metsäomaisuuden seuranta'); // forest working title

        // Client work (healthcare delivery)
        reg(q('.delivery__tag'), 'Asiakastyö · Terveydenhuolto');
        reg(q('.delivery__title'), 'Etävastaanotot, rakennettu niin ettemme koskaan säilytä potilastietoa.');
        reg(q('.delivery__desc'), 'Toimitimme kolme etävastaanottoalustaa lääkärille, joka siirsi vastaanottonsa verkkoon — turvallisiksi suunniteltuna alusta alkaen. Auditoidut, vaatimustenmukaiset kolmannet osapuolet säilyttävät potilastiedot ja -rekisterit; ne eivät koskaan kosketa palvelimiamme. Luottamus on arkkitehtuurissa, ei lupauksessa.');
        regList('.delivery__specs li', [
            'Kolme etävastaanottoalustaa', 'Turvallisuus suunniteltu alusta alkaen',
            'Auditoitu kolmannen osapuolen tietojenkäsittely', 'Ei potilastietoa palvelimillamme'
        ]);

        // Studio
        reg(q('.studio .section-head__tag'), 'Lehti C — AdRific');
        reg(q('#studio-title'), 'Studio');
        reg(q('.studio__lead'), 'AdRific on pieni rakentajien studio Helsingissä — palvelemme asiakkaita maailmanlaajuisesti.');
        reg(q('.studio__body'), 'Kirjoitamme koodin ja pyöritämme kampanjat itse — ei välikäsiä, ei luovutuksia. Työt täällä pitävät meidät terävinä: oikeita asioita oikeassa käytössä, samalla rimalla jonka itse asetamme. Siinä koko ansioluettelo.');
        regList('.studio__facts li', [
            '<span>Sijainti</span> Helsinki, Suomi',
            '<span>Kattavuus</span> Maailmanlaajuinen',
            '<span>Osaaminen</span> Ohjelmistot · Mainonta · Kasvu'
        ]);

        // Contact
        reg(q('.contact .section-head__tag'), 'Lehti D — Yhteys');
        reg(q('#contact-title'), 'Ota yhteyttä.');
        reg(q('.contact__lede'), 'Kiinnostaako työt, vai haluatko vain jutella? Meidät tavoittaa helposti.');
        reg(q('.stamp__kicker'), 'Sano hei');
        reg(q('.stamp__main'), 'Ota yhteyttä');

        // Footer title-block values (keys handled by LABELS above)
        regList('.tb-cell__v', [
            'AdRific — Digitaalinen studio', 'Ohjelmistot · Mainonta · Kasvu', '1:1', '01 / 01',
            'AdRific Oy', 'Postiljooninkatu 13 A 19, 00240 Helsinki, FI', 'FI28112047',
            '<a href="mailto:contact@adrific.fi">contact@adrific.fi</a>', '2026', 'A'
        ]);
        reg(q('.title-block__copy'), '© 2026 AdRific Oy. Piirretty Helsingissä.');

        // Meta + aria
        attr(q('meta[name="description"]'), 'content', 'AdRific on pieni digitaalinen studio Helsingissä. Katsaus tuotteisiin ja asiakastöihin, jotka olemme suunnitelleet, rakentaneet ja julkaisseet. Emme lupaile. Me toimitamme.');
        attr(q('meta[property="og:title"]'), 'content', 'AdRific — Digitaalinen studio Helsingissä');
        attr(q('meta[property="og:description"]'), 'content', 'Katsaus tuotteisiin ja asiakastöihin, jotka olemme suunnitelleet, rakentaneet ja julkaisseet.');
        attr(q('meta[property="og:locale"]'), 'content', 'fi_FI');
        attr(q('.brand'), 'aria-label', 'AdRific — etusivu');
        attr(q('.hero__svg'), 'aria-label', 'Isometrinen rakennehila piirrettynä teknisenä kaaviona, mitoitusviivoin.');

        function apply(lang) {
            var fi = lang === 'fi';
            T.forEach(function (t) { t.el.innerHTML = fi ? t.fi : t.en; });
            A.forEach(function (a) { a.el.setAttribute(a.name, fi ? a.fi : (a.en || '')); });
            document.title = fi ? FI_TITLE : EN_TITLE;
            docEl.setAttribute('lang', lang);
            qa('.lang-switch__btn').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.lang === lang)); });
        }

        var saved = null;
        try { saved = localStorage.getItem('adrific-lang'); } catch (e) {}
        apply((saved === 'en' || saved === 'fi') ? saved : (docEl.getAttribute('lang') === 'fi' ? 'fi' : 'en'));

        qa('.lang-switch__btn').forEach(function (b) {
            b.addEventListener('click', function () {
                apply(b.dataset.lang);
                try { localStorage.setItem('adrific-lang', b.dataset.lang); } catch (e) {}
            });
        });
    })();

    /* ---------------------------------------------------------------
       Reveal on scroll — enhances an already-visible default
    --------------------------------------------------------------- */
    (function reveals() {
        if (reduceMotion.matches) return; // content stays visible, no pre-hide

        var belowFold = document.querySelectorAll(
            '.work .section-head, .work .plate, .work .delivery, ' +
            '.studio__inner, .contact__inner, .title-block'
        );
        Array.prototype.forEach.call(belowFold, function (el) { el.classList.add('reveal'); });

        var plate = document.querySelector('.hero__plate');
        if (plate) plate.style.setProperty('--reveal-delay', '120ms');
        stagger(document.querySelectorAll('.work .plate'), 70);

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
        var COL = {};
        function resolveColors() {
            COL.line = tok('--green-500', '#2f8f63');
            COL.node = tok('--green-700', '#246b4a');
            COL.dim = tok('--ink-muted', '#5c685f');
            COL.signal = tok('--signal', '#df5a37');
            COL.grid = tok('--grid-line', '#dde7e0');
        }
        resolveColors();
        // Re-read tokens when the theme flips so the lattice recolors live.
        new MutationObserver(resolveColors).observe(docEl, { attributes: true, attributeFilter: ['data-theme'] });

        var COLS = 13, ROWS = 13;
        var edges = buildEdges();   // [i,j,i2,j2], sorted for the draw-in sweep
        var nodes = [];             // projected [sx, sy, depth] per (i,j)

        var W = 0, H = 0, DPR = 1;
        var t0 = null, REVEAL_MS = 1700;
        var rafId = null, visible = true, lastTs = 0;

        // 3D orientation: continuous auto-spin + drag-to-rotate with inertia
        var SPIN = 0.18, TILT = -0.5;
        var dragY = 0, dragX = 0, velY = 0, velX = 0, dragging = false, lastX = 0, lastY = 0;
        var ay = 0, ax = TILT, scale = 1; // recomputed per frame

        // roaming coral marker + its trail
        var pen = { i: 6, j: 6, ti: 7, tj: 6, p: 0 };
        var trail = [];

        function buildEdges() {
            var e = [];
            for (var j = 0; j < ROWS; j++) for (var i = 0; i < COLS; i++) {
                if (i < COLS - 1) e.push([i, j, i + 1, j]);
                if (j < ROWS - 1) e.push([i, j, i, j + 1]);
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

        function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }

        // model point on the XZ plane, height in Y (a gently waving terrain)
        function model(i, j, t) {
            var mx = i / (COLS - 1) - 0.5;
            var mz = j / (ROWS - 1) - 0.5;
            var my = Math.sin(mx * 5 + t * 0.7) * Math.cos(mz * 5 + t * 0.5) * 0.14;
            return [mx, my, mz];
        }
        // rotate (Y then X) + perspective-project to screen; returns [sx, sy, depth]
        function project(m) {
            var c = Math.cos(ay), s = Math.sin(ay);
            var x1 = m[0] * c + m[2] * s, z1 = -m[0] * s + m[2] * c, y1 = m[1];
            var cx = Math.cos(ax), sx = Math.sin(ax);
            var y2 = y1 * cx - z1 * sx, z2 = y1 * sx + z1 * cx;
            var persp = 2.6 / (2.6 - z2);
            return [W / 2 + x1 * scale * persp, H * 0.52 + y2 * scale * persp, z2];
        }
        function P(i, j) { return nodes[j * COLS + i]; }
        function shade(z) { return clamp((z + 0.55) / 1.1, 0, 1); } // 0 far .. 1 near

        function draw(ts) {
            rafId = null;
            if (W < 2 || H < 2) { schedule(); return; } // size not ready yet
            if (t0 === null) t0 = ts;
            var elapsed = ts - t0;
            var eased = 1 - Math.pow(1 - Math.min(1, elapsed / REVEAL_MS), 3);
            var t = elapsed / 1000;

            // orientation: auto-spin + accumulated drag (inertia when released)
            if (!dragging) { dragY += velY; velY *= 0.94; dragX += velX; velX *= 0.9; }
            dragX = clamp(dragX, -0.7, 0.5);
            ay = t * SPIN + dragY;
            ax = clamp(TILT + dragX, -1.2, 0.25);
            scale = Math.min(W, H) * 0.58;

            for (var j = 0; j < ROWS; j++) for (var i = 0; i < COLS; i++) nodes[j * COLS + i] = project(model(i, j, t));

            ctx.clearRect(0, 0, W, H);
            drawBackGrid();

            ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.strokeStyle = COL.line;
            if (eased >= 1) {
                // full structure, painted far-to-near with depth shading
                var order = edges.map(function (e, k) { return [k, (P(e[0], e[1])[2] + P(e[2], e[3])[2]) / 2]; });
                order.sort(function (a, b) { return a[1] - b[1]; });
                for (var o = 0; o < order.length; o++) {
                    var d = shade(order[o][1]);
                    ctx.globalAlpha = 0.26 + 0.64 * d; ctx.lineWidth = 0.7 + 1.0 * d;
                    strokeEdge(edges[order[o][0]], 1);
                }
            } else {
                // assemble: reveal edges in the diagonal sweep order
                var shown = eased * edges.length, full = Math.floor(shown);
                for (var k = 0; k < full && k < edges.length; k++) {
                    var dd = shade((P(edges[k][0], edges[k][1])[2] + P(edges[k][2], edges[k][3])[2]) / 2);
                    ctx.globalAlpha = 0.26 + 0.64 * dd; ctx.lineWidth = 0.7 + 1.0 * dd;
                    strokeEdge(edges[k], 1);
                }
                if (full < edges.length) { ctx.globalAlpha = 0.7; ctx.lineWidth = 1; strokeEdge(edges[full], shown - full); }
            }
            ctx.globalAlpha = 1;

            // nodes, depth-shaded
            ctx.fillStyle = COL.node;
            var shownNodes = eased >= 1 ? COLS * ROWS : Math.floor(eased * COLS * ROWS);
            var cnt = 0;
            for (var jj = 0; jj < ROWS; jj++) for (var ii = 0; ii < COLS; ii++) {
                if (cnt++ > shownNodes) break;
                var p = P(ii, jj), d2 = shade(p[2]);
                ctx.globalAlpha = 0.3 + 0.7 * d2;
                ctx.beginPath(); ctx.arc(p[0], p[1], 0.9 + 1.4 * d2, 0, Math.PI * 2); ctx.fill();
            }
            ctx.globalAlpha = 1;

            drawPen(t, eased, elapsed);
            schedule();
        }

        function strokeEdge(e, frac) {
            var a = P(e[0], e[1]), b = P(e[2], e[3]);
            ctx.beginPath(); ctx.moveTo(a[0], a[1]);
            if (frac >= 1) ctx.lineTo(b[0], b[1]);
            else ctx.lineTo(a[0] + (b[0] - a[0]) * frac, a[1] + (b[1] - a[1]) * frac);
            ctx.stroke();
        }

        function drawBackGrid() {
            ctx.save();
            ctx.strokeStyle = COL.grid; ctx.lineWidth = 1; ctx.globalAlpha = 0.5;
            var step = 28; ctx.beginPath();
            for (var x = (W / 2) % step; x < W; x += step) { ctx.moveTo(x, 0); ctx.lineTo(x, H); }
            for (var y = (H / 2) % step; y < H; y += step) { ctx.moveTo(0, y); ctx.lineTo(W, y); }
            ctx.stroke(); ctx.restore();
        }

        // coral marker: rides the build during reveal, then roams node-to-node
        function drawPen(t, eased, elapsed) {
            var m;
            if (eased < 1) {
                var e = edges[Math.min(edges.length - 1, Math.floor(eased * edges.length))];
                pen.i = pen.ti = e[2]; pen.j = pen.tj = e[3]; pen.p = 0;
                m = model(e[2], e[3], t);
            } else {
                var dt = lastTs ? Math.min(0.05, (elapsed - lastTs) / 1000) : 0.016;
                pen.p += dt / 0.5; // ~0.5s per hop
                if (pen.p >= 1) {
                    pen.p = 0; pen.i = pen.ti; pen.j = pen.tj;
                    var dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]], opts = [];
                    for (var k = 0; k < 4; k++) {
                        var ni = pen.i + dirs[k][0], nj = pen.j + dirs[k][1];
                        if (ni >= 0 && ni < COLS && nj >= 0 && nj < ROWS) opts.push([ni, nj]);
                    }
                    var pick = opts[Math.floor(Math.random() * opts.length)];
                    pen.ti = pick[0]; pen.tj = pick[1];
                }
                var e2 = 1 - Math.pow(1 - pen.p, 2);
                var a = model(pen.i, pen.j, t), b = model(pen.ti, pen.tj, t);
                m = [a[0] + (b[0] - a[0]) * e2, a[1] + (b[1] - a[1]) * e2, a[2] + (b[2] - a[2]) * e2];
            }
            lastTs = elapsed;
            var s = project(m);
            trail.push([s[0], s[1]]); if (trail.length > 16) trail.shift();
            ctx.save();
            ctx.strokeStyle = COL.signal; ctx.lineCap = 'round';
            for (var i = 1; i < trail.length; i++) {
                var f = i / trail.length;
                ctx.globalAlpha = f * 0.6; ctx.lineWidth = 1.8 * f;
                ctx.beginPath(); ctx.moveTo(trail[i - 1][0], trail[i - 1][1]); ctx.lineTo(trail[i][0], trail[i][1]); ctx.stroke();
            }
            ctx.globalAlpha = 1; ctx.lineWidth = 1.2;
            ctx.beginPath(); ctx.moveTo(s[0], s[1]); ctx.lineTo(s[0] + 15, s[1] - 15); ctx.stroke();
            ctx.fillStyle = COL.signal;
            ctx.beginPath(); ctx.arc(s[0], s[1], 3.4, 0, Math.PI * 2); ctx.fill();
            ctx.globalAlpha = 0.5;
            ctx.beginPath(); ctx.arc(s[0], s[1], 7, 0, Math.PI * 2); ctx.stroke();
            ctx.restore();
        }

        function schedule() { if (!rafId && visible) rafId = requestAnimationFrame(draw); }
        function stop() { if (rafId) { cancelAnimationFrame(rafId); rafId = null; } }

        // drag-to-rotate (mouse / pen only — leave touch free for page scroll)
        canvas.style.cursor = 'grab';
        canvas.addEventListener('pointerdown', function (e) {
            if (e.pointerType === 'touch') return;
            dragging = true; lastX = e.clientX; lastY = e.clientY; velY = velX = 0;
            canvas.style.cursor = 'grabbing';
            try { canvas.setPointerCapture(e.pointerId); } catch (_) {}
        });
        canvas.addEventListener('pointermove', function (e) {
            if (!dragging) return;
            velY = (e.clientX - lastX) * 0.008; velX = (e.clientY - lastY) * 0.006;
            dragY += velY; dragX += velX;
            lastX = e.clientX; lastY = e.clientY;
        });
        function endDrag() { dragging = false; canvas.style.cursor = 'grab'; }
        canvas.addEventListener('pointerup', endDrag);
        canvas.addEventListener('pointercancel', endDrag);
        canvas.addEventListener('pointerleave', endDrag);

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

        // Keep the bitmap matched to the rendered size (also fixes the first-paint
        // zero-size race that once upscaled a 1x1 canvas into a solid block).
        if ('ResizeObserver' in window) {
            new ResizeObserver(function () { resize(); schedule(); }).observe(canvas);
        } else {
            var resizeRAF = null;
            window.addEventListener('resize', function () {
                if (resizeRAF) cancelAnimationFrame(resizeRAF);
                resizeRAF = requestAnimationFrame(function () { resize(); schedule(); });
            });
        }

        // boot — defer one frame so layout (and the canvas-live display swap) settle
        docEl.classList.add('canvas-live');
        requestAnimationFrame(function () { resize(); schedule(); });

        // bail out gracefully if the user switches to reduced motion mid-session
        if (reduceMotion.addEventListener) reduceMotion.addEventListener('change', function () {
            if (reduceMotion.matches) { stop(); docEl.classList.remove('canvas-live'); }
        });
    })();
})();
