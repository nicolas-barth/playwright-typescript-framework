import { Locator, Page, BrowserContext } from '@playwright/test';

export class AlertsFrameWindowsPage {
  readonly page: Page;
  readonly context: BrowserContext;
  readonly newTabButton: Locator;
  readonly newWindowButton: Locator;
  readonly promptAlertButton: Locator;
  readonly promptResult: Locator;
  readonly frameContent: Locator;
  readonly nestedChildFrameContent: Locator;

  constructor(page: Page, context: BrowserContext) {
    this.page = page;
    this.context = context;
    this.newTabButton = page.getByText('New Tab');
    this.newWindowButton = page.getByText('New Window', { exact: true });
    this.promptAlertButton = page.locator('#promtButton');
    this.promptResult = page.locator('#promptResult');
    this.frameContent = page.frameLocator('#frame2').locator('#sampleHeading');
    this.nestedChildFrameContent = page.frameLocator('#frame1').frameLocator('iframe').getByText('Child Iframe');
  }

  async openNewTab(): Promise<Page> {
    const pagePromise = this.context.waitForEvent('page');
    await this.newTabButton.click();
    const newTab = await pagePromise;
    await newTab.waitForLoadState();
    return newTab;
  }

  async openNewWindow(): Promise<Page> {
    const pagePromise = this.context.waitForEvent('page');
    await this.newWindowButton.click();
    const newWindow = await pagePromise;
    await newWindow.waitForLoadState();
    return newWindow;
  }

  async enterTextAndAccept(text: string): Promise<void> {
    this.page.once('dialog', (dialog) => dialog.accept(text));
    await this.promptAlertButton.click();
  }
}
