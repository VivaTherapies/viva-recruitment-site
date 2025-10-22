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

  const handleSubmit = (data: any) => {
    console.log('[DEBUG] ApplyForm handleSubmit called with data:', data);
    console.log('[DEBUG] Calling tRPC mutation: candidates.create');
    createCandidate.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="container mx-auto py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Viva Therapies</h1>
              <p className="text-sm text-gray-600">Application Form</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link href="/">
              <Button variant="outline">Home</Button>
            </Link>
            <Link href="/positions">
              <Button>View Positions</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-12">
        <Card className="p-8 max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Join Our Team</h2>
            <p className="text-gray-600">
              Fill out the application form below to start your journey with Viva Therapies
            </p>
          </div>

          <ApplicationFormComponent
            onSubmit={handleSubmit}
            isLoading={createCandidate.isPending}
            submitButtonText="Submit Application"
            onCancel={() => navigate("/")}
          />
        </Card>
      </main>
    </div>
  );
}

