import { Client, type QueryResult, type QueryResultRow } from 'pg';
import { dbConfig } from '../../config/env';

export class PostgresClient {
  private readonly client: Client;

  constructor() {
    this.client = new Client({
      host: dbConfig.host,
      port: dbConfig.port,
      user: dbConfig.user,
      password: dbConfig.password,
      database: dbConfig.database,
    });
  }

  async connect(): Promise<void> {
    await this.client.connect();
  }

  async query<T extends QueryResultRow = QueryResultRow>(sql: string, params?: unknown[]): Promise<QueryResult<T>> {
    return this.client.query<T>(sql, params);
  }

  async disconnect(): Promise<void> {
    await this.client.end();
  }
}
