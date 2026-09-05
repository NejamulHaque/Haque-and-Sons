import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// Resilient fetch wrapper with exponential backoff for Neon serverless cold starts & transient network drops
const retryFetch: typeof fetch = async (url, options) => {
  const maxRetries = 4;
  let lastError: any = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s max query timeout

      // Merge signals if options already provided one
      const existingSignal = options?.signal;
      if (existingSignal) {
        if (existingSignal.aborted) {
          controller.abort();
        } else {
          existingSignal.addEventListener('abort', () => controller.abort(), { once: true });
        }
      }

      const res = await fetch(url, {
        ...options,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      return res;
    } catch (err: any) {
      lastError = err;
      if (attempt < maxRetries) {
        // Exponential backoff with jitter: 200ms, 450ms, 1000ms, 2200ms
        const delay = Math.min(200 * Math.pow(2.2, attempt - 1) + Math.random() * 80, 3000);
        await new Promise((res) => setTimeout(res, delay));
      }
    }
  }
  throw lastError;
};

neonConfig.fetchFunction = retryFetch;


function sanitizeNeonUrl(raw: string): string {
  if (!raw || !raw.startsWith("postgres")) return raw;
  try {
    const url = new URL(raw);
    url.host = url.host.replace("-pooler", "");
    url.searchParams.delete("channel_binding");
    if (!url.searchParams.has("sslmode")) {
      url.searchParams.set("sslmode", "require");
    }
    return url.toString();
  } catch {
    return raw
      .replace("-pooler", "")
      .replace(/[?&]channel_binding=[^&]+/g, "");
  }
}

const rawUrl = process.env.DATABASE_URL || "postgresql://user:password@localhost:5432/haque_studio";
const connectionString = sanitizeNeonUrl(rawUrl);

export const sql = neon(connectionString);
export const db = drizzle(sql, { schema });


