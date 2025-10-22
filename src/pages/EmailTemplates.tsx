import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Edit2, Plus, Mail } from "lucide-react";

const DEFAULT_TEMPLATES = [
  {
    id: "application_received",
    stage: "Application Review",
    name: "Application Received",
    subject: "Thank you for applying to Viva Therapies",
    body: `Dear {{candidateName}},

Thank you for submitting your application to Viva Therapies. We have received your application for the {{profession}} position and we're excited to review your qualifications.

Our team will review your application and contact you within 3-5 business days with next steps.

Best regards,
Viva Therapies Recruitment Team`,
  },
  {
    id: "phone_interview",
    stage: "Phone Interview",
    name: "Phone Interview Scheduled",
    subject: "Your Phone Interview with Viva Therapies",
    body: `Dear {{candidateName}},

Congratulations! We would like to invite you for a phone interview.

Date: {{interviewDate}}
Time: {{interviewTime}}
Duration: 15-20 minutes

Please reply to confirm your availability.

Best regards,
Viva Therapies Recruitment Team`,
  },
  {
    id: "skills_assessment",
    stage: "Skills Assessment",
    name: "Skills Assessment Invitation",
    subject: "Skills Assessment - Next Step",
    body: `Dear {{candidateName}},

Great news! You've passed the initial phone interview. We would now like to assess your professional skills.

Please schedule your skills assessment at your earliest convenience.

Best regards,
Viva Therapies Recruitment Team`,
  },
  {
    id: "final_interview",
    stage: "Final Interview",
    name: "Final Interview Invitation",
    subject: "Final Interview Invitation",
    body: `Dear {{candidateName}},

Excellent progress! We would like to invite you for a final interview with our senior team.

Date: {{interviewDate}}
Time: {{interviewTime}}

We look forward to meeting you!

Best regards,
Viva Therapies Recruitment Team`,
  },
  {
    id: "induction",
    stage: "Induction",
    name: "Welcome to Viva Therapies",
    subject: "Welcome to Viva Therapies - Induction Checklist",
    body: `Dear {{candidateName}},

Welcome to the Viva Therapies team! We're excited to have you on board.

Please complete your induction checklist at: {{inductionLink}}

Your induction coordinator will be in touch shortly with additional details.

Best regards,
Viva Therapies Team`,
  },
  {
    id: "rejection",
    stage: "General",
    name: "Application Not Successful",
    subject: "Application Status Update",
    body: `Dear {{candidateName}},

Thank you for your interest in Viva Therapies. After careful consideration, we have decided to move forward with other candidates whose experience more closely matches our current needs.

We appreciate your time and effort in applying.

Best regards,
Viva Therapies Recruitment Team`,
  },
];

interface EmailTemplate {
  id: string;
  stage: string;
  name: string;
  subject: string;
  body: string;
}

export function EmailTemplates() {
  const [templates, setTemplates] = useState<EmailTemplate[]>(DEFAULT_TEMPLATES);
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSaveTemplate = (template: EmailTemplate) => {
    const index = templates.findIndex((t) => t.id === template.id);
    if (index >= 0) {
      const updated = [...templates];
      updated[index] = template;
      setTemplates(updated);
    } else {
      setTemplates([...templates, template]);
    }
    setEditingTemplate(null);
    setIsOpen(false);
  };

  const groupedTemplates = templates.reduce((acc, template) => {
    if (!acc[template.stage]) {
      acc[template.stage] = [];
    }
    acc[template.stage].push(template);
    return acc;
  }, {} as Record<string, EmailTemplate[]>);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900">Email Templates</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
              <Plus className="w-4 h-4 mr-2" />
              New Template
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <EmailTemplateEditor
              template={editingTemplate || { id: `template-${Date.now()}`, stage: "", name: "", subject: "", body: "" }}
              onSave={handleSaveTemplate}
              onCancel={() => {
                setEditingTemplate(null);
                setIsOpen(false);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      {Object.entries(groupedTemplates).map(([stage, stageTemplates]) => (
        <div key={stage}>
          <h3 className="text-lg font-semibold text-slate-900 mb-4">{stage}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stageTemplates.map((template) => (
              <Card key={template.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <CardDescription className="text-sm mt-1">{template.subject}</CardDescription>
                    </div>
                    <Dialog open={isOpen && editingTemplate?.id === template.id} onOpenChange={setIsOpen}>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingTemplate(template)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <EmailTemplateEditor
                          template={template}
                          onSave={handleSaveTemplate}
                          onCancel={() => {
                            setEditingTemplate(null);
                            setIsOpen(false);
                          }}
                        />
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 line-clamp-3">{template.body}</p>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Mail className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">Available Placeholders</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-blue-800">
          <code className="bg-white px-2 py-1 rounded">{'{{candidateName}}'}</code>
          <code className="bg-white px-2 py-1 rounded">{'{{profession}}'}</code>
          <code className="bg-white px-2 py-1 rounded">{'{{interviewDate}}'}</code>
          <code className="bg-white px-2 py-1 rounded">{'{{interviewTime}}'}</code>
          <code className="bg-white px-2 py-1 rounded">{'{{inductionLink}}'}</code>
          <code className="bg-white px-2 py-1 rounded">{'{{candidateEmail}}'}</code>
        </div>
      </div>
    </div>
  );
}

function EmailTemplateEditor({
  template,
  onSave,
  onCancel,
}: {
  template: EmailTemplate;
  onSave: (template: EmailTemplate) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState(template);

  return (
    <>
      <DialogHeader>
        <DialogTitle>Edit Email Template</DialogTitle>
        <DialogDescription>Customize the email template for this pipeline stage</DialogDescription>
      </DialogHeader>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Template Name</label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., Application Received"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Stage</label>
          <Input
            value={formData.stage}
            onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
            placeholder="e.g., Application Review"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email Subject</label>
          <Input
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            placeholder="Email subject line"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email Body</label>
          <Textarea
            value={formData.body}
            onChange={(e) => setFormData({ ...formData, body: e.target.value })}
            placeholder="Email content"
            rows={10}
          />
        </div>

        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            className="bg-gradient-to-r from-purple-600 to-pink-600"
            onClick={() => onSave(formData)}
          >
            Save Template
          </Button>
        </div>
      </div>
    </>
  );
}

