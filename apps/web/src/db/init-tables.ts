import { db } from "./index";
import { sql } from "drizzle-orm";

let tablesInitialized = false;

export async function ensureTablesExist() {
  if (tablesInitialized) return;

  try {
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

    tablesInitialized = true;
  } catch (err) {
    console.error("Error ensuring tables exist:", err);
  }
}
