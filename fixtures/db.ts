import { test as base } from '@playwright/test';
import { PostgresClient } from '../support/db/pgClient';

export const test = base.extend<{ dbClient: PostgresClient }>({
  dbClient: async ({}, use) => {
    const client = new PostgresClient();
    await client.connect();
    await use(client);
    await client.disconnect();
  },
});

export { expect } from '@playwright/test';
