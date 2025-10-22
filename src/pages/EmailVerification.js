import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";
import { Mail, CheckCircle2, AlertCircle } from "lucide-react";
import { sendVerificationEmail } from "@/lib/emailService"; // Corrected import path
export default function EmailVerification() {
    const [, setLocation] = useLocation();
    const [email, setEmail] = useState("");
    const [userEnteredCode, setUserEnteredCode] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [generatedCode, setGeneratedCode] = useState(""); // Store code internally, don't display
    const [portalType] = useState(() => {
        const path = window.location.pathname;
        return path.includes("office") ? "office" : "candidate";
    });
    const generateVerificationCode = () => {
        return Math.random().toString(36).substring(2, 8).toUpperCase();
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            // Validate email format
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(email)) {
                setError("Please enter a valid email address");
                setLoading(false);
                return;
            }
            // Generate verification code
            const code = generateVerificationCode();
            setGeneratedCode(code); // Store internally but don't display
            // Send verification email
            const result = await sendVerificationEmail(email, code, portalType);
            if (result.success) {
                setSubmitted(true);
                setUserEnteredCode(""); // Clear user input field
            }
            else {
                setError(result.message);
            }
        }
        catch (err) {
            setError("An error occurred. Please try again.");
            console.error(err);
        }
        finally {
            setLoading(false);
        }
    };
    const handleVerifyCode = async (e) => {
        e.preventDefault();
        setError("");
        setVerifying(true);
        try {
            // Verify the code entered by user matches the generated code
            if (!userEnteredCode || userEnteredCode.length === 0) {
                setError("Please enter the verification code");
                setVerifying(false);
                return;
            }
            // Check if the entered code matches the generated code
            if (userEnteredCode.toUpperCase() !== generatedCode.toUpperCase()) {
                setError("Invalid verification code. Please check your email and try again.");
                setVerifying(false);
                return;
            }
            // Store email in localStorage for portal access
            const pt = portalType;
            localStorage.setItem(`${pt}_verified_email`, email);
            localStorage.setItem(`${pt}_verification_time`, new Date().toISOString());
            // Redirect to portal
            setTimeout(() => {
                const pt = portalType;
                if (pt === "office") {
                    setLocation("/office");
                }
                else {
                    setLocation("/track");
                }
            }, 1000);
        }
        catch (err) {
            setError("Verification failed. Please try again.");
            console.error(err);
        }
        finally {
            setVerifying(false);
        }
    };
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center p-4", children: _jsxs(Card, { className: "w-full max-w-md border-0 shadow-lg", children: [_jsxs(CardHeader, { className: "text-center", children: [_jsx("div", { className: "flex justify-center mb-4", children: _jsx("div", { className: "w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center", children: _jsx(Mail, { className: "w-6 h-6 text-white" }) }) }), _jsx(CardTitle, { className: "text-2xl", children: portalType === "office" ? "Office Portal Access" : "Track Your Application" }), _jsx(CardDescription, { className: "mt-2", children: !submitted
                                ? portalType === "office"
                                    ? "Enter your office email to access the recruitment dashboard"
                                    : "Enter your email to check your application status"
                                : "Enter the verification code we sent to your email" })] }), _jsx(CardContent, { children: !submitted ? (_jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 mb-2", children: "Email Address" }), _jsx(Input, { type: "email", placeholder: portalType === "office"
                                            ? "your.name@vivatherapies.com"
                                            : "your@email.com", value: email, onChange: (e) => setEmail(e.target.value), disabled: loading, className: "w-full" })] }), error && (_jsxs("div", { className: "flex gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm", children: [_jsx(AlertCircle, { className: "w-4 h-4 flex-shrink-0 mt-0.5" }), _jsx("span", { children: error })] })), _jsx(Button, { type: "submit", disabled: loading || !email, className: "w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700", children: loading ? "Sending verification email..." : "Continue" }), _jsx("p", { className: "text-xs text-slate-500 text-center", children: "We'll send you a verification code to access the portal" })] })) : (_jsxs("form", { onSubmit: handleVerifyCode, className: "space-y-4", children: [_jsxs("div", { className: "text-center mb-4", children: [_jsx(CheckCircle2, { className: "w-12 h-12 text-green-600 mx-auto mb-2" }), _jsx("h3", { className: "font-semibold text-slate-900", children: "Check your email" }), _jsxs("p", { className: "text-sm text-slate-600 mt-1", children: ["We've sent a verification code to ", _jsx("strong", { children: email })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 mb-2", children: "Verification Code" }), _jsx(Input, { type: "text", placeholder: "Enter 6-digit code", value: userEnteredCode, onChange: (e) => setUserEnteredCode(e.target.value.toUpperCase()), disabled: verifying, className: "w-full text-center text-lg tracking-widest", maxLength: 6 })] }), error && (_jsxs("div", { className: "flex gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm", children: [_jsx(AlertCircle, { className: "w-4 h-4 flex-shrink-0 mt-0.5" }), _jsx("span", { children: error })] })), _jsx(Button, { type: "submit", disabled: verifying || !userEnteredCode, className: "w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700", children: verifying ? "Verifying..." : "Verify and Continue" }), _jsx(Button, { type: "button", variant: "outline", className: "w-full", onClick: () => {
                                    setSubmitted(false);
                                    setUserEnteredCode("");
                                    setGeneratedCode("");
                                    setError("");
                                }, children: "Use different email" }), _jsx("p", { className: "text-xs text-slate-500 text-center", children: "Didn't receive the code? Check your spam folder or try again." })] })) })] }) }));
}
