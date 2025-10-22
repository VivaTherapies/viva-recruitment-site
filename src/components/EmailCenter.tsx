import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Mail, Send, X } from "lucide-react";
import { toast } from "sonner";
import { sendCustomEmail, initEmailJS } from "../lib/emailService";
import { trpc } from "../lib/trpc";
import { ENV } from "../lib/env";

interface EmailCenterProps {
  isOpen: boolean;
  onClose: () => void;
  candidateId?: string;
  candidateName?: string;
  candidateEmail?: string;
}

const EMAIL_TEMPLATES = [
  {
    id: "application_confirmation",
    name: "Application Confirmation",
    subject: "Application Received - Viva Therapies",
    body: `Dear {{candidate_name}},

Thank you for applying for the {{position}} position at Viva Therapies. We have received your application and will review it shortly.

We appreciate your interest in joining our team of wellness professionals.

Best regards,
Viva Therapies Recruitment Team`,
  },
  {
    id: "phone_interview",
    name: "Phone Interview Invitation",
    subject: "Phone Interview Scheduled - Viva Therapies",
    body: `Dear {{candidate_name}},

We would like to invite you for a phone interview for the {{position}} position.

Interview Details:
Date: {{interview_date}}
Time: {{interview_time}}
Duration: 15-20 minutes

Please confirm your availability at your earliest convenience.

Best regards,
Viva Therapies Recruitment Team`,
  },
  {
    id: "skills_assessment",
    name: "Skills Assessment Invitation",
    subject: "Skills Assessment - Viva Therapies",
    body: `Dear {{candidate_name}},

Congratulations on progressing to the skills assessment stage for the {{position}} position.

Assessment Details:
Date: {{interview_date}}
Time: {{interview_time}}
Duration: 45-60 minutes
Location: {{interview_location}}

Please bring your professional equipment and be prepared to demonstrate your skills.

Best regards,
Viva Therapies Recruitment Team`,
  },
  {
    id: "final_interview",
    name: "Final Interview Invitation",
    subject: "Final Interview - Viva Therapies",
    body: `Dear {{candidate_name}},

We are pleased to invite you to the final interview for the {{position}} position.

Interview Details:
Date: {{interview_date}}
Time: {{interview_time}}
Duration: 30-45 minutes

This will be your opportunity to meet our team and learn more about Viva Therapies.

Best regards,
Viva Therapies Recruitment Team`,
  },
  {
    id: "induction",
    name: "Induction Welcome",
    subject: "Welcome to Viva Therapies - Induction",
    body: `Dear {{candidate_name}},

Welcome to Viva Therapies! We are excited to have you join our team.

Your induction will begin on {{interview_date}}. Please ensure you have all required documents and certifications ready.

We look forward to working with you.

Best regards,
Viva Therapies Team`,
  },
  {
    id: "rejection",
    name: "Application Unsuccessful",
    subject: "Application Update - Viva Therapies",
    body: `Dear {{candidate_name}},

Thank you for your interest in the {{position}} position at Viva Therapies.

After careful consideration, we have decided to move forward with other candidates whose qualifications more closely match our current needs.

We appreciate the time you invested in the application process and wish you the best in your career.

Best regards,
Viva Therapies Recruitment Team`,
  },
  {
    id: "custom",
    name: "Custom Email",
    subject: "",
    body: "",
  },
];

