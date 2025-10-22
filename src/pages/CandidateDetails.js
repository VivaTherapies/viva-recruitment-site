import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { APP_LOGO, getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { useLocation, useRoute } from "wouter";
import { useEffect, useState } from "react";
import { ArrowLeft, Mail, Archive, Save } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EmailCenter from "@/components/EmailCenter";
import { useAuth } from "@/lib/hooks/useAuth";
const STAGES = [
    { id: "application_review", name: "Application Review", notesField: "applicationNotes" },
    { id: "phone_interview", name: "Phone Interview", notesField: "phoneInterviewNotes" },
    { id: "skills_assessment", name: "Skills Assessment", notesField: "skillsAssessmentNotes" },
    { id: "final_interview", name: "Final Interview", notesField: "finalInterviewNotes" },
    { id: "induction", name: "Induction", notesField: "inductionNotes" },
];
const STATUS_OPTIONS = [
    { value: "pending", label: "Pending" },
    { value: "scheduled", label: "Scheduled" },
    { value: "in_progress", label: "In Progress" },
    { value: "induction", label: "Induction" },
    { value: "rejected", label: "Rejected" },
    { value: "hired", label: "Hired" },
    { value: "withdrawn", label: "Withdrawn" },
];
export default function CandidateDetails() {
    const { loading: authLoading, isAuthenticated } = useAuth();
    const [, navigate] = useLocation();
    const [match, params] = useRoute("/candidate/:id");
    const candidateId = (match && params) ? params.id : "";
    const { data: candidate, isLoading, refetch } = trpc.candidates.getById.useQuery({ id: candidateId }, { enabled: !!candidateId });
    const updateMutation = trpc.candidates.update.useMutation({
        onSuccess: () => {
            toast.success("Candidate updated successfully");
            refetch();
        },
        onError: (error) => {
            toast.error("Failed to update candidate: " + error.message);
        }
    });
    const archiveMutation = trpc.candidates.archive.useMutation({
        onSuccess: () => {
            toast.success("Candidate archived");
            navigate("/office");
        },
        onError: (error) => {
            toast.error("Failed to archive candidate: " + error.message);
        }
    });
    const [localNotes, setLocalNotes] = useState({});
    const [emailDialogOpen, setEmailDialogOpen] = useState(false);
    useEffect(() => {
        if (candidate) {
            const initialNotes = {};
            STAGES.forEach(stage => {
                initialNotes[stage.notesField] = candidate[stage.notesField] || "";
            });
            setLocalNotes(initialNotes);
        }
    }, [candidate]);
    const handleStageChange = (newStage) => {
        updateMutation.mutate({
            id: candidateId,
            stage: newStage,
        });
    };
    const handleStatusChange = (newStatus) => {
        updateMutation.mutate({
            id: candidateId,
            status: newStatus,
        });
    };
    const handleSaveNotes = (notesField) => {
        const notes = localNotes[notesField] ?? "";
        updateMutation.mutate({
            id: candidateId,
            [notesField]: notes,
        });
    };
    const handleArchive = () => {
        if (confirm("Are you sure you want to archive this candidate?")) {
            archiveMutation.mutate({ id: candidateId });
        }
    };
    if (authLoading || isLoading) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" }), _jsx("p", { className: "mt-4 text-muted-foreground", children: "Loading..." })] }) }));
    }
    if (!isAuthenticated) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center", children: _jsxs(Card, { className: "p-8 max-w-md w-full text-center", children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Access Required" }), _jsx("p", { className: "text-muted-foreground mb-6", children: "Please sign in to view candidate details" }), _jsx(Button, { onClick: () => window.location.href = getLoginUrl(), className: "w-full", children: "Sign In" })] }) }));
    }
    if (!candidate) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center", children: _jsxs(Card, { className: "p-8 max-w-md w-full text-center", children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Candidate Not Found" }), _jsx(Button, { onClick: () => navigate("/office"), children: "Back to Dashboard" })] }) }));
    }
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100", children: [_jsx("header", { className: "bg-white border-b sticky top-0 z-10 shadow-sm", children: _jsx("div", { className: "container mx-auto px-4 py-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(Button, { variant: "ghost", size: "sm", onClick: () => navigate("/office"), children: [_jsx(ArrowLeft, { className: "h-4 w-4 mr-2" }), "Back"] }), APP_LOGO && _jsx("img", { src: APP_LOGO, alt: "Logo", className: "h-10 w-10 rounded-full" }), _jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-gray-900", children: candidate.fullName }), _jsx("p", { className: "text-sm text-gray-600", children: candidate.profession })] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(Button, { variant: "outline", size: "sm", onClick: () => setEmailDialogOpen(true), className: "flex items-center gap-1", children: [_jsx(Mail, { className: "h-4 w-4" }), "Email"] }), _jsxs(Button, { variant: "destructive", size: "sm", onClick: handleArchive, className: "flex items-center gap-1", children: [_jsx(Archive, { className: "h-4 w-4" }), "Archive"] })] })] }) }) }), _jsxs("main", { className: "container mx-auto px-4 py-8", children: [_jsxs(Card, { className: "mb-8 p-6", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-xl", children: "Candidate Information" }) }), _jsxs(CardContent, { className: "grid md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx(Label, { children: "Email" }), _jsx("p", { className: "text-lg font-medium", children: candidate.email })] }), _jsxs("div", { children: [_jsx(Label, { children: "Phone" }), _jsx("p", { className: "text-lg font-medium", children: candidate.phone || "N/A" })] }), _jsxs("div", { children: [_jsx(Label, { children: "Applied On" }), _jsx("p", { className: "text-lg font-medium", children: candidate.appliedAt ? new Date(candidate.appliedAt).toLocaleDateString() : "N/A" })] }), _jsxs("div", { children: [_jsx(Label, { children: "Current Stage" }), _jsxs(Select, { onValueChange: handleStageChange, value: candidate.stage || "", children: [_jsx(SelectTrigger, { className: "w-[180px]", children: _jsx(SelectValue, { placeholder: "Select Stage" }) }), _jsx(SelectContent, { children: STAGES.map((stage) => (_jsx(SelectItem, { value: stage.id, children: stage.name }, stage.id))) })] })] }), _jsxs("div", { children: [_jsx(Label, { children: "Current Status" }), _jsxs(Select, { onValueChange: handleStatusChange, value: candidate.status || "", children: [_jsx(SelectTrigger, { className: "w-[180px]", children: _jsx(SelectValue, { placeholder: "Select Status" }) }), _jsx(SelectContent, { children: STATUS_OPTIONS.map((status) => (_jsx(SelectItem, { value: status.value, children: status.label }, status.value))) })] })] }), _jsxs("div", { children: [_jsx(Label, { children: "Resume" }), candidate.cvUrl ? (_jsx("a", { href: candidate.cvUrl, target: "_blank", rel: "noopener noreferrer", className: "text-blue-600 hover:underline", children: "View Resume" })) : (_jsx("p", { children: "N/A" }))] })] })] }), _jsxs(Tabs, { defaultValue: "applicationNotes", className: "w-full", children: [_jsx(TabsList, { className: "grid w-full grid-cols-5", children: STAGES.map((stage) => (_jsx(TabsTrigger, { value: stage.notesField, children: stage.name }, stage.id))) }), STAGES.map((stage) => (_jsx(TabsContent, { value: stage.notesField, children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { children: [stage.name, " Notes"] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsx(Textarea, { placeholder: `Add notes for ${stage.name}...`, value: localNotes[stage.notesField], onChange: (e) => setLocalNotes((prev) => ({ ...prev, [stage.notesField]: e.target.value })), rows: 5 }), _jsxs(Button, { onClick: () => handleSaveNotes(stage.notesField), className: "flex items-center gap-2", children: [_jsx(Save, { className: "h-4 w-4" }), "Save Notes"] })] })] }) }, stage.id)))] })] }), candidate && (_jsx(EmailCenter, { candidateId: candidate.id, candidateName: candidate.fullName || undefined, candidateEmail: candidate.email || undefined, onClose: () => setEmailDialogOpen(false), isOpen: emailDialogOpen }))] }));
}
