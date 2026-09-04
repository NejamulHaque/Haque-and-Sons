import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const rawUrl = process.env.DATABASE_URL || "postgresql://user:password@localhost:5432/haque_studio";
// For neon-http serverless queries, connect directly to the direct endpoint (strip -pooler)
// to prevent PgBouncer connection drops over HTTP
const connectionString = rawUrl.includes("-pooler")
  ? rawUrl.replace("-pooler", "")
  : rawUrl;

export const sql = neon(connectionString);
export const db = drizzle(sql, { schema });
