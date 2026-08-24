import { Page, Locator } from '@playwright/test';
import { demoUser, uiConfig } from '../config/env';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly booksSearchBox: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByPlaceholder('UserName');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.booksSearchBox = page.getByPlaceholder('Type to search');
  }

  async open(): Promise<void> {
    await this.page.goto('/');
  }

  async openLoginForm(): Promise<void> {
    await this.loginButton.click();
  }

  async ensureAccountExists(): Promise<void> {
    const response = await this.page.request.post(`${uiConfig.baseURL}/Account/v1/User`, {
      data: { userName: demoUser.username, password: demoUser.password },
    });
    if (!response.ok() && response.status() !== 406) {
      throw new Error(`Failed to provision demo account "${demoUser.username}": ${response.status()}`);
    }
  }

  async login(): Promise<void> {
    await this.usernameInput.fill(demoUser.username);
    await this.passwordInput.fill(demoUser.password);
    await this.loginButton.click();
  }
}
