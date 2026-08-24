import { test, expect } from '@playwright/test';
import { reqResHeaders } from '../../support/api';

test('returns a page of users matching the documented shape', { tag: '@API' }, async ({ request }) => {
  const response = await request.get('/api/users?per_page=1', { headers: reqResHeaders() });

  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('application/json');

  const body = await response.json();
  expect(body).toMatchObject({
    page: expect.any(Number),
    per_page: 1,
    total: expect.any(Number),
    total_pages: expect.any(Number),
    data: expect.any(Array),
  });
  expect(body.data).toHaveLength(1);
  expect(body.data[0]).toMatchObject({
    id: expect.any(Number),
    email: expect.stringContaining('@'),
    first_name: expect.any(String),
    last_name: expect.any(String),
    avatar: expect.stringMatching(/^https?:\/\//),
  });
});

test('returns 404 for a user id that does not exist', { tag: '@API' }, async ({ request }) => {
  const response = await request.get('/api/users/23', { headers: reqResHeaders() });

  expect(response.status()).toBe(404);
});
