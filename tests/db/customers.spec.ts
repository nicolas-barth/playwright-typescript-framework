import { test, expect } from '../../fixtures/db';

interface Customer {
  id: number;
  full_name: string;
  email: string;
}

test('returns the seeded customers ordered by id', async ({ dbClient }) => {
  const result = await dbClient.query<Customer>('SELECT id, full_name, email FROM customers ORDER BY id');

  expect(result.rows.length).toBeGreaterThanOrEqual(3);
  expect(result.rows[0]).toMatchObject({ full_name: 'Ada Lovelace', email: 'ada@example.com' });
});

test('finds a customer by email', async ({ dbClient }) => {
  const result = await dbClient.query<Customer>('SELECT id, full_name, email FROM customers WHERE email = $1', [
    'grace@example.com',
  ]);

  expect(result.rows).toHaveLength(1);
  expect(result.rows[0]?.full_name).toBe('Grace Hopper');
});

test('returns no rows for an email that does not exist', async ({ dbClient }) => {
  const result = await dbClient.query<Customer>('SELECT id FROM customers WHERE email = $1', ['nobody@example.com']);

  expect(result.rows).toHaveLength(0);
});
