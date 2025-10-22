import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Briefcase } from "lucide-react";
import ApplicationFormComponent from "@/components/ApplicationFormComponent";
export default function ApplyForm() {
    const [, navigate] = useLocation();
    const createCandidate = trpc.candidates.create.useMutation({
        onSuccess: () => {
            console.log('[DEBUG] Mutation succeeded');
            toast.success("Application submitted successfully! We'll be in touch soon.");
            setTimeout(() => navigate("/"), 2000);
        },
        onError: (error) => {
            console.log('[DEBUG] Mutation failed with error:', error);
            toast.error("Failed to submit application: " + error.message);
        },
    });
    const handleSubmit = (data) => {
        console.log('[DEBUG] ApplyForm handleSubmit called with data:', data);
        console.log('[DEBUG] Calling tRPC mutation: candidates.create');
        createCandidate.mutate(data);
    };
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50", children: [_jsx("header", { className: "bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10", children: _jsxs("div", { className: "container mx-auto py-4 flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center", children: _jsx(Briefcase, { className: "w-6 h-6 text-white" }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-xl font-bold text-gray-900", children: "Viva Therapies" }), _jsx("p", { className: "text-sm text-gray-600", children: "Application Form" })] })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Link, { href: "/", children: _jsx(Button, { variant: "outline", children: "Home" }) }), _jsx(Link, { href: "/positions", children: _jsx(Button, { children: "View Positions" }) })] })] }) }), _jsx("main", { className: "container mx-auto py-12", children: _jsxs(Card, { className: "p-8 max-w-4xl mx-auto", children: [_jsxs("div", { className: "mb-8", children: [_jsx("h2", { className: "text-3xl font-bold text-gray-900 mb-2", children: "Join Our Team" }), _jsx("p", { className: "text-gray-600", children: "Fill out the application form below to start your journey with Viva Therapies" })] }), _jsx(ApplicationFormComponent, { onSubmit: handleSubmit, isLoading: createCandidate.isPending, submitButtonText: "Submit Application", onCancel: () => navigate("/") })] }) })] }));
}
