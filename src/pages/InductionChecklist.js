import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "wouter";
import { CheckCircle, FileText, Shield, Users, Briefcase, Award } from "lucide-react";
const INDUCTION_CHECKLIST = [
    // Personal Information
    {
        id: "personal_info",
        category: "Personal Information",
        title: "Complete Personal Details",
        description: "Verify and complete all personal information in the system",
        completed: false,
        icon: _jsx(FileText, { className: "w-5 h-5" }),
    },
    {
        id: "contact_details",
        category: "Personal Information",
        title: "Verify Contact Details",
        description: "Confirm phone number, email, and address are correct",
        completed: false,
        icon: _jsx(FileText, { className: "w-5 h-5" }),
    },
    {
        id: "emergency_contact",
        category: "Personal Information",
        title: "Add Emergency Contact",
        description: "Provide emergency contact information for safety",
        completed: false,
        icon: _jsx(FileText, { className: "w-5 h-5" }),
    },
    // Professional Qualifications
    {
        id: "qualifications",
        category: "Professional Qualifications",
        title: "Upload Qualifications",
        description: "Submit all relevant professional certificates and diplomas",
        completed: false,
        icon: _jsx(Award, { className: "w-5 h-5" }),
    },
    {
        id: "insurance",
        category: "Professional Qualifications",
        title: "Verify Insurance",
        description: "Confirm Professional Indemnity and Public Liability Insurance is valid",
        completed: false,
        icon: _jsx(Shield, { className: "w-5 h-5" }),
    },
    {
        id: "dbs_check",
        category: "Professional Qualifications",
        title: "Complete DBS Check",
        description: "Undergo Disclosure and Barring Service check",
        completed: false,
        icon: _jsx(Shield, { className: "w-5 h-5" }),
    },
    // Legal Requirements
    {
        id: "right_to_work",
        category: "Legal Requirements",
        title: "Verify Right to Work",
        description: "Provide proof of right to work in the UK",
        completed: false,
        icon: _jsx(Briefcase, { className: "w-5 h-5" }),
    },
    {
        id: "contract_signed",
        category: "Legal Requirements",
        title: "Sign Employment Contract",
        description: "Review and sign your employment contract",
        completed: false,
        icon: _jsx(Briefcase, { className: "w-5 h-5" }),
    },
    {
        id: "gdpr_consent",
        category: "Legal Requirements",
        title: "GDPR Consent",
        description: "Provide consent for data processing and privacy policy",
        completed: false,
        icon: _jsx(Shield, { className: "w-5 h-5" }),
    },
    // Professional References
    {
        id: "reference_1",
        category: "Professional References",
        title: "First Professional Reference",
        description: "Provide details of first professional reference",
        completed: false,
        icon: _jsx(Users, { className: "w-5 h-5" }),
    },
    {
        id: "reference_2",
        category: "Professional References",
        title: "Second Professional Reference",
        description: "Provide details of second professional reference",
        completed: false,
        icon: _jsx(Users, { className: "w-5 h-5" }),
    },
    {
        id: "references_verified",
        category: "Professional References",
        title: "References Verified",
        description: "Our team will contact your references to verify",
        completed: false,
        icon: _jsx(Users, { className: "w-5 h-5" }),
    },
    // Equipment & Setup
    {
        id: "equipment_list",
        category: "Equipment & Setup",
        title: "Submit Equipment List",
        description: "Provide detailed list of professional equipment and tools",
        completed: false,
        icon: _jsx(Briefcase, { className: "w-5 h-5" }),
    },
    {
        id: "equipment_verified",
        category: "Equipment & Setup",
        title: "Equipment Verified",
        description: "Our team will verify your equipment meets our standards",
        completed: false,
        icon: _jsx(Briefcase, { className: "w-5 h-5" }),
    },
    {
        id: "brands_specified",
        category: "Equipment & Setup",
        title: "Brands & Products Specified",
        description: "Specify brands and products you work with for quality assurance",
        completed: false,
        icon: _jsx(Briefcase, { className: "w-5 h-5" }),
    },
    // Company Integration
    {
        id: "system_training",
        category: "Company Integration",
        title: "Complete System Training",
        description: "Learn how to use our booking and management systems",
        completed: false,
        icon: _jsx(Award, { className: "w-5 h-5" }),
    },
    {
        id: "profile_setup",
        category: "Company Integration",
        title: "Complete Profile Setup",
        description: "Set up your professional profile with photos and bio",
        completed: false,
        icon: _jsx(Award, { className: "w-5 h-5" }),
    },
    {
        id: "team_introduction",
        category: "Company Integration",
        title: "Team Introduction",
        description: "Meet the team and get to know your colleagues",
        completed: false,
        icon: _jsx(Users, { className: "w-5 h-5" }),
    },
    {
        id: "policies_acknowledged",
        category: "Company Integration",
        title: "Acknowledge Policies",
        description: "Review and acknowledge company policies and procedures",
        completed: false,
        icon: _jsx(Award, { className: "w-5 h-5" }),
    },
];
export default function InductionChecklist() {
    const [checklist, setChecklist] = useState(INDUCTION_CHECKLIST);
    const toggleItem = (id) => {
        setChecklist((prev) => prev.map((item) => item.id === id ? { ...item, completed: !item.completed } : item));
    };
    const categories = Array.from(new Set(checklist.map((item) => item.category)));
    const completedCount = checklist.filter((item) => item.completed).length;
    const totalCount = checklist.length;
    const progressPercentage = Math.round((completedCount / totalCount) * 100);
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50", children: [_jsx("header", { className: "bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10", children: _jsxs("div", { className: "container mx-auto py-4 flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 bg-gradient-to-br from-emerald-600 to-green-600 rounded-lg flex items-center justify-center", children: _jsx(CheckCircle, { className: "w-6 h-6 text-white" }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-xl font-bold text-gray-900", children: "Viva Therapies" }), _jsx("p", { className: "text-sm text-gray-600", children: "Induction Checklist" })] })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Link, { href: "/", children: _jsx(Button, { variant: "outline", children: "Home" }) }), _jsx(Link, { href: "/track", children: _jsx(Button, { variant: "outline", children: "Track Application" }) })] })] }) }), _jsxs("main", { className: "container mx-auto py-12", children: [_jsxs(Card, { className: "p-8 mb-8 bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200", children: [_jsxs("div", { className: "flex items-center gap-4 mb-4", children: [_jsx(CheckCircle, { className: "w-12 h-12 text-emerald-600" }), _jsxs("div", { children: [_jsx("h2", { className: "text-3xl font-bold text-gray-900", children: "Welcome to Viva Therapies!" }), _jsx("p", { className: "text-gray-600", children: "Your induction checklist to get started" })] })] }), _jsx("p", { className: "text-gray-700 mb-4", children: "Congratulations on joining our team! This checklist will guide you through the onboarding process. Complete each item to ensure you're fully set up and ready to start delivering exceptional service." })] }), _jsxs(Card, { className: "p-6 mb-8", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h3", { className: "text-lg font-bold text-gray-900", children: "Overall Progress" }), _jsxs("span", { className: "text-2xl font-bold text-emerald-600", children: [completedCount, "/", totalCount] })] }), _jsx("div", { className: "w-full bg-gray-200 rounded-full h-4 overflow-hidden", children: _jsx("div", { className: "bg-gradient-to-r from-emerald-500 to-green-500 h-full transition-all duration-300", style: { width: `${progressPercentage}%` } }) }), _jsxs("p", { className: "text-sm text-gray-600 mt-2", children: [progressPercentage, "% complete - Great progress!"] })] }), _jsx("div", { className: "space-y-6", children: categories.map((category) => {
                            const categoryItems = checklist.filter((item) => item.category === category);
                            const categoryCompleted = categoryItems.filter((item) => item.completed).length;
                            return (_jsxs(Card, { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h3", { className: "text-xl font-bold text-gray-900", children: category }), _jsxs("span", { className: "text-sm text-gray-600", children: [categoryCompleted, "/", categoryItems.length, " completed"] })] }), _jsx("div", { className: "space-y-3", children: categoryItems.map((item) => (_jsxs("div", { className: `flex items-start gap-4 p-4 rounded-lg border-2 transition-all ${item.completed
                                                ? "bg-emerald-50 border-emerald-200"
                                                : "bg-gray-50 border-gray-200 hover:border-emerald-300"}`, children: [_jsx(Checkbox, { id: item.id, checked: item.completed, onCheckedChange: () => toggleItem(item.id), className: "mt-1" }), _jsxs("div", { className: "flex-1", children: [_jsx("label", { htmlFor: item.id, className: `font-semibold cursor-pointer block ${item.completed ? "text-emerald-700 line-through" : "text-gray-900"}`, children: item.title }), _jsx("p", { className: "text-sm text-gray-600 mt-1", children: item.description })] }), _jsx("div", { className: `flex-shrink-0 ${item.completed ? "text-emerald-600" : "text-gray-400"}`, children: item.icon })] }, item.id))) })] }, category));
                        }) }), _jsxs(Card, { className: "p-8 mt-8 bg-blue-50 border-blue-200", children: [_jsxs("h3", { className: "text-2xl font-bold mb-4 flex items-center gap-2", children: [_jsx(Award, { className: "w-6 h-6 text-blue-600" }), "What's Next?"] }), _jsxs("div", { className: "space-y-3 text-gray-700", children: [_jsxs("p", { children: ["\u2713 ", _jsx("strong", { children: "Complete all checklist items" }), " - Work through each category systematically"] }), _jsxs("p", { children: ["\u2713 ", _jsx("strong", { children: "Contact your onboarding manager" }), " - Reach out if you have any questions"] }), _jsxs("p", { children: ["\u2713 ", _jsx("strong", { children: "Schedule your first booking" }), " - Once setup is complete, you can start accepting clients"] }), _jsxs("p", { children: ["\u2713 ", _jsx("strong", { children: "Attend team meetings" }), " - Join our regular team calls and training sessions"] })] }), _jsxs("div", { className: "mt-6 flex gap-3", children: [_jsx(Button, { className: "bg-blue-600 hover:bg-blue-700", children: "Contact Onboarding Manager" }), _jsx(Button, { variant: "outline", children: "Download Onboarding Guide" })] })] }), _jsxs(Card, { className: "p-6 mt-8 text-center", children: [_jsx("h4", { className: "font-bold text-lg mb-2", children: "Need Help?" }), _jsx("p", { className: "text-gray-700 mb-4", children: "Our onboarding team is here to support you throughout the induction process." }), _jsx(Button, { variant: "outline", children: "Schedule a Call with Onboarding Team" })] })] })] }));
}
