import path from 'path';
import { test, expect } from '../../fixtures/base';

const HAR_FILE = path.join(__dirname, 'har', 'text-box-page.har');

test('replays the Text Box journey from a recorded HAR without hitting the network', async ({ page, context }) => {
  await context.routeFromHAR(HAR_FILE, { update: false, notFound: 'abort' });

  await page.goto('https://demoqa.com/');
  await page.getByText('Elements', { exact: true }).click();
  await page.getByText('Text Box', { exact: true }).click();
  await page.getByPlaceholder('Full Name').fill('AutoTest');
  await page.getByText('Submit').click();

  await expect(page.getByText('Name:AutoTest', { exact: true })).toBeVisible();
});
