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

const STATUS_COLORS: Record<string, string> = {
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
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showArchived, setShowArchived] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<{ id: string; name: string; email: string } | null>(null);

  const { data: candidates = [], refetch } = trpc.candidates.list.useQuery<any, any>({ includeArchived: showArchived });

  const createMutation = trpc.candidates.create.useMutation({
    onSuccess: () => {
      toast.success("Candidate added successfully");
      setIsAddDialogOpen(false);
      refetch();
    },
    onError: (error: any) => {
      toast.error("Failed to add candidate: " + error.message);
    }
  });

  const filteredCandidates = useMemo(() => {
    return candidates.filter((candidate: any) => {
      const matchesSearch =
        candidate.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.profession.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === "all" || candidate.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [candidates, searchQuery, statusFilter]);

  const candidatesByStage = useMemo(() => {
    const grouped: Record<string, typeof candidates> = {};
    STAGES.forEach(stage => {
      grouped[stage.id] = filteredCandidates.filter((c: any) => c.stage === stage.id);
    });
    return grouped;
  }, [filteredCandidates]);

  const handleAddCandidate = (data: any) => {
    createMutation.mutate(data);
  };

  if (loading) {
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
          <h2 className="text-2xl font-bold mb-4">Office Portal Access</h2>
          <p className="text-muted-foreground mb-6">Please sign in to access the recruitment dashboard</p>
          <Button onClick={() => window.location.href = getLoginUrl()} className="w-full">
            Sign In
          </Button>
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
              {APP_LOGO && <img src={APP_LOGO} alt="Logo" className="h-10 w-10 rounded-full" />}
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Viva Therapies</h1>
                <p className="text-sm text-gray-600">Recruitment Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Welcome, {user?.name || "User"}</span>
              <Button variant="outline" size="sm" onClick={() => navigate("/")}>
                Home
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Controls */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by name, email, or profession..."
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border rounded-md w-full"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Select onValueChange={setStatusFilter} value={statusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {Object.keys(STATUS_COLORS).map(status => (
                    <SelectItem key={status} value={status}>
                      {status.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                onClick={() => setShowArchived(!showArchived)}
                className={`flex items-center gap-2 ${showArchived ? "bg-gray-200" : ""}`}
              >
                <Archive className="h-4 w-4" />
                {showArchived ? "Hide Archived" : "Show Archived"}
              </Button>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Candidate
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add New Candidate</DialogTitle>
                  </DialogHeader>
                  <ApplicationFormComponent onSubmit={handleAddCandidate} isLoading={createMutation.isPending} />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {STAGES.map(stage => (
            <Card key={stage.id} className="bg-white rounded-lg shadow-md p-4">
              <h3 className={`text-lg font-semibold mb-4 ${stage.color} p-2 rounded-md text-white`}>
                {stage.name} ({candidatesByStage[stage.id]?.length || 0})
              </h3>
              <div className="space-y-3">
                {candidatesByStage[stage.id]?.map((candidate: any) => (
                  <Card
                    key={candidate.id}
                    className="bg-gray-50 p-3 rounded-md shadow-sm cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => navigate(`/candidate/${candidate.id}`)}
                  >
                    <p className="font-medium text-gray-800">{candidate.fullName}</p>
                    <p className="text-sm text-gray-600">{candidate.profession}</p>
                    <Badge className={`mt-1 ${STATUS_COLORS[candidate.status]}`}>
                      {candidate.status.replace(/_/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase())}
                    </Badge>
                    <div className="flex justify-end mt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e: React.MouseEvent) => {
                          e.stopPropagation();
                          setSelectedCandidate(candidate);
                          setEmailDialogOpen(true);
                        }}
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </main>

      {selectedCandidate && (
        <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Email Candidate: {selectedCandidate.name}</DialogTitle>
            </DialogHeader>
            <EmailCenter
              isOpen={emailDialogOpen}
              candidateId={selectedCandidate?.id}
              candidateName={selectedCandidate?.name}
              candidateEmail={selectedCandidate?.email}
              onClose={() => setEmailDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
