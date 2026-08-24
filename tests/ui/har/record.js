const path = require('path');
const { chromium } = require('@playwright/test');

async function record() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  await context.routeFromHAR(path.join(__dirname, 'text-box-page.har'), { update: true });

  const page = await context.newPage();
  await page.goto('https://demoqa.com/');
  await page.getByText('Elements', { exact: true }).click();
  await page.getByText('Text Box', { exact: true }).click();
  await page.getByPlaceholder('Full Name').fill('AutoTest');
  await page.getByText('Submit').click();

  await context.close();
  await browser.close();
}

record().catch((error) => {
  console.error('HAR recording failed:', error.message);
  process.exit(1);
});
