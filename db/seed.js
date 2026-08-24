require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

async function seed() {
  const client = new Client({
    host: process.env.DB_HOST ?? 'localhost',
    port: Number(process.env.DB_PORT ?? 5432),
    user: process.env.DB_USER ?? 'postgres',
    password: process.env.DB_PASSWORD ?? 'postgres',
    database: process.env.DB_NAME ?? 'postgres',
  });

  const sql = fs.readFileSync(path.join(__dirname, 'init.sql'), 'utf8');

  await client.connect();
  try {
    await client.query(sql);
  } finally {
    await client.end();
  }
}

seed()
  .then(() => console.log('Database seeded.'))
  .catch((error) => {
    console.error('Database seed failed:', error.message);
    process.exit(1);
  });
