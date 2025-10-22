import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
export function CandidateEmailActions({ candidateId, }) {
    const [showRejectionDialog, setShowRejectionDialog] = useState(false);
    const [rejectionReason, setRejectionReason] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const sendRejectionMutation = trpc.notifications.sendRejection.useMutation();
    const sendApplicationConfirmationMutation = trpc.notifications.sendApplicationConfirmation.useMutation();
    const handleSendRejection = async () => {
        setIsLoading(true);
        try {
            await sendRejectionMutation.mutateAsync({
                candidateId,
                templateId: "rejection",
                reason: rejectionReason || undefined,
            });
            setShowRejectionDialog(false);
            setRejectionReason("");
            alert("Rejection email sent successfully!");
        }
        catch (error) {
            console.error("Error sending rejection email:", error);
            alert("Failed to send rejection email. Please try again.");
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleSendConfirmation = async () => {
        setIsLoading(true);
        try {
            await sendApplicationConfirmationMutation.mutateAsync({
                candidateId,
                templateId: "application_confirmation",
            });
            alert("Confirmation email sent successfully!");
        }
        catch (error) {
            console.error("Error sending confirmation email:", error);
            alert("Failed to send confirmation email. Please try again.");
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { variant: "outline", size: "sm", onClick: () => handleSendConfirmation(), disabled: isLoading, children: "Send Confirmation" }), _jsx(Button, { variant: "destructive", size: "sm", onClick: () => setShowRejectionDialog(true), disabled: isLoading, children: "Send Rejection" }), _jsx(AlertDialog, { open: showRejectionDialog, onOpenChange: setShowRejectionDialog, children: _jsxs(AlertDialogContent, { children: [_jsxs(AlertDialogHeader, { children: [_jsx(AlertDialogTitle, { children: "Send Rejection Email" }), _jsx(AlertDialogDescription, { children: "Send a rejection email to the candidate." })] }), _jsx("div", { className: "space-y-4", children: _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium", children: "Rejection Reason (Optional)" }), _jsx(Textarea, { placeholder: "Enter the reason for rejection...", value: rejectionReason, onChange: (e) => setRejectionReason(e.target.value), className: "mt-2", rows: 3 })] }) }), _jsxs(AlertDialogFooter, { children: [_jsx(AlertDialogCancel, { disabled: isLoading, children: "Cancel" }), _jsx(AlertDialogAction, { onClick: handleSendRejection, disabled: isLoading, className: "bg-red-600 hover:bg-red-700", children: isLoading ? "Sending..." : "Send Rejection" })] })] }) })] }));
}
