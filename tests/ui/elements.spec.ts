import path from 'path';
import { test, expect } from '../../fixtures/pages';
import { clickByText } from '../../support/navigation';

const UPLOAD_FILE = path.join(__dirname, 'assets', 'sampleFile.jpeg');

test('exercises the Elements practice widgets', { tag: '@Smoke' }, async ({ page, loginPage, elementsPage }) => {
  test.setTimeout(90_000);

  await loginPage.open();
  await clickByText(page, 'Elements');

  await test.step('Text Box submits and echoes the entered name', async () => {
    await clickByText(page, 'Text Box');
    await elementsPage.enterFullName('AutoTest');
    await elementsPage.clickSubmit();
    await expect(elementsPage.submittedText).toBeVisible();
  });

  await test.step('Check Box reflects the selected item', async () => {
    await clickByText(page, 'Check Box');
    await elementsPage.selectHomeCheckbox();
    await expect(elementsPage.homeSelectedText).toContainText('home');
  });

  await test.step('Radio Button disables the No option', async () => {
    await clickByText(page, 'Radio Button');
    await expect(elementsPage.noRadioButton).toBeDisabled();
  });

  await test.step('Web Tables edit action opens the registration form', async () => {
    await clickByText(page, 'Web Tables');
    expect(await elementsPage.getFirstColumnTableHeader()).toBe('First Name');
    await elementsPage.editCierraEntry();
    await expect(elementsPage.registrationFormHeader).toBeVisible();
    await elementsPage.closeRegistrationForm();
  });

  await test.step('Buttons page responds to double and right click', async () => {
    await clickByText(page, 'Buttons');
    await elementsPage.doubleClick();
    await expect(elementsPage.doubleClickText).toBeVisible();
    await elementsPage.rightClick();
    await expect(elementsPage.rightClickText).toBeVisible();
  });

  await test.step('Upload and Download round-trips a file', async () => {
    await clickByText(page, 'Upload and Download');
    await elementsPage.downloadFile();
    await elementsPage.uploadFile(UPLOAD_FILE);
    await expect(elementsPage.uploadedFileText).toBeVisible();
  });

  await test.step('Links opens the sample page in a new tab', async () => {
    await clickByText(page, 'Links');
    const homePage = await elementsPage.openHomeLinkInNewTab();
    expect(homePage.url()).toBe('https://demoqa.com/');
    await homePage.close();
  });
});
