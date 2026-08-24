import { Locator, Page, BrowserContext, TestInfo, expect } from '@playwright/test';

export class ElementsPage {
  readonly page: Page;
  readonly context: BrowserContext;
  readonly testInfo: TestInfo;
  readonly fullNameInput: Locator;
  readonly submitButton: Locator;
  readonly submittedText: Locator;
  readonly homeCheckbox: Locator;
  readonly homeSelectedText: Locator;
  readonly noRadioButton: Locator;
  readonly webTablesHeader: Locator;
  readonly webTablesEditIcon: Locator;
  readonly registrationFormHeader: Locator;
  readonly registrationFormCloseButton: Locator;
  readonly doubleClickButton: Locator;
  readonly doubleClickText: Locator;
  readonly rightClickButton: Locator;
  readonly rightClickText: Locator;
  readonly homeLink: Locator;
  readonly downloadButton: Locator;
  readonly uploadButton: Locator;
  readonly uploadedFileText: Locator;

  constructor(page: Page, context: BrowserContext, testInfo: TestInfo) {
    this.page = page;
    this.context = context;
    this.testInfo = testInfo;
    this.fullNameInput = page.getByPlaceholder('Full Name');
    this.submitButton = page.getByText('Submit');
    this.submittedText = page.getByText('Name:AutoTest', { exact: true });
    this.homeCheckbox = page.getByRole('checkbox', { name: 'Select Home' });
    this.homeSelectedText = page.locator('#result');
    this.noRadioButton = page.locator('#noRadio');
    this.webTablesHeader = page.getByRole('columnheader');
    this.webTablesEditIcon = page.getByRole('row', { name: 'Cierra' }).getByTitle('Edit').locator('svg');
    this.registrationFormHeader = page.getByText('Registration Form');
    this.registrationFormCloseButton = page.getByRole('button', { name: 'Close' });
    this.doubleClickButton = page.locator('#doubleClickBtn');
    this.doubleClickText = page.getByText('You have done a double click');
    this.rightClickButton = page.locator('#rightClickBtn');
    this.rightClickText = page.getByText('You have done a right click');
    this.homeLink = page.locator('#simpleLink');
    this.downloadButton = page.locator('#downloadButton');
    this.uploadButton = page.locator('#uploadFile');
    this.uploadedFileText = page.getByText('sampleFile.jpeg');
  }

  async enterFullName(name: string): Promise<void> {
    await this.fullNameInput.fill(name);
  }

  async clickSubmit(): Promise<void> {
    await this.submitButton.click();
  }

  async selectHomeCheckbox(): Promise<void> {
    await this.homeCheckbox.check();
  }

  async getFirstColumnTableHeader(): Promise<string> {
    await expect(this.webTablesHeader.first()).toBeVisible();
    const [firstHeader] = await this.webTablesHeader.allTextContents();
    if (!firstHeader) {
      throw new Error('Web Tables header row is empty.');
    }
    return firstHeader;
  }

  async editCierraEntry(): Promise<void> {
    await this.webTablesEditIcon.click();
  }

  async closeRegistrationForm(): Promise<void> {
    await this.registrationFormCloseButton.click();
  }

  async doubleClick(): Promise<void> {
    await this.doubleClickButton.dblclick();
  }

  async rightClick(): Promise<void> {
    await this.rightClickButton.click({ button: 'right' });
  }

  async openHomeLinkInNewTab(): Promise<Page> {
    const pagePromise = this.context.waitForEvent('page');
    await this.homeLink.click();
    const newPage = await pagePromise;
    await newPage.waitForLoadState();
    return newPage;
  }

  async downloadFile(): Promise<void> {
    const downloadPromise = this.page.waitForEvent('download');
    await this.downloadButton.click();
    const download = await downloadPromise;
    await download.saveAs(this.testInfo.outputPath(download.suggestedFilename()));
  }

  async uploadFile(filePath: string): Promise<void> {
    await this.uploadButton.setInputFiles(filePath);
  }
}
