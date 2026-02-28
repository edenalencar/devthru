const fs = require('fs');
const https = require('https');
const path = require('path');

const dir = path.join(process.cwd(), 'public', 'flags');
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

const apiOptions = {
    hostname: 'api.github.com',
    path: '/repos/vasfvitor/bandeiras/contents/public/states',
    headers: { 'User-Agent': 'Node/https' }
};

https.get(apiOptions, (res) => {
    let data = '';
    res.on('data', chunk => { data += chunk; });

    res.on('end', async () => {
        try {
            const files = JSON.parse(data);
            if (!Array.isArray(files)) {
                console.error("Unexpected API response:", data);
                return;
            }

            for (const fileItem of files) {
                if (fileItem.name.endsWith('-bandeira.svg')) {
                    // Extract state code, e.g. "AC-bandeira.svg" -> "ac"
                    const uf = fileItem.name.split('-')[0].toLowerCase();
                    const destPath = path.join(dir, `${uf}.svg`);

                    await new Promise((resolve, reject) => {
                        const fileStream = fs.createWriteStream(destPath);
                        https.get(fileItem.download_url, (dRes) => {
                            dRes.pipe(fileStream);
                            fileStream.on('finish', () => {
                                fileStream.close();
                                console.log(`Downloaded ${uf}.svg`);
                                resolve();
                            });
                        }).on('error', err => {
                            fs.unlink(destPath, () => { });
                            reject(err);
                        });
                    });
                }
            }
            console.log("All flags downloaded successfully!");
        } catch (e) {
            console.error("Error parsing/downloading:", e);
        }
    });
}).on('error', (e) => {
    console.error("API Request error:", e);
});
