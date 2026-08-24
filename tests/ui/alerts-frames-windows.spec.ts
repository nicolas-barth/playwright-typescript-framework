import { test, expect } from '../../fixtures/pages';
import { clickByText } from '../../support/navigation';

test('handles browser windows, alerts and iframes', { tag: '@Smoke' }, async ({ page, loginPage, alertsFrameWindowsPage }) => {
  test.setTimeout(90_000);

  await loginPage.open();
  await clickByText(page, 'Alerts, Frame & Windows');
  await clickByText(page, 'Browser Windows');

  await test.step('New Tab opens the sample page', async () => {
    const newTab = await alertsFrameWindowsPage.openNewTab();
    expect(newTab.url()).toBe('https://demoqa.com/sample');
    await expect(newTab.locator('#sampleHeading')).toContainText('This is a sample page');
    await newTab.close();
  });

  await test.step('New Window opens the sample page', async () => {
    const newWindow = await alertsFrameWindowsPage.openNewWindow();
    expect(newWindow.url()).toBe('https://demoqa.com/sample');
    await newWindow.close();
  });

  await test.step('Prompt alert echoes the entered text', async () => {
    await clickByText(page, 'Alerts');
    await alertsFrameWindowsPage.enterTextAndAccept('Hello');
    await expect(alertsFrameWindowsPage.promptResult).toContainText('You entered Hello');
  });

  await test.step('Frame renders the embedded document', async () => {
    await clickByText(page, 'Frames');
    await expect(alertsFrameWindowsPage.frameContent).toHaveText('This is a sample page');
  });

  await test.step('Nested iframe content is reachable', async () => {
    await clickByText(page, 'Nested Frames');
    await expect(alertsFrameWindowsPage.nestedChildFrameContent).toBeVisible();
  });
});
