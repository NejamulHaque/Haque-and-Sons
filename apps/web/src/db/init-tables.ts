import { db } from "./index";
import { sql } from "drizzle-orm";

declare global {
  // eslint-disable-next-line no-var
  var __db_tables_initialized: boolean | undefined;
  // eslint-disable-next-line no-var
  var __db_init_promise: Promise<void> | null | undefined;
}

export async function ensureTablesExist(): Promise<void> {
  if (globalThis.__db_tables_initialized) {
    return;
  }

  if (globalThis.__db_init_promise) {
    return globalThis.__db_init_promise;
  }

  globalThis.__db_init_promise = (async () => {
    try {
      // 1. Fast probe: check if primary tables and latest columns already exist
      try {
        await db.execute(sql`SELECT 1 FROM "user" LIMIT 1;`);
        await db.execute(
          sql`SELECT "lor_status", "lor_ref_number", "certificate_id", "payment_status" FROM "internship_applications" LIMIT 1;`
        );
        globalThis.__db_tables_initialized = true;
        return;
      } catch {
        // Table or column is missing, proceed to create tables and execute migrations below
      }


      // 2. Better Auth Core Tables
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

      // 3. Visitors telemetry table
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

      // 4. Internship & Certificate tables
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
          "lor_status" text DEFAULT 'None' NOT NULL,
          "lor_ref_number" text,
          "lor_applied_at" timestamp,
          "lor_approved_at" timestamp,
          "lor_remarks" text,
          "lor_rejection_reason" text,
          "lor_grade" text DEFAULT 'Distinction (Top 1%)',
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

      // 5. Migration: Add new columns if table was created previously with older schema
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
        sql`ALTER TABLE "internship_applications" ADD COLUMN IF NOT EXISTS "lor_status" text DEFAULT 'None';`,
        sql`ALTER TABLE "internship_applications" ADD COLUMN IF NOT EXISTS "lor_ref_number" text;`,
        sql`ALTER TABLE "internship_applications" ADD COLUMN IF NOT EXISTS "lor_applied_at" timestamp;`,
        sql`ALTER TABLE "internship_applications" ADD COLUMN IF NOT EXISTS "lor_approved_at" timestamp;`,
        sql`ALTER TABLE "internship_applications" ADD COLUMN IF NOT EXISTS "lor_remarks" text;`,
        sql`ALTER TABLE "internship_applications" ADD COLUMN IF NOT EXISTS "lor_rejection_reason" text;`,
        sql`ALTER TABLE "internship_applications" ADD COLUMN IF NOT EXISTS "lor_grade" text DEFAULT 'Distinction (Top 1%)';`,
      ];

      for (const query of migrationQueries) {
        try {
          await db.execute(query);
        } catch {
          // Ignore individual column migration errors
        }
      }

      globalThis.__db_tables_initialized = true;
    } catch (err: any) {
      console.warn("Notice: Table check deferred:", err?.message || err);
    } finally {
      globalThis.__db_init_promise = null;
    }
  })();

  return globalThis.__db_init_promise;
}
