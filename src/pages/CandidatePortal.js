import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Search, CheckCircle, Clock, AlertCircle, FileText, Mail, Phone } from "lucide-react";
const STAGES = [
    { id: "application_review", name: "Application Review", icon: FileText, color: "bg-blue-100 text-blue-700" },
    { id: "phone_interview", name: "Phone Interview", icon: Phone, color: "bg-purple-100 text-purple-700" },
    { id: "skills_assessment", name: "Skills Assessment", icon: CheckCircle, color: "bg-green-100 text-green-700" },
    { id: "final_interview", name: "Final Interview", icon: Mail, color: "bg-orange-100 text-orange-700" },
    { id: "induction", name: "Induction", icon: CheckCircle, color: "bg-emerald-100 text-emerald-700" },
];
export default function CandidatePortal() {
    const [, navigate] = useLocation();
    const [searchEmail, setSearchEmail] = useState("");
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [isVerified, setIsVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    // Query must be called unconditionally
    const { data: candidates, isLoading: isCandidatesLoading } = trpc.candidates.list.useQuery({
        includeArchived: false,
    });
    // Check if user is verified
    useEffect(() => {
        const verifiedEmail = localStorage.getItem("candidate_verified_email");
        if (!verifiedEmail) {
            navigate("/verify-email-candidate");
        }
        else {
            setIsVerified(true);
            setSearchEmail(verifiedEmail);
        }
        setIsLoading(false);
    }, [navigate]);
    // Auto-search when candidates data is loaded and email is verified
    useEffect(() => {
        if (isVerified && !isCandidatesLoading && candidates && candidates.length > 0 && searchEmail && !selectedCandidate) {
            // Find candidate by email
            const found = candidates.find((c) => c.email && c.email.toLowerCase() === searchEmail.toLowerCase());
            if (found) {
                setSelectedCandidate(found);
            }
        }
    }, [isVerified, isCandidatesLoading, candidates, searchEmail, selectedCandidate]);
    // Redirect if not verified
    if (isLoading) {
        return _jsx("div", { className: "min-h-screen flex items-center justify-center", children: "Loading..." });
    }
    if (!isVerified) {
        return null; // Will redirect
    }
    const performSearch = () => {
        if (!searchEmail.trim() || !candidates || candidates.length === 0) {
            return;
        }
        const found = candidates.find((c) => c.email && c.email.toLowerCase() === searchEmail.toLowerCase());
        if (found) {
            setSelectedCandidate(found);
        }
    };
    const getStageIndex = (stage) => {
        return STAGES.findIndex((s) => s.id === stage);
    };
    const getStatusIcon = (status) => {
        switch (status) {
            case "completed":
                return _jsx(CheckCircle, { className: "w-5 h-5 text-green-600" });
            case "in_progress":
                return _jsx(Clock, { className: "w-5 h-5 text-blue-600" });
            case "pending":
                return _jsx(Clock, { className: "w-5 h-5 text-gray-400" });
            case "rejected":
                return _jsx(AlertCircle, { className: "w-5 h-5 text-red-600" });
            default:
                return _jsx(Clock, { className: "w-5 h-5 text-gray-400" });
        }
    };
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50", children: [_jsx("header", { className: "bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10", children: _jsxs("div", { className: "container mx-auto py-4 flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center", children: _jsx(Search, { className: "w-6 h-6 text-white" }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-xl font-bold text-gray-900", children: "Viva Therapies" }), _jsx("p", { className: "text-sm text-gray-600", children: "Application Tracking Portal" })] })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Link, { href: "/", children: _jsx(Button, { variant: "outline", children: "Home" }) }), _jsx(Link, { href: "/positions", children: _jsx(Button, { children: "Apply Now" }) })] })] }) }), _jsx("main", { className: "container mx-auto py-12", children: !selectedCandidate ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "max-w-2xl mx-auto mb-12", children: _jsxs(Card, { className: "p-8", children: [_jsxs("div", { className: "text-center mb-6", children: [_jsx("h2", { className: "text-3xl font-bold text-gray-900 mb-2", children: "Track Your Application" }), _jsx("p", { className: "text-gray-600", children: "Enter your email address to see where you are in our recruitment pipeline" })] }), _jsxs("form", { onSubmit: performSearch, className: "space-y-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "email", children: "Email Address" }), _jsxs("div", { className: "flex gap-2 mt-2", children: [_jsx(Input, { id: "email", type: "email", placeholder: "your@email.com", value: searchEmail, onChange: (e) => setSearchEmail(e.target.value), className: "flex-1" }), _jsx(Button, { type: "submit", disabled: isCandidatesLoading || !searchEmail.trim(), children: isCandidatesLoading ? "Searching..." : "Search" })] })] }), _jsx("div", { className: "mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg", children: _jsxs("p", { className: "text-sm text-blue-800", children: ["\uD83D\uDCA1 ", _jsx("strong", { children: "Tip:" }), " Use the same email address you used when applying to find your application status."] }) })] })] }) }), _jsxs("div", { className: "grid md:grid-cols-2 gap-6 max-w-4xl mx-auto", children: [_jsxs(Card, { className: "p-6", children: [_jsxs("h3", { className: "text-lg font-bold mb-4 flex items-center gap-2", children: [_jsx(CheckCircle, { className: "w-5 h-5 text-green-600" }), "What to Expect"] }), _jsxs("ul", { className: "space-y-2 text-sm text-gray-700", children: [_jsx("li", { children: "\u2713 Application Review (1-2 weeks)" }), _jsx("li", { children: "\u2713 Phone Interview (if shortlisted)" }), _jsx("li", { children: "\u2713 Skills Assessment" }), _jsx("li", { children: "\u2713 Final Interview" }), _jsx("li", { children: "\u2713 Induction & Onboarding" })] })] }), _jsxs(Card, { className: "p-6", children: [_jsxs("h3", { className: "text-lg font-bold mb-4 flex items-center gap-2", children: [_jsx(Mail, { className: "w-5 h-5 text-blue-600" }), "Stay Updated"] }), _jsx("p", { className: "text-sm text-gray-700 mb-4", children: "We'll keep you informed at every stage of the process via email. Check your inbox and spam folder regularly." }), _jsx("p", { className: "text-sm font-semibold text-gray-900", children: "Expected response time: 5-7 business days" })] })] })] })) : (_jsxs(_Fragment, { children: [_jsx("div", { className: "mb-6", children: _jsx(Button, { onClick: () => setSelectedCandidate(null), variant: "outline", children: "\u2190 Back to Search" }) }), _jsxs(Card, { className: "p-8 mb-8", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-3xl font-bold text-gray-900", children: selectedCandidate.fullName }), _jsx("p", { className: "text-gray-600", children: selectedCandidate.email })] }), _jsxs("div", { className: "text-right", children: [_jsx("div", { className: "text-sm text-gray-600", children: "Applied on" }), _jsx("div", { className: "text-lg font-semibold text-gray-900", children: new Date(selectedCandidate.appliedAt).toLocaleDateString() })] })] }), _jsxs("div", { className: "grid md:grid-cols-2 gap-4 mb-6", children: [_jsxs("div", { children: [_jsx(Label, { className: "text-gray-600", children: "Position Applied For" }), _jsx("p", { className: "text-lg font-semibold text-gray-900", children: selectedCandidate.profession })] }), _jsxs("div", { children: [_jsx(Label, { className: "text-gray-600", children: "Current Status" }), _jsxs("div", { className: "flex items-center gap-2 mt-1", children: [getStatusIcon(selectedCandidate.status), _jsx("span", { className: "text-lg font-semibold text-gray-900 capitalize", children: selectedCandidate.status.replace(/_/g, " ") })] })] })] })] }), _jsxs(Card, { className: "p-8", children: [_jsx("h3", { className: "text-2xl font-bold mb-8", children: "Your Application Journey" }), _jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute top-8 left-0 right-0 h-1 bg-gray-200", children: _jsx("div", { className: "h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all", style: {
                                                    width: `${((getStageIndex(selectedCandidate.stage) + 1) / STAGES.length) * 100}%`,
                                                } }) }), _jsx("div", { className: "relative grid grid-cols-5 gap-4", children: STAGES.map((stage, idx) => {
                                                const isCompleted = getStageIndex(selectedCandidate.stage) > idx;
                                                const isCurrent = selectedCandidate.stage === stage.id;
                                                const Icon = stage.icon;
                                                return (_jsxs("div", { className: "flex flex-col items-center", children: [_jsx("div", { className: `w-16 h-16 rounded-full flex items-center justify-center mb-3 transition-all ${isCompleted
                                                                ? "bg-blue-600 text-white"
                                                                : isCurrent
                                                                    ? "bg-purple-600 text-white scale-110 shadow-lg"
                                                                    : "bg-gray-200 text-gray-500"}`, children: _jsx(Icon, { className: "w-8 h-8" }) }), _jsx("p", { className: `text-center text-sm font-medium ${isCurrent ? "text-purple-700" : "text-gray-600"}`, children: stage.name })] }, stage.id));
                                            }) })] })] })] })) })] }));
}
