import { mysqlTable, varchar, text, mysqlEnum, int, boolean, timestamp } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: varchar("id", { length: 255 }).primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }),
  loginMethod: varchar("login_method", { length: 255 }),
  lastSignedIn: timestamp("last_signed_in"),
  role: mysqlEnum("role", ["admin", "user"]).default("user"),
});

export const candidates = mysqlTable("candidates", {
  id: varchar("id", { length: 255 }).primaryKey(),
  fullName: varchar("full_name", { length: 255 }),
  email: varchar("email", { length: 255 }),
  phone: varchar("phone", { length: 255 }),
  profession: varchar("profession", { length: 255 }),
  yearsExperience: int("years_experience"),
  specializations: text("specializations"),
  equipment: text("equipment"),
  hasMobileExperience: boolean("has_mobile_experience"),
  cvUrl: varchar("cv_url", { length: 255 }),
  insuranceUrl: varchar("insurance_url", { length: 255 }),
  availability: text("availability"),
  stage: mysqlEnum("stage", ["application_review", "phone_interview", "skills_assessment", "final_interview", "induction"]).default("application_review"),
  status: mysqlEnum("status", ["pending", "scheduled", "in_progress", "completed", "rejected", "induction"]).default("pending"),
  appliedAt: timestamp("applied_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
  applicationNotes: text("application_notes"),
  phoneInterviewNotes: text("phone_interview_notes"),
  skillsAssessmentNotes: text("skills_assessment_notes"),
  finalInterviewNotes: text("final_interview_notes"),
  inductionNotes: text("induction_notes"),
  isArchived: boolean("is_archived").default(false),
});

export type InsertUser = typeof users.$inferInsert;
export type Candidate = typeof candidates.$inferSelect;

