import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Send, Clock } from "lucide-react";
const PIPELINE_STAGES = [
    { id: "application_review", name: "Application Review", position: 1 },
    { id: "phone_interview", name: "Phone Interview", position: 2 },
    { id: "skills_assessment", name: "Skills Assessment", position: 3 },
    { id: "final_interview", name: "Final Interview", position: 4 },
    { id: "induction", name: "Induction", position: 5 },
];
export function EmailFlowSettings() {
    const [flows, setFlows] = useState(PIPELINE_STAGES.map((stage) => ({
        stageId: stage.id,
        enabled: true,
        templateId: stage.id,
        sendAutomatically: true,
        delayDays: 0,
        sendToCandidate: true,
        sendToTeam: stage.id === "application_review",
        teamEmail: "recruitment@vivatherapies.com",
    })));
    const handleFlowUpdate = (stageId, updates) => {
        setFlows(flows.map((flow) => flow.stageId === stageId ? { ...flow, ...updates } : flow));
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold text-slate-900 mb-2", children: "Email Flow Configuration" }), _jsx("p", { className: "text-slate-600", children: "Set up automated emails for each stage of the recruitment pipeline" })] }), _jsx("div", { className: "grid gap-4", children: PIPELINE_STAGES.map((stage) => {
                    const flow = flows.find((f) => f.stageId === stage.id);
                    if (!flow)
                        return null;
                    return (_jsxs(Card, { className: "border-0 shadow-md", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { children: [_jsx(CardTitle, { className: "text-lg", children: stage.name }), _jsx(CardDescription, { children: "Manage email communications when candidates reach this stage" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-sm text-slate-600", children: "Enable" }), _jsx(Switch, { checked: flow.enabled, onCheckedChange: (checked) => handleFlowUpdate(stage.id, { enabled: checked }) })] })] }) }), flow.enabled && (_jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "border-t pt-6", children: [_jsxs("div", { className: "flex items-center gap-2 mb-4", children: [_jsx(Mail, { className: "w-5 h-5 text-purple-600" }), _jsx("h3", { className: "font-semibold text-slate-900", children: "Candidate Email" })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("input", { type: "checkbox", id: `candidate-${stage.id}`, checked: flow.sendToCandidate, onChange: (e) => handleFlowUpdate(stage.id, { sendToCandidate: e.target.checked }), className: "w-4 h-4" }), _jsx("label", { htmlFor: `candidate-${stage.id}`, className: "text-sm text-slate-700", children: "Send email to candidate" })] }), flow.sendToCandidate && (_jsxs(_Fragment, { children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 mb-2", children: "Email Template" }), _jsxs(Select, { value: flow.templateId, onValueChange: (value) => handleFlowUpdate(stage.id, { templateId: value }), children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, {}) }), _jsxs(SelectContent, { children: [_jsxs(SelectItem, { value: stage.id, children: ["Default ", stage.name, " Template"] }), _jsx(SelectItem, { value: "custom", children: "Custom Template" })] })] })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("input", { type: "checkbox", id: `auto-${stage.id}`, checked: flow.sendAutomatically, onChange: (e) => handleFlowUpdate(stage.id, { sendAutomatically: e.target.checked }), className: "w-4 h-4" }), _jsx("label", { htmlFor: `auto-${stage.id}`, className: "text-sm text-slate-700", children: "Send automatically when candidate enters this stage" })] }), flow.sendAutomatically && (_jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-slate-700 mb-2", children: [_jsx(Clock, { className: "w-4 h-4 inline mr-2" }), "Send after (days)"] }), _jsx("input", { type: "number", min: "0", max: "30", value: flow.delayDays, onChange: (e) => handleFlowUpdate(stage.id, { delayDays: parseInt(e.target.value) }), className: "w-20 px-3 py-2 border border-slate-300 rounded-lg text-sm" })] }))] }))] })] }), _jsxs("div", { className: "border-t pt-6", children: [_jsxs("div", { className: "flex items-center gap-2 mb-4", children: [_jsx(Send, { className: "w-5 h-5 text-pink-600" }), _jsx("h3", { className: "font-semibold text-slate-900", children: "Team Notification" })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("input", { type: "checkbox", id: `team-${stage.id}`, checked: flow.sendToTeam, onChange: (e) => handleFlowUpdate(stage.id, { sendToTeam: e.target.checked }), className: "w-4 h-4" }), _jsx("label", { htmlFor: `team-${stage.id}`, className: "text-sm text-slate-700", children: "Send notification to recruitment team" })] }), flow.sendToTeam && (_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 mb-2", children: "Team Email Address" }), _jsx("input", { type: "email", value: flow.teamEmail, onChange: (e) => handleFlowUpdate(stage.id, { teamEmail: e.target.value }), className: "w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" })] }))] })] })] }))] }, stage.id));
                }) }), _jsxs("div", { className: "bg-amber-50 border border-amber-200 rounded-lg p-4", children: [_jsx("h4", { className: "font-semibold text-amber-900 mb-2", children: "Email Flow Tips" }), _jsxs("ul", { className: "text-sm text-amber-800 space-y-1", children: [_jsx("li", { children: "\u2022 Automatic emails are sent when a candidate's stage changes" }), _jsx("li", { children: "\u2022 Use delays to give candidates time to complete tasks before sending reminders" }), _jsx("li", { children: "\u2022 Team notifications help keep your recruitment team informed of progress" }), _jsx("li", { children: "\u2022 All emails use the templates you've configured in the Email Templates section" })] })] }), _jsxs("div", { className: "flex justify-end gap-2", children: [_jsx(Button, { variant: "outline", children: "Reset to Defaults" }), _jsx(Button, { className: "bg-gradient-to-r from-purple-600 to-pink-600", children: "Save Configuration" })] })] }));
}
