import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// Resilient fetch wrapper with exponential backoff for Neon cold starts and network hiccups
const retryFetch: typeof fetch = async (url, options) => {
  const maxRetries = 3;
  let lastError: any = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fetch(url, options);
    } catch (err: any) {
      lastError = err;
      if (attempt < maxRetries) {
        // Wait 300ms, 600ms before retrying to allow compute wakeup
        await new Promise((res) => setTimeout(res, attempt * 300));
      }
    }
  }
  throw lastError;
};

neonConfig.fetchFunction = retryFetch;

const rawUrl = process.env.DATABASE_URL || "postgresql://user:password@localhost:5432/haque_studio";
// For neon-http serverless queries, connect directly to the direct endpoint (strip -pooler)
// to prevent PgBouncer connection drops over HTTP
const connectionString = rawUrl.includes("-pooler")
  ? rawUrl.replace("-pooler", "")
  : rawUrl;

export const sql = neon(connectionString);
export const db = drizzle(sql, { schema });
