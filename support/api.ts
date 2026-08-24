import { apiConfig } from '../config/env';

export function reqResHeaders(): Record<string, string> {
  return { 'x-api-key': apiConfig.apiKey };
}
