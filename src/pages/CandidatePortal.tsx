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
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
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
    } else {
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
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
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

  const getStageIndex = (stage: string) => {
    return STAGES.findIndex((s) => s.id === stage);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "in_progress":
        return <Clock className="w-5 h-5 text-blue-600" />;
      case "pending":
        return <Clock className="w-5 h-5 text-gray-400" />;
      case "rejected":
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="container mx-auto py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Search className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Viva Therapies</h1>
              <p className="text-sm text-gray-600">Application Tracking Portal</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link href="/">
              <Button variant="outline">Home</Button>
            </Link>
            <Link href="/positions">
              <Button>Apply Now</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-12">
        {!selectedCandidate ? (
          <>
            {/* Search Section */}
            <div className="max-w-2xl mx-auto mb-12">
              <Card className="p-8">
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Track Your Application</h2>
                  <p className="text-gray-600">
                    Enter your email address to see where you are in our recruitment pipeline
                  </p>
                </div>

                <form onSubmit={performSearch} className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <div className="flex gap-2 mt-2">
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={searchEmail}
                        onChange={(e) => setSearchEmail(e.target.value)}
                        className="flex-1"
                      />
                      <Button type="submit" disabled={isCandidatesLoading || !searchEmail.trim()}>
                        {isCandidatesLoading ? "Searching..." : "Search"}
                      </Button>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      💡 <strong>Tip:</strong> Use the same email address you used when applying to find your application status.
                    </p>
                  </div>
                </form>

              </Card>
            </div>

            {/* Info Section */}
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  What to Expect
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>✓ Application Review (1-2 weeks)</li>
                  <li>✓ Phone Interview (if shortlisted)</li>
                  <li>✓ Skills Assessment</li>
                  <li>✓ Final Interview</li>
                  <li>✓ Induction & Onboarding</li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-blue-600" />
                  Stay Updated
                </h3>
                <p className="text-sm text-gray-700 mb-4">
                  We'll keep you informed at every stage of the process via email. Check your inbox and spam folder regularly.
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  Expected response time: 5-7 business days
                </p>
              </Card>
            </div>
          </>
        ) : (
          <>
            {/* Candidate Results */}
            <div className="mb-6">
              <Button onClick={() => setSelectedCandidate(null)} variant="outline">
                ← Back to Search
              </Button>
            </div>

            <Card className="p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">{selectedCandidate.fullName}</h2>
                  <p className="text-gray-600">{selectedCandidate.email}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Applied on</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {new Date(selectedCandidate.appliedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div>
                  <Label className="text-gray-600">Position Applied For</Label>
                  <p className="text-lg font-semibold text-gray-900">{selectedCandidate.profession}</p>
                </div>
                <div>
                  <Label className="text-gray-600">Current Status</Label>
                  <div className="flex items-center gap-2 mt-1">
                    {getStatusIcon(selectedCandidate.status)}
                    <span className="text-lg font-semibold text-gray-900 capitalize">
                      {selectedCandidate.status.replace(/_/g, " ")}
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Pipeline Progress */}
            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-8">Your Application Journey</h3>

              <div className="relative">
                {/* Progress Line */}
                <div className="absolute top-8 left-0 right-0 h-1 bg-gray-200">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all"
                    style={{
                      width: `${((getStageIndex(selectedCandidate.stage) + 1) / STAGES.length) * 100}%`,
                    }}
                  />
                </div>

                {/* Stages */}
                <div className="relative grid grid-cols-5 gap-4">
                  {STAGES.map((stage, idx) => {
                    const isCompleted = getStageIndex(selectedCandidate.stage) > idx;
                    const isCurrent = selectedCandidate.stage === stage.id;
                    const Icon = stage.icon;

                    return (
                      <div key={stage.id} className="flex flex-col items-center">
                        <div
                          className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 transition-all ${isCompleted
                            ? "bg-blue-600 text-white"
                            : isCurrent
                              ? "bg-purple-600 text-white scale-110 shadow-lg"
                              : "bg-gray-200 text-gray-500"
                            }`}
                        >
                          <Icon className="w-8 h-8" />
                        </div>
                        <p className={`text-center text-sm font-medium ${isCurrent ? "text-purple-700" : "text-gray-600"}`}>
                          {stage.name}
                        </p>

                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>
          </>
        )}
      </main>
    </div>
  );
}
