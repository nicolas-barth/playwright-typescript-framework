import { test, expect } from '../../fixtures/pages';
import { clickByText } from '../../support/navigation';

test('logs into the Book Store application', { tag: '@Smoke' }, async ({ page, loginPage }) => {
  await test.step('Provision the demo account for this worker', async () => {
    await loginPage.ensureAccountExists();
  });
  await test.step('Navigate to the application', async () => {
    await loginPage.open();
  });
  await test.step('Open the Book Store application', async () => {
    await clickByText(page, 'Book Store Application');
  });
  await test.step('Open the login form', async () => {
    await loginPage.openLoginForm();
  });
  await test.step('Submit credentials', async () => {
    await loginPage.login();
  });
  await test.step('Land on the profile page', async () => {
    await expect(loginPage.booksSearchBox).toBeVisible();
  });
});
