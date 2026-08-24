import 'dotenv/config';
import { defineConfig, devices } from '@playwright/test';
import { isCI, uiConfig, apiConfig } from './config/env';

export default defineConfig({
  globalSetup: './global-setup',
  timeout: 45_000,
  retries: 2,
  reporter: [
    ['list'],
    ['allure-playwright'],
    ['html', { outputFolder: 'html-report', open: isCI ? 'never' : 'on-failure' }],
  ],

  projects: [
    {
      name: 'ui-chromium',
      testDir: './tests/ui',
      use: { ...devices['Desktop Chrome'], baseURL: uiConfig.baseURL },
    },
    {
      name: 'ui-firefox',
      testDir: './tests/ui',
      use: { ...devices['Desktop Firefox'], baseURL: uiConfig.baseURL },
    },
    {
      name: 'ui-webkit',
      testDir: './tests/ui',
      use: { ...devices['Desktop Safari'], baseURL: uiConfig.baseURL },
    },
    {
      name: 'accessibility',
      testDir: './tests/accessibility',
      use: { ...devices['Desktop Chrome'], baseURL: uiConfig.baseURL },
    },
    {
      name: 'visual',
      testDir: './tests/visual',
      use: { ...devices['Desktop Chrome'], baseURL: uiConfig.baseURL, viewport: { width: 1280, height: 720 } },
    },
    {
      name: 'mobile',
      testDir: './tests/mobile',
      use: { ...devices['Pixel 7'], baseURL: uiConfig.baseURL },
    },
    {
      name: 'api',
      testDir: './tests/api',
      use: { baseURL: apiConfig.baseURL },
    },
    {
      name: 'db',
      testDir: './tests/db',
    },
  ],

  use: {
    acceptDownloads: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },
});
