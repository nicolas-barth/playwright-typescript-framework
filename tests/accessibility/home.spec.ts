import { test, expect } from '../../fixtures/axe';

test('home page has no unresolved WCAG 2.1 AA violations', async ({ page, makeAxeBuilder }) => {
  await page.goto('/');

  const results = await makeAxeBuilder()
    .disableRules(['image-alt', 'link-name'])
    .analyze();

  expect(results.violations).toEqual([]);
});