export default function EmailCenter({
  isOpen,
  onClose,
  candidateId,
  candidateName = "",
  candidateEmail = "",
}: EmailCenterProps) {
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [isSending, setIsSending] = useState(false);

  const { data: candidate } = trpc.candidates.getById.useQuery(
    { id: candidateId || "" },
    { enabled: !!candidateId }
  );

  const createEmailHistory = trpc.emailHistory.create.useMutation();

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = EMAIL_TEMPLATES.find(t => t.id === templateId);
    if (template) {
      setSubject(template.subject);
      setBody(template.body);
    }
  };

  const replacePlaceholders = (text: string): string => {
    return text
      .replace(/{{candidate_name}}/g, candidateName || candidate?.fullName || "")
      .replace(/{{position}}/g, candidate?.profession || "")
      .replace(/{{interview_date}}/g, "[Date to be confirmed]")
      .replace(/{{interview_time}}/g, "[Time to be confirmed]")
      .replace(/{{interview_location}}/g, "[Location to be confirmed]");
  };

  const handleSendEmail = async () => {
    if (!candidateEmail && !candidate?.email) {
      toast.error("No email address available for this candidate");
      return;
    }

    if (!subject || !body) {
      toast.error("Please fill in subject and message");
      return;
    }

    setIsSending(true);

    try {
      // Initialize EmailJS
      const isInitialized = initEmailJS();
      
      if (!isInitialized) {
        toast.warning("EmailJS not configured. Email logged but not sent.", {
          description: "To enable email sending, configure EmailJS credentials in environment variables.",
        });
        
        // Log email to database even if not sent
        if (candidateId) {
          await createEmailHistory.mutateAsync({
            candidateId,
            recipientEmail: candidateEmail || candidate?.email || "",
            subject: replacePlaceholders(subject),
            body: replacePlaceholders(body),
            status: "failed",
            sentBy: "System", // Placeholder for missing sentBy field
          });
        }
        
        onClose();
        return;
      }

      // Send email via EmailJS
      const finalSubject = replacePlaceholders(subject);
      const finalBody = replacePlaceholders(body);
      
      const success = await sendCustomEmail(
        candidateName || candidate?.fullName || "",
        candidateEmail || candidate?.email || "",
        finalSubject,
        finalBody
      );

      if (success) {
        toast.success("Email sent successfully!");
        
        // Log to database
        if (candidateId) {
          await createEmailHistory.mutateAsync({
            candidateId,
            recipientEmail: candidateEmail || candidate?.email || "",
            subject: finalSubject,
            body: finalBody,
            status: "sent",
            sentBy: "System", // Placeholder for missing sentBy field
          });
        }
        
        onClose();
      } else {
        toast.error("Failed to send email. Please try again.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("An error occurred while sending the email");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Send Email to {candidateName || candidate?.fullName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Email Configuration Notice */}
          {ENV.forgeApiKey === 'YOUR_PUBLIC_KEY' && (
            <Card className="p-4 bg-yellow-50 border-yellow-200">
              <p className="text-sm text-yellow-800">
                <strong>⚠️ EmailJS Not Configured</strong><br />
                To enable email sending, please configure EmailJS:
              </p>
              <ol className="text-xs text-yellow-700 mt-2 ml-4 list-decimal">
                <li>Create an account at <a href="https://www.emailjs.com/" target="_blank" rel="noopener noreferrer" className="underline">emailjs.com</a></li>
                <li>Set up an email service (Gmail, Outlook, etc.)</li>
                <li>Create email templates</li>
                <li>Add your credentials to environment variables:
                  <ul className="ml-4 mt-1 list-disc">
                    <li>VITE_EMAILJS_PUBLIC_KEY</li>
                    <li>VITE_EMAILJS_SERVICE_ID</li>
                    <li>VITE_EMAILJS_TEMPLATE_* (for each template)</li>
                  </ul>
                </li>
              </ol>
            </Card>
          )}

          {/* Template Selection */}
          <div>
            <Label>Email Template</Label>
            <Select value={selectedTemplate} onValueChange={handleTemplateChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a template..." />
              </SelectTrigger>
              <SelectContent>
                {EMAIL_TEMPLATES.map(template => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Recipient */}
          <div>
            <Label>To</Label>
            <Input
              value={candidateEmail || candidate?.email || ""}
              disabled
              className="bg-gray-50"
            />
          </div>

          {/* Subject */}
          <div>
            <Label>Subject</Label>
            <Input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Email subject..."
            />
          </div>

          {/* Body */}
          <div>
            <Label>Message</Label>
            <Textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Email message..."
              rows={12}
              className="font-mono text-sm"
            />
            <p className="text-xs text-gray-500 mt-1">
              {`Available placeholders: {{candidate_name}}, {{position}}, {{interview_date}}, {{interview_time}}, {{interview_location}}`}
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSendEmail} disabled={isSending}>
              <Send className="h-4 w-4 mr-2" />
              {isSending ? "Sending..." : "Send Email"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
