import type { Page } from '@playwright/test';

export async function clickByText(page: Page, text: string): Promise<void> {
  const previousUrl = page.url();
  const locator = page.getByText(text, { exact: true });

  await locator.click();
  try {
    await page.waitForURL((url) => url.href !== previousUrl, { timeout: 5_000 });
  } catch {
    await locator.click();
    await page.waitForURL((url) => url.href !== previousUrl);
  }
}
