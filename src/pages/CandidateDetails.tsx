import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Textarea } from "@/components/ui/textarea";
import { APP_LOGO, getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { useLocation, useRoute } from "wouter";
import { useEffect, useState } from "react";
import { ArrowLeft, Mail, Archive, Save } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  const [match, params] = useRoute<{ id: string }>("/candidate/:id");
  const candidateId = (match && params) ? params.id : "";

  const { data: candidate, isLoading, refetch } = trpc.candidates.getById.useQuery(
    { id: candidateId },
    { enabled: !!candidateId }
  );

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

  const [localNotes, setLocalNotes] = useState<Record<string, string>>({});
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);

  useEffect(() => {
    if (candidate) {
      const initialNotes: Record<string, string> = {};
      STAGES.forEach(stage => {
        initialNotes[stage.notesField as string] = (candidate as any)[stage.notesField as string] || "";
      });
      setLocalNotes(initialNotes);
    }
  }, [candidate]);

  const handleStageChange = (newStage: string) => {
    updateMutation.mutate({
      id: candidateId,
      stage: newStage as any,
    });
  };

  const handleStatusChange = (newStatus: string) => {
    updateMutation.mutate({
      id: candidateId,
      status: newStatus as any,
    });
  };

  const handleSaveNotes = (notesField: string) => {
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
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold mb-4">Access Required</h2>
          <p className="text-muted-foreground mb-6">Please sign in to view candidate details</p>
          <Button onClick={() => window.location.href = getLoginUrl()} className="w-full">
            Sign In
          </Button>
        </Card>
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold mb-4">Candidate Not Found</h2>
          <Button onClick={() => navigate("/office")}>Back to Dashboard</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={() => navigate("/office")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              {APP_LOGO && <img src={APP_LOGO} alt="Logo" className="h-10 w-10 rounded-full" />}
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{candidate.fullName}</h1>
                <p className="text-sm text-gray-600">{candidate.profession}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEmailDialogOpen(true)}
                className="flex items-center gap-1"
              >
                <Mail className="h-4 w-4" />
                Email
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleArchive}
                className="flex items-center gap-1"
              >
                <Archive className="h-4 w-4" />
                Archive
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Card className="mb-8 p-6">
          <CardHeader>
            <CardTitle className="text-xl">Candidate Information</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6">
            <div>
              <Label>Email</Label>
              <p className="text-lg font-medium">{candidate.email}</p>
            </div>
            <div>
              <Label>Phone</Label>
              <p className="text-lg font-medium">{candidate.phone || "N/A"}</p>
            </div>
            <div>
              <Label>Applied On</Label>
              <p className="text-lg font-medium">{candidate.appliedAt ? new Date(candidate.appliedAt).toLocaleDateString() : "N/A"}</p>
            </div>
            <div>
              <Label>Current Stage</Label>
              <Select onValueChange={handleStageChange} value={candidate.stage || ""}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Stage" />
                </SelectTrigger>
                <SelectContent>
                  {STAGES.map((stage) => (
                    <SelectItem key={stage.id} value={stage.id}>
                      {stage.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Current Status</Label>
              <Select onValueChange={handleStatusChange} value={candidate.status || ""}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Resume</Label>
              {candidate.cvUrl ? (
                <a href={candidate.cvUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  View Resume
                </a>
              ) : (
                <p>N/A</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="applicationNotes" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            {STAGES.map((stage) => (
              <TabsTrigger key={stage.id} value={stage.notesField as string}>
                {stage.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {STAGES.map((stage) => (
            <TabsContent key={stage.id} value={stage.notesField as string}>
              <Card>
                <CardHeader>
                  <CardTitle>{stage.name} Notes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder={`Add notes for ${stage.name}...`}
                    value={localNotes[stage.notesField as string]}
                    onChange={(e) =>
                      setLocalNotes((prev) => ({ ...prev, [stage.notesField as string]: e.target.value }))
                    }
                    rows={5}
                  />
                  <Button onClick={() => handleSaveNotes(stage.notesField as string)} className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Save Notes
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </main>

      {candidate && (
        <EmailCenter
          candidateId={candidate.id}
          candidateName={candidate.fullName || undefined}
          candidateEmail={candidate.email || undefined}
          onClose={() => setEmailDialogOpen(false)}
          isOpen={emailDialogOpen}
        />
      )}
    </div>
  );
}

