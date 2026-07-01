import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '..', 'dist');

const mimeTypes = {
  '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon', '.woff': 'font/woff', '.woff2': 'font/woff2',
};

async function resolveLaunchOptions() {
  if (process.platform === 'linux') {
    const chromium = (await import('@sparticuz/chromium')).default;
    return {
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: true,
    };
  }
  const candidates = process.platform === 'win32'
    ? [
        'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
        'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
      ]
    : [
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      ];
  const found = candidates.find((p) => fs.existsSync(p));
  if (!found) return null;
  return { executablePath: found, headless: true };
}

const launchOptions = await resolveLaunchOptions();
if (!launchOptions) {
  console.warn('No Chrome/Chromium found for prerendering on this machine — skipping. dist/index.html will keep the empty root div.');
  process.exit(0);
}

const server = http.createServer((req, res) => {
  const urlPath = req.url.split('?')[0];
  let filePath = path.join(distDir, decodeURIComponent(urlPath));
  if (urlPath === '/' || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(distDir, 'index.html');
  }
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

const PORT = 4173;
await new Promise((resolve) => server.listen(PORT, resolve));

const browser = await puppeteer.launch(launchOptions);
const page = await browser.newPage();
await page.evaluateOnNewDocument(() => {
  localStorage.setItem('lang', 'en');
  localStorage.setItem('langTs', String(Date.now()));
});
await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0' });
await page.waitForSelector('#projects', { timeout: 10000 });
await new Promise((resolve) => setTimeout(resolve, 300));
await page.evaluate(() => {
  document.getElementById('root').setAttribute('data-prerendered', 'true');
});
const html = await page.content();
await browser.close();
server.close();

fs.writeFileSync(path.join(distDir, 'index.html'), html);
console.log('Prerendered dist/index.html with full server-rendered content.');
