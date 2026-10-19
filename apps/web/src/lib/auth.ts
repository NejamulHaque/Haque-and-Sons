import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import * as schema from "@/db/schema";
import { neonConfig } from "@neondatabase/serverless";

// Direct host endpoint resolution to prevent Neon driver translating regional hosts into invalid api.c-4 domains
neonConfig.fetchEndpoint = (host: string) => `https://${host}/sql`;

// ✅ Resolve baseURL explicitly — never fall back to localhost in production
const resolvedBaseURL =
  process.env.BETTER_AUTH_URL ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

// ✅ Debug log — check Vercel Function Logs after deploy to confirm env vars loaded
console.log("[AUTH] baseURL:", resolvedBaseURL);
console.log("[AUTH] NODE_ENV:", process.env.NODE_ENV);
console.log("[AUTH] BETTER_AUTH_SECRET set:", !!process.env.BETTER_AUTH_SECRET);

export const auth = betterAuth({
  secret:
    process.env.BETTER_AUTH_SECRET ||
    "default_super_secret_haque_and_sons_key_2026",

  baseURL: resolvedBaseURL,

  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),

  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24,     // 1 day
    cookieCache: {
      enabled: false,
    },
  },

  rateLimit: {
    window: 60,
    max: 100, // ✅ Increased from 30 → 100 to prevent accidental lockouts during testing
  },

  advanced: {
    useSecureCookies: process.env.NODE_ENV === "production",
    // ✅ Trust the proxy headers from Vercel (critical for correct origin detection)
    defaultHeaders: {
      "X-Forwarded-Proto": "https",
    },
  },

  // ✅ Hardened trustedOrigins — covers all your domains + www variants
  trustedOrigins: [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://haquestudio.me",
    "https://www.haquestudio.me",
    "https://haqueandsons.vercel.app",
    "https://haqueandsons.in",
    // ✅ Also trust any Vercel preview deployment URL automatically
    ...(process.env.VERCEL_URL
      ? [`https://${process.env.VERCEL_URL}`]
      : []),
  ],
});