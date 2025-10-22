import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import {
  getAllCandidates,
  getCandidateById,
  createCandidate,
  updateCandidate,
  archiveCandidate,
  getAllEmailTemplates,
  getEmailTemplateById,
  createEmailTemplate,
  getEmailHistoryForCandidate,
  createEmailHistory,
  updateEmailTemplate,
  deleteEmailTemplate
} from "./db";
import { sendRejectionEmail, sendApplicationConfirmation } from "./notificationService";
import { nanoid } from "nanoid";


export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(async ({ ctx: _ctx }) => {
      // const cookieOptions = getSessionCookieOptions(ctx.req); // This function is not defined
      // ctx.res.clearCookie("session", { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  candidates: router({
    list: publicProcedure
      .input(z.object({
        includeArchived: z.boolean().optional().default(false)
      }))
      .query(async ({ input }) => {
        return await getAllCandidates(input.includeArchived);
      }),

    getById: protectedProcedure
      .input(z.object({ id: z.string() }))
      .query(async ({ input }) => {
        return await getCandidateById(input.id);
      }),

    create: publicProcedure
      .input(z.object({
        fullName: z.string(),
        email: z.string().email(),
        phone: z.string().optional(),
        profession: z.string(),
        yearsExperience: z.number().optional(),
        specializations: z.string().optional(), // JSON string
        equipment: z.string().optional(), // JSON string
        hasMobileExperience: z.boolean().optional(),
        cvUrl: z.string().optional(),
        insuranceUrl: z.string().optional(),
        availability: z.string().optional(), // JSON string
      }))
      .mutation(async ({ input }) => {
        const candidate = {
          id: nanoid(),
          ...input,
          stage: "application_review",
          status: "pending",
        };
        return await createCandidate(candidate);
      }),

    update: protectedProcedure
      .input(z.object({
        id: z.string(),
        fullName: z.string().optional(),
        email: z.string().email().optional(),
        phone: z.string().optional(),
        profession: z.string().optional(),
        yearsExperience: z.number().optional(),
        specializations: z.string().optional(),
        equipment: z.string().optional(),
        hasMobileExperience: z.boolean().optional(),
        stage: z.enum([
          "application_review",
          "phone_interview",
          "skills_assessment",
          "final_interview",
          "induction"
        ]).optional(),
        status: z.enum([
          "pending",
          "scheduled",
          "in_progress",
          "completed",
          "rejected",
          "induction"
        ]).optional(),
        cvUrl: z.string().optional(),
        insuranceUrl: z.string().optional(),
        availability: z.string().optional(),
        applicationNotes: z.string().optional(),
        phoneInterviewNotes: z.string().optional(),
        skillsAssessmentNotes: z.string().optional(),
        finalInterviewNotes: z.string().optional(),
        inductionNotes: z.string().optional(),
        isArchived: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        return await updateCandidate(id, data);
      }),

    archive: protectedProcedure
      .input(z.object({ id: z.string() }))
      .mutation(async ({ input }) => {
        return await archiveCandidate(input.id);
      }),
  }),

  // Email templates
  emailTemplates: router({
    list: protectedProcedure
      .query(async () => {
        return await getAllEmailTemplates();
      }),
    getById: protectedProcedure
      .input(z.object({ id: z.string() }))
      .query(async ({ input }) => {
        return await getEmailTemplateById(input.id);
      }),
    create: protectedProcedure
      .input(z.object({
        name: z.string(),
        subject: z.string(),
        body: z.string(),
        type: z.enum(["application_confirmation", "rejection", "interview_invite", "other"]),
      }))
      .mutation(async ({ input }) => {
        return await createEmailTemplate(input);
      }),
    update: protectedProcedure
      .input(z.object({
        id: z.string(),
        name: z.string().optional(),
        subject: z.string().optional(),
        body: z.string().optional(),
        type: z.enum(["application_confirmation", "rejection", "interview_invite", "other"]).optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        return await updateEmailTemplate(id, data);
      }),
    delete: protectedProcedure
      .input(z.object({ id: z.string() }))
      .mutation(async ({ input }) => {
        // Assuming deleteEmailTemplate function exists in db.ts
        return await deleteEmailTemplate(input.id);
      }),
  }),

  // Email history
  emailHistory: router({
    list: protectedProcedure
      .input(z.object({ candidateId: z.string() }))
      .query(async ({ input }) => {
        return await getEmailHistoryForCandidate(input.candidateId);
      }),
    create: protectedProcedure
      .input(z.object({
        candidateId: z.string(),
        templateId: z.string().optional(),
        subject: z.string(),
        body: z.string(),
        sentBy: z.string(), // User ID or name
        recipientEmail: z.string().email(),
        status: z.enum(["sent", "failed", "pending"]),
      }))
      .mutation(async ({ input }) => {
        return await createEmailHistory(input);
      }),
  }),

  // Notification services
  notifications: router({
    sendRejection: protectedProcedure
      .input(z.object({
        candidateId: z.string(),
        templateId: z.string(),
        reason: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        return await sendRejectionEmail(input.candidateId, input.templateId, input.reason || "");
      }),
    sendApplicationConfirmation: publicProcedure
      .input(z.object({
        candidateId: z.string(),
        templateId: z.string(),
      }))
      .mutation(async ({ input }) => {
        const candidate = await getCandidateById(input.candidateId);
        if (!candidate) {
          throw new Error("Candidate not found");
        }
        return await sendApplicationConfirmation(candidate.email || "", candidate.fullName || "", candidate.profession || "");
      }),
  }),
});

export type AppRouter = typeof appRouter;

