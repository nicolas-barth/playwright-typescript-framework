import fs from 'fs/promises';

export default async function globalSetup(): Promise<void> {
  await fs.rm('./allure-results', { recursive: true, force: true });
}
