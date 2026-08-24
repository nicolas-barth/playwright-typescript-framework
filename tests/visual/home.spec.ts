import { test, expect } from '../../fixtures/base';

test('home page category cards render without visual regressions', async ({ page }) => {
  await page.goto('/');

  const categoryCards = page.locator('.category-cards');
  await expect(categoryCards).toBeVisible();
  await expect(categoryCards).toHaveScreenshot('category-cards.png');
});
