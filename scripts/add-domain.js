const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
const apiToken = process.env.CLOUDFLARE_API_TOKEN;
const projectName = 'adrific';
const domains = ['adrific.fi', 'www.adrific.fi'];

async function addDomain(domain) {
    console.log(`Adding domain: ${domain}...`);
    const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/pages/projects/${projectName}/domains`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: domain })
        });

        const responseText = await response.text();

        if (!response.ok) {
            console.error(`Failed to add domain ${domain}: ${response.status} ${response.statusText}`);
            console.error('Response:', responseText);
            // Don't exit immediately, try other domain
        } else {
            console.log(`Successfully added domain ${domain}`);
            console.log('Response:', responseText);
        }
    } catch (error) {
        console.error(`Error adding domain ${domain}:`, error);
    }
}

async function main() {
    if (!accountId || !apiToken) {
        console.error('Missing CLOUDFLARE_ACCOUNT_ID or CLOUDFLARE_API_TOKEN');
        process.exit(1);
    }

    console.log('Starting domain configuration...');
    for (const domain of domains) {
        await addDomain(domain);
    }
    console.log('Domain configuration completed.');
}

main();
