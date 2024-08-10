import { launch } from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';


export async function downloadCsv() {
  // Fetch or create download directory
  const downloadPath = path.resolve('./downloads');
  if (!fs.existsSync(downloadPath)) {
    fs.mkdirSync(downloadPath);
  }

  // Launch a new browser instance
  const browser = await launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', `--enable-features=NetworkService,NetworkServiceInProcess`]
  });

  // Create a new page
  const page = await browser.newPage();

  // Configure download behavior
  await page['_client']().send('Page.setDownloadBehavior', {
    behavior: 'allow',
    downloadPath: downloadPath
  });


  // Navigate to the desired URL
  await page.goto('https://ibex.bg/dam-data-chart-2');

  // Find CSV button
  const onClickContent = 'exportData()';
  const button = await page.waitForSelector('button[onclick="' + onClickContent + '"]');

  // Click the button
  await button.click();

  console.log('Clicked the button');

  // Wait for the download to complete
  await new Promise(r => setTimeout(r, 5000));

  // Close the browser
  await browser.close();
}
