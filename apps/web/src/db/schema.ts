import { pgTable, text, timestamp, boolean, serial, varchar } from "drizzle-orm/pg-core";

// --- Better Auth Required Tables ---

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(), // Required for sign-up
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  issuer: text("issuer"),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

// --- Your Custom Tables ---

export const visitors = pgTable("visitors", {
  id: serial("id").primaryKey(),
  ip: varchar("ip", { length: 45 }),
  userAgent: text("user_agent"),
  path: text("path"),
  country: varchar("country", { length: 10 }),
  city: varchar("city", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const internshipApplications = pgTable("internship_applications", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  college: text("college").notNull(),
  degree: text("degree").notNull(),
  graduationYear: text("graduation_year").notNull(),
  domain: text("domain").notNull(),
  mode: text("mode").notNull(), // Online | Offline | Hybrid
  internshipType: text("internship_type").notNull(), // Paid | Unpaid
  duration: text("duration").notNull(), // 4 Weeks | 8 Weeks | 12 Weeks
  githubUrl: text("github_url"),
  linkedinUrl: text("linkedin_url"),
  portfolioUrl: text("portfolio_url"),
  resumeLink: text("resume_link"),
  statement: text("statement"),
  status: text("status").default("Pending").notNull(), // Pending | Under Review | Accepted | Completed | Rejected
  githubRepo: text("github_repo"),
  liveUrl: text("live_url"),
  googleFormSubmitted: boolean("google_form_submitted").default(false).notNull(),
  certificateId: text("certificate_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const certificates = pgTable("certificates", {
  id: text("id").primaryKey(), // e.g. HS-INT-2026-X7K9P2
  studentName: text("student_name").notNull(),
  studentEmail: text("student_email").notNull(),
  domain: text("domain").notNull(),
  mode: text("mode").notNull(),
  internshipType: text("internship_type").notNull(),
  college: text("college").notNull(),
  duration: text("duration").notNull(),
  grade: text("grade").default("Distinction").notNull(),
  issueDate: timestamp("issue_date").defaultNow().notNull(),
  signatoryTitle: text("signatory_title").default("Nejamul Haque, Founder & Lead Engineer").notNull(),
  status: text("status").default("Valid").notNull(), // Valid | Revoked
  createdAt: timestamp("created_at").defaultNow().notNull(),
});