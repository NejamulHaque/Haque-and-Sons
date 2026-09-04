import { db } from "./index";
import { sql } from "drizzle-orm";

let isInitialized = false;
let initPromise: Promise<void> | null = null;

export async function ensureTablesExist() {
  if (isInitialized) {
    return;
  }

  if (initPromise) {
    return initPromise;
  }

  initPromise = (async () => {
    try {
      // Fast check: If the "user" and "internship_applications" tables already exist, skip heavy DDL
      try {
        await db.execute(sql`SELECT 1 FROM "user" LIMIT 1;`);
        await db.execute(sql`SELECT 1 FROM "internship_applications" LIMIT 1;`);
        isInitialized = true;
        return;
      } catch {
        // Tables do not exist yet, proceed with full creation
      }

      // Better Auth Core Tables
      await db.execute(sql`
        CREATE TABLE IF NOT EXISTS "user" (
          "id" text PRIMARY KEY,
          "name" text NOT NULL,
          "email" text NOT NULL UNIQUE,
          "email_verified" boolean NOT NULL DEFAULT false,
          "image" text,
          "created_at" timestamp NOT NULL DEFAULT now(),
          "updated_at" timestamp NOT NULL DEFAULT now()
        );
      `);

      await db.execute(sql`
        CREATE TABLE IF NOT EXISTS "session" (
          "id" text PRIMARY KEY,
          "expires_at" timestamp NOT NULL,
          "token" text NOT NULL UNIQUE,
          "created_at" timestamp NOT NULL DEFAULT now(),
          "updated_at" timestamp NOT NULL DEFAULT now(),
          "ip_address" text,
          "user_agent" text,
          "user_id" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE
        );
      `);

      await db.execute(sql`
        CREATE TABLE IF NOT EXISTS "account" (
          "id" text PRIMARY KEY,
          "account_id" text NOT NULL,
          "provider_id" text NOT NULL,
          "user_id" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
          "access_token" text,
          "refresh_token" text,
          "id_token" text,
          "access_token_expires_at" timestamp,
          "refresh_token_expires_at" timestamp,
          "scope" text,
          "password" text,
          "created_at" timestamp NOT NULL DEFAULT now(),
          "updated_at" timestamp NOT NULL DEFAULT now(),
          "issuer" text
        );
      `);

      await db.execute(sql`
        CREATE TABLE IF NOT EXISTS "verification" (
          "id" text PRIMARY KEY,
          "identifier" text NOT NULL,
          "value" text NOT NULL,
          "expires_at" timestamp NOT NULL,
          "created_at" timestamp DEFAULT now(),
          "updated_at" timestamp DEFAULT now()
        );
      `);

      // Visitors telemetry table
      await db.execute(sql`
        CREATE TABLE IF NOT EXISTS "visitors" (
          "id" serial PRIMARY KEY,
          "ip" varchar(45),
          "user_agent" text,
          "path" text,
          "country" varchar(100),
          "city" varchar(100),
          "created_at" timestamp DEFAULT now() NOT NULL
        );
      `);

      // Internship & Certificate tables
      await db.execute(sql`
        CREATE TABLE IF NOT EXISTS "internship_applications" (
          "id" serial PRIMARY KEY,
          "full_name" text NOT NULL,
          "email" text NOT NULL,
          "phone" text NOT NULL,
          "college" text NOT NULL,
          "degree" text NOT NULL,
          "graduation_year" text NOT NULL,
          "domain" text NOT NULL,
          "mode" text NOT NULL,
          "internship_type" text NOT NULL,
          "duration" text NOT NULL,
          "github_url" text,
          "linkedin_url" text,
          "portfolio_url" text,
          "resume_link" text,
          "statement" text,
          "status" text DEFAULT 'Pending' NOT NULL,
          "github_repo" text,
          "live_url" text,
          "google_form_submitted" boolean DEFAULT false NOT NULL,
          "feedback_rating" text,
          "feedback_text" text,
          "payment_screenshot" text,
          "payment_utr" text,
          "payment_status" text DEFAULT 'None' NOT NULL,
          "certificate_id" text,
          "created_at" timestamp DEFAULT now() NOT NULL
        );
      `);

      await db.execute(sql`
        CREATE TABLE IF NOT EXISTS "certificates" (
          "id" text PRIMARY KEY,
          "student_name" text NOT NULL,
          "student_email" text NOT NULL,
          "domain" text NOT NULL,
          "mode" text NOT NULL,
          "internship_type" text NOT NULL,
          "college" text NOT NULL,
          "duration" text NOT NULL,
          "grade" text DEFAULT 'Distinction' NOT NULL,
          "issue_date" timestamp DEFAULT now() NOT NULL,
          "signatory_title" text DEFAULT 'Nejamul Haque, Founder & Lead Engineer' NOT NULL,
          "status" text DEFAULT 'Valid' NOT NULL,
          "created_at" timestamp DEFAULT now() NOT NULL
        );
      `);

      // Migration: Add new columns if table was created previously with older schema
      const migrationQueries = [
        sql`ALTER TABLE "internship_applications" ADD COLUMN IF NOT EXISTS "github_repo" text;`,
        sql`ALTER TABLE "internship_applications" ADD COLUMN IF NOT EXISTS "live_url" text;`,
        sql`ALTER TABLE "internship_applications" ADD COLUMN IF NOT EXISTS "google_form_submitted" boolean DEFAULT false;`,
        sql`ALTER TABLE "internship_applications" ADD COLUMN IF NOT EXISTS "feedback_rating" text;`,
        sql`ALTER TABLE "internship_applications" ADD COLUMN IF NOT EXISTS "feedback_text" text;`,
        sql`ALTER TABLE "internship_applications" ADD COLUMN IF NOT EXISTS "payment_screenshot" text;`,
        sql`ALTER TABLE "internship_applications" ADD COLUMN IF NOT EXISTS "payment_utr" text;`,
        sql`ALTER TABLE "internship_applications" ADD COLUMN IF NOT EXISTS "payment_status" text DEFAULT 'None';`,
        sql`ALTER TABLE "internship_applications" ADD COLUMN IF NOT EXISTS "certificate_id" text;`,
      ];

      for (const query of migrationQueries) {
        try {
          await db.execute(query);
        } catch {
          // Ignore individual column migration errors
        }
      }

      isInitialized = true;
    } catch (err) {
      console.error("Error ensuring tables exist:", err);
      initPromise = null; // Allow retry on subsequent calls if network failed
    }
  })();

  return initPromise;
}
