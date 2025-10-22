import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { APP_LOGO, getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import { useState, useMemo } from "react";
import { Search, Plus, Mail, Archive } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import EmailCenter from "@/components/EmailCenter";
import ApplicationFormComponent from "@/components/ApplicationFormComponent";
import { useAuth } from "@/lib/hooks/useAuth";
const STAGES = [
    { id: "application_review", name: "Application Review", duration: "2-3 days", color: "bg-yellow-500" },
    { id: "phone_interview", name: "Phone Interview", duration: "15-20 min", color: "bg-blue-500" },
    { id: "skills_assessment", name: "Skills Assessment", duration: "45-60 min", color: "bg-purple-500" },
    { id: "final_interview", name: "Final Interview", duration: "30-45 min", color: "bg-orange-500" },
    { id: "induction", name: "Induction", duration: "1-2 weeks", color: "bg-green-500" },
];
const STATUS_COLORS = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
    scheduled: "bg-blue-100 text-blue-800 border-blue-300",
    in_progress: "bg-purple-100 text-purple-800 border-purple-300",
    induction: "bg-green-100 text-green-800 border-green-300",
    rejected: "bg-red-100 text-red-800 border-red-300",
    hired: "bg-emerald-100 text-emerald-800 border-emerald-300",
    withdrawn: "bg-gray-100 text-gray-800 border-gray-300",
};
export default function OfficeDashboard() {
    const { user, loading, isAuthenticated } = useAuth();
    const [, navigate] = useLocation();
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [showArchived, setShowArchived] = useState(false);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [emailDialogOpen, setEmailDialogOpen] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const { data: candidates = [], isLoading, refetch } = trpc.candidates.list.useQuery({ includeArchived: showArchived });
    const createMutation = trpc.candidates.create.useMutation({
        onSuccess: () => {
            toast.success("Candidate added successfully");
            setIsAddDialogOpen(false);
            refetch();
        },
        onError: (error) => {
            toast.error("Failed to add candidate: " + error.message);
        }
    });
    const filteredCandidates = useMemo(() => {
        return candidates.filter((candidate) => {
            const matchesSearch = candidate.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                candidate.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                candidate.profession.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = statusFilter === "all" || candidate.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [candidates, searchQuery, statusFilter]);
    const candidatesByStage = useMemo(() => {
        const grouped = {};
        STAGES.forEach(stage => {
            grouped[stage.id] = filteredCandidates.filter((c) => c.stage === stage.id);
        });
        return grouped;
    }, [filteredCandidates]);
    const handleAddCandidate = (data) => {
        createMutation.mutate(data);
    };
    if (loading) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" }), _jsx("p", { className: "mt-4 text-muted-foreground", children: "Loading..." })] }) }));
    }
    if (!isAuthenticated) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center", children: _jsxs(Card, { className: "p-8 max-w-md w-full text-center", children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Office Portal Access" }), _jsx("p", { className: "text-muted-foreground mb-6", children: "Please sign in to access the recruitment dashboard" }), _jsx(Button, { onClick: () => window.location.href = getLoginUrl(), className: "w-full", children: "Sign In" })] }) }));
    }
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100", children: [_jsx("header", { className: "bg-white border-b sticky top-0 z-10 shadow-sm", children: _jsx("div", { className: "container mx-auto px-4 py-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [APP_LOGO && _jsx("img", { src: APP_LOGO, alt: "Logo", className: "h-10 w-10 rounded-full" }), _jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "Viva Therapies" }), _jsx("p", { className: "text-sm text-gray-600", children: "Recruitment Dashboard" })] })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("span", { className: "text-sm text-gray-600", children: ["Welcome, ", user?.name || "User"] }), _jsx(Button, { variant: "outline", size: "sm", onClick: () => navigate("/"), children: "Home" })] })] }) }) }), _jsxs("main", { className: "container mx-auto px-4 py-8", children: [_jsx("div", { className: "mb-8 space-y-4", children: _jsxs("div", { className: "flex flex-col md:flex-row gap-4 items-start md:items-center justify-between", children: [_jsx("div", { className: "flex-1 max-w-md", children: _jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" }), _jsx(Input, { placeholder: "Search by name, email, or profession...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "pl-10 pr-4 py-2 border rounded-md w-full" })] }) }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsxs(Select, { onValueChange: setStatusFilter, value: statusFilter, children: [_jsx(SelectTrigger, { className: "w-[180px]", children: _jsx(SelectValue, { placeholder: "Filter by Status" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "all", children: "All Statuses" }), Object.keys(STATUS_COLORS).map(status => (_jsx(SelectItem, { value: status, children: status.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase()) }, status)))] })] }), _jsxs(Button, { variant: "outline", onClick: () => setShowArchived(!showArchived), className: `flex items-center gap-2 ${showArchived ? "bg-gray-200" : ""}`, children: [_jsx(Archive, { className: "h-4 w-4" }), showArchived ? "Hide Archived" : "Show Archived"] }), _jsxs(Dialog, { open: isAddDialogOpen, onOpenChange: setIsAddDialogOpen, children: [_jsx(DialogTrigger, { asChild: true, children: _jsxs(Button, { className: "flex items-center gap-2", children: [_jsx(Plus, { className: "h-4 w-4" }), "Add Candidate"] }) }), _jsxs(DialogContent, { className: "sm:max-w-[425px]", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: "Add New Candidate" }) }), _jsx(ApplicationFormComponent, { onSubmit: handleAddCandidate, isLoading: createMutation.isPending })] })] })] })] }) }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6", children: STAGES.map(stage => (_jsxs(Card, { className: "bg-white rounded-lg shadow-md p-4", children: [_jsxs("h3", { className: `text-lg font-semibold mb-4 ${stage.color} p-2 rounded-md text-white`, children: [stage.name, " (", candidatesByStage[stage.id]?.length || 0, ")"] }), _jsx("div", { className: "space-y-3", children: candidatesByStage[stage.id]?.map((candidate) => (_jsxs(Card, { className: "bg-gray-50 p-3 rounded-md shadow-sm cursor-pointer hover:bg-gray-100 transition-colors", onClick: () => navigate(`/candidate/${candidate.id}`), children: [_jsx("p", { className: "font-medium text-gray-800", children: candidate.fullName }), _jsx("p", { className: "text-sm text-gray-600", children: candidate.profession }), _jsx(Badge, { className: `mt-1 ${STATUS_COLORS[candidate.status]}`, children: candidate.status.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()) }), _jsx("div", { className: "flex justify-end mt-2", children: _jsx(Button, { variant: "ghost", size: "sm", onClick: (e) => {
                                                        e.stopPropagation();
                                                        setSelectedCandidate(candidate);
                                                        setEmailDialogOpen(true);
                                                    }, children: _jsx(Mail, { className: "h-4 w-4" }) }) })] }, candidate.id))) })] }, stage.id))) })] }), selectedCandidate && (_jsx(Dialog, { open: emailDialogOpen, onOpenChange: setEmailDialogOpen, children: _jsxs(DialogContent, { className: "sm:max-w-[600px]", children: [_jsx(DialogHeader, { children: _jsxs(DialogTitle, { children: ["Email Candidate: ", selectedCandidate.name] }) }), _jsx(EmailCenter, { isOpen: emailDialogOpen, candidateId: selectedCandidate?.id, candidateName: selectedCandidate?.name, candidateEmail: selectedCandidate?.email, onClose: () => setEmailDialogOpen(false) })] }) }))] }));
}
