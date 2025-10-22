import { mysqlTable, varchar, text, mysqlEnum, int, boolean, timestamp } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Candidates table
 */
export const candidates = mysqlTable("candidates", {
  id: varchar("id", { length: 64 }).primaryKey(),
  fullName: varchar("fullName", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  profession: varchar("profession", { length: 100 }).notNull(),
  yearsExperience: int("yearsExperience"),
  specializations: text("specializations"), // JSON array
  equipment: text("equipment"), // JSON array
  hasMobileExperience: boolean("hasMobileExperience"),
  availability: text("availability"), // JSON object
  cvUrl: varchar("cvUrl", { length: 500 }),
  insuranceUrl: varchar("insuranceUrl", { length: 500 }),
  stage: mysqlEnum("stage", [
    "application_review",
    "phone_interview",
    "skills_assessment",
    "final_interview",
    "induction",
  ]).notNull(),
  status: mysqlEnum("status", [
    "pending",
    "scheduled",
    "in_progress",
    "completed",
    "rejected",
    "induction",
  ]).notNull(),
  appliedAt: timestamp("appliedAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow(),
  isArchived: boolean("isArchived").default(false),
});

export type Candidate = typeof candidates.$inferSelect;
export type InsertCandidate = typeof candidates.$inferInsert;

/**
 * Documents table for candidate uploads
 */
export const documents = mysqlTable("documents", {
  id: varchar("id", { length: 64 }).primaryKey(),
  candidateId: varchar("candidateId", { length: 64 }).notNull(),
  documentType: mysqlEnum("documentType", [
    "cv",
    "insurance",
    "certificate",
    "qualification",
    "dbs_check",
    "other",
  ]).notNull(),
  fileName: varchar("fileName", { length: 255 }).notNull(),
  fileUrl: varchar("fileUrl", { length: 500 }).notNull(),
  fileSize: int("fileSize"), // in bytes
  mimeType: varchar("mimeType", { length: 100 }),
  
  // Verification
  isVerified: boolean("isVerified").default(false),
  verifiedBy: varchar("verifiedBy", { length: 64 }),
  verifiedAt: timestamp("verifiedAt"),
  
  // Expiry tracking
  expiryDate: timestamp("expiryDate"),
  
  uploadedAt: timestamp("uploadedAt").defaultNow(),
});

export type Document = typeof documents.$inferSelect;
export type InsertDocument = typeof documents.$inferInsert;

/**
 * Induction checklist table
 */
export const inductionChecklist = mysqlTable("inductionChecklist", {
  id: varchar("id", { length: 64 }).primaryKey(),
  candidateId: varchar("candidateId", { length: 64 }).notNull(),
  
  // Personal Information
  personalInfoComplete: boolean("personalInfoComplete").default(false),
  contactDetailsVerified: boolean("contactDetailsVerified").default(false),
  
  // Right to Work
  rightToWorkComplete: boolean("rightToWorkComplete").default(false),
  visaStatusVerified: boolean("visaStatusVerified").default(false),
  
  // Qualifications & Certifications
  qualificationsVerified: boolean("qualificationsVerified").default(false),
  certificatesVerified: boolean("certificatesVerified").default(false),
  
  // DBS Check
  dbsCheckInitiated: boolean("dbsCheckInitiated").default(false),
  dbsCheckComplete: boolean("dbsCheckComplete").default(false),
  
  // Training
  mandatoryTrainingComplete: boolean("mandatoryTrainingComplete").default(false),
  
  // Equipment
  equipmentIssued: boolean("equipmentIssued").default(false),
  
  // Contract & Policies
  contractSigned: boolean("contractSigned").default(false),
  policiesAcknowledged: boolean("policiesAcknowledged").default(false),
  
  // Bank Details
  bankDetailsProvided: boolean("bankDetailsProvided").default(false),
  
  // References
  referencesChecked: boolean("referencesChecked").default(false),
  
  // Onboarding Status
  inductionComplete: boolean("inductionComplete").default(false),
  
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow(),
});

export type InductionChecklist = typeof inductionChecklist.$inferSelect;
export type InsertInductionChecklist = typeof inductionChecklist.$inferInsert;


/**
 * Candidate notes table
 */
export const candidateNotes = mysqlTable("candidateNotes", {
  id: varchar("id", { length: 64 }).primaryKey(),
  candidateId: varchar("candidateId", { length: 64 }).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow(),
});

export type CandidateNote = typeof candidateNotes.$inferSelect;
export type InsertCandidateNote = typeof candidateNotes.$inferInsert;

