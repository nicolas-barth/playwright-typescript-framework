import { test as base } from '@playwright/test';

const AD_HOSTS =
  /doubleclick\.net|googlesyndication\.com|google\.com\/pagead|adsafeprotected\.com|adservice\.google|googletagmanager\.com|googletagservices\.com/;

export const test = base.extend({
  page: async ({ page }, use) => {
    await page.route(AD_HOSTS, (route) => route.abort());
    await use(page);
  },
});

export { expect } from '@playwright/test';
