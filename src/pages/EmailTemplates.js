import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
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
export function EmailTemplates() {
    const [templates, setTemplates] = useState(DEFAULT_TEMPLATES);
    const [editingTemplate, setEditingTemplate] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const handleSaveTemplate = (template) => {
        const index = templates.findIndex((t) => t.id === template.id);
        if (index >= 0) {
            const updated = [...templates];
            updated[index] = template;
            setTemplates(updated);
        }
        else {
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
    }, {});
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("h2", { className: "text-2xl font-bold text-slate-900", children: "Email Templates" }), _jsxs(Dialog, { open: isOpen, onOpenChange: setIsOpen, children: [_jsx(DialogTrigger, { asChild: true, children: _jsxs(Button, { className: "bg-gradient-to-r from-purple-600 to-pink-600", children: [_jsx(Plus, { className: "w-4 h-4 mr-2" }), "New Template"] }) }), _jsx(DialogContent, { className: "max-w-2xl", children: _jsx(EmailTemplateEditor, { template: editingTemplate || { id: `template-${Date.now()}`, stage: "", name: "", subject: "", body: "" }, onSave: handleSaveTemplate, onCancel: () => {
                                        setEditingTemplate(null);
                                        setIsOpen(false);
                                    } }) })] })] }), Object.entries(groupedTemplates).map(([stage, stageTemplates]) => (_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-slate-900 mb-4", children: stage }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: stageTemplates.map((template) => (_jsxs(Card, { className: "border-0 shadow-md hover:shadow-lg transition-shadow", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { children: [_jsx(CardTitle, { className: "text-lg", children: template.name }), _jsx(CardDescription, { className: "text-sm mt-1", children: template.subject })] }), _jsxs(Dialog, { open: isOpen && editingTemplate?.id === template.id, onOpenChange: setIsOpen, children: [_jsx(DialogTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "sm", onClick: () => setEditingTemplate(template), children: _jsx(Edit2, { className: "w-4 h-4" }) }) }), _jsx(DialogContent, { className: "max-w-2xl", children: _jsx(EmailTemplateEditor, { template: template, onSave: handleSaveTemplate, onCancel: () => {
                                                                setEditingTemplate(null);
                                                                setIsOpen(false);
                                                            } }) })] })] }) }), _jsxs(CardContent, { children: [_jsx("p", { className: "text-sm text-slate-600 line-clamp-3", children: template.body }), _jsx("div", { className: "mt-4 flex gap-2", children: _jsxs(Button, { variant: "outline", size: "sm", className: "flex-1", children: [_jsx(Mail, { className: "w-4 h-4 mr-2" }), "Preview"] }) })] })] }, template.id))) })] }, stage))), _jsxs("div", { className: "bg-blue-50 border border-blue-200 rounded-lg p-4", children: [_jsx("h4", { className: "font-semibold text-blue-900 mb-2", children: "Available Placeholders" }), _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-blue-800", children: [_jsx("code", { className: "bg-white px-2 py-1 rounded", children: '{{candidateName}}' }), _jsx("code", { className: "bg-white px-2 py-1 rounded", children: '{{profession}}' }), _jsx("code", { className: "bg-white px-2 py-1 rounded", children: '{{interviewDate}}' }), _jsx("code", { className: "bg-white px-2 py-1 rounded", children: '{{interviewTime}}' }), _jsx("code", { className: "bg-white px-2 py-1 rounded", children: '{{inductionLink}}' }), _jsx("code", { className: "bg-white px-2 py-1 rounded", children: '{{candidateEmail}}' })] })] })] }));
}
function EmailTemplateEditor({ template, onSave, onCancel, }) {
    const [formData, setFormData] = useState(template);
    return (_jsxs(_Fragment, { children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Edit Email Template" }), _jsx(DialogDescription, { children: "Customize the email template for this pipeline stage" })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 mb-1", children: "Template Name" }), _jsx(Input, { value: formData.name, onChange: (e) => setFormData({ ...formData, name: e.target.value }), placeholder: "e.g., Application Received" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 mb-1", children: "Stage" }), _jsx(Input, { value: formData.stage, onChange: (e) => setFormData({ ...formData, stage: e.target.value }), placeholder: "e.g., Application Review" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 mb-1", children: "Email Subject" }), _jsx(Input, { value: formData.subject, onChange: (e) => setFormData({ ...formData, subject: e.target.value }), placeholder: "Email subject line" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 mb-1", children: "Email Body" }), _jsx(Textarea, { value: formData.body, onChange: (e) => setFormData({ ...formData, body: e.target.value }), placeholder: "Email content", rows: 10 })] }), _jsxs("div", { className: "flex gap-2 justify-end", children: [_jsx(Button, { variant: "outline", onClick: onCancel, children: "Cancel" }), _jsx(Button, { className: "bg-gradient-to-r from-purple-600 to-pink-600", onClick: () => onSave(formData), children: "Save Template" })] })] })] }));
}
