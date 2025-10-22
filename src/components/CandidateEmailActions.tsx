import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";

interface CandidateEmailActionsProps {
  candidateId: string;
}

export function CandidateEmailActions({
  candidateId,
}: CandidateEmailActionsProps) {
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
    } catch (error) {
      console.error("Error sending rejection email:", error);
      alert("Failed to send rejection email. Please try again.");
    } finally {
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
    } catch (error) {
      console.error("Error sending confirmation email:", error);
      alert("Failed to send confirmation email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleSendConfirmation()}
        disabled={isLoading}
      >
        Send Confirmation
      </Button>

      <Button
        variant="destructive"
        size="sm"
        onClick={() => setShowRejectionDialog(true)}
        disabled={isLoading}
      >
        Send Rejection
      </Button>

      <AlertDialog open={showRejectionDialog} onOpenChange={setShowRejectionDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Send Rejection Email</AlertDialogTitle>
            <AlertDialogDescription>
              Send a rejection email to the candidate.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Rejection Reason (Optional)</label>
              <Textarea
                placeholder="Enter the reason for rejection..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="mt-2"
                rows={3}
              />
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleSendRejection}
              disabled={isLoading}
              className="bg-red-600 hover:bg-red-700"
            >
              {isLoading ? "Sending..." : "Send Rejection"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

