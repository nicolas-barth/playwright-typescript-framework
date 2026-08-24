import { test, expect } from '../../fixtures/base';

test('home page fits the device viewport without horizontal overflow', async ({ page }) => {
  await page.goto('/');

  const overflow = await page.evaluate(() => {
    const viewportWidth = document.documentElement.clientWidth;
    let maxRight = 0;
    document.querySelectorAll('body *').forEach((element) => {
      if (element.tagName === 'FOOTER') return;
      maxRight = Math.max(maxRight, element.getBoundingClientRect().right);
    });
    return maxRight - viewportWidth;
  });

  expect(overflow).toBeLessThanOrEqual(0);
});

test('tapping a category card navigates on a touch device', async ({ page }) => {
  await page.goto('/');

  await page.getByText('Elements', { exact: true }).tap();

  await expect(page).toHaveURL(/\/elements$/);
});
