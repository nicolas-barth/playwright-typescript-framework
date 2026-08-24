import { test as base } from './base';
import { LoginPage } from '../pages/LoginPage';
import { ElementsPage } from '../pages/ElementsPage';
import { AlertsFrameWindowsPage } from '../pages/AlertsFrameWindowsPage';
import { WidgetsPage } from '../pages/WidgetsPage';
import { InteractionsPage } from '../pages/InteractionsPage';

interface PageFixtures {
  loginPage: LoginPage;
  elementsPage: ElementsPage;
  alertsFrameWindowsPage: AlertsFrameWindowsPage;
  widgetsPage: WidgetsPage;
  interactionsPage: InteractionsPage;
}

export const test = base.extend<PageFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  elementsPage: async ({ page, context }, use, testInfo) => {
    await use(new ElementsPage(page, context, testInfo));
  },
  alertsFrameWindowsPage: async ({ page, context }, use) => {
    await use(new AlertsFrameWindowsPage(page, context));
  },
  widgetsPage: async ({ page }, use) => {
    await use(new WidgetsPage(page));
  },
  interactionsPage: async ({ page }, use) => {
    await use(new InteractionsPage(page));
  },
});

export { expect } from '@playwright/test';
