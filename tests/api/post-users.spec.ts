import { test, expect } from '@playwright/test';
import { reqResHeaders } from '../../support/api';

test('creates a user and echoes the submitted fields', { tag: '@API' }, async ({ request }) => {
  const requestBody = { name: 'morpheus', job: 'leader' };

  const response = await request.post('/api/users', { data: requestBody, headers: reqResHeaders() });

  expect(response.status()).toBe(201);
  expect(response.headers()['content-type']).toContain('application/json');

  const body = await response.json();
  expect(body).toMatchObject({
    name: requestBody.name,
    job: requestBody.job,
    id: expect.any(String),
    createdAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T/),
  });
});
