import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "wouter";
import { CheckCircle, FileText, Shield, Users, Briefcase, Award } from "lucide-react";

interface ChecklistItem {
  id: string;
  category: string;
  title: string;
  description: string;
  completed: boolean;
  icon: React.ReactNode;
}

const INDUCTION_CHECKLIST: ChecklistItem[] = [
  // Personal Information
  {
    id: "personal_info",
    category: "Personal Information",
    title: "Complete Personal Details",
    description: "Verify and complete all personal information in the system",
    completed: false,
    icon: <FileText className="w-5 h-5" />,
  },
  {
    id: "contact_details",
    category: "Personal Information",
    title: "Verify Contact Details",
    description: "Confirm phone number, email, and address are correct",
    completed: false,
    icon: <FileText className="w-5 h-5" />,
  },
  {
    id: "emergency_contact",
    category: "Personal Information",
    title: "Add Emergency Contact",
    description: "Provide emergency contact information for safety",
    completed: false,
    icon: <FileText className="w-5 h-5" />,
  },

  // Professional Qualifications
  {
    id: "qualifications",
    category: "Professional Qualifications",
    title: "Upload Qualifications",
    description: "Submit all relevant professional certificates and diplomas",
    completed: false,
    icon: <Award className="w-5 h-5" />,
  },
  {
    id: "insurance",
    category: "Professional Qualifications",
    title: "Verify Insurance",
    description: "Confirm Professional Indemnity and Public Liability Insurance is valid",
    completed: false,
    icon: <Shield className="w-5 h-5" />,
  },
  {
    id: "dbs_check",
    category: "Professional Qualifications",
    title: "Complete DBS Check",
    description: "Undergo Disclosure and Barring Service check",
    completed: false,
    icon: <Shield className="w-5 h-5" />,
  },

  // Legal Requirements
  {
    id: "right_to_work",
    category: "Legal Requirements",
    title: "Verify Right to Work",
    description: "Provide proof of right to work in the UK",
    completed: false,
    icon: <Briefcase className="w-5 h-5" />,
  },
  {
    id: "contract_signed",
    category: "Legal Requirements",
    title: "Sign Employment Contract",
    description: "Review and sign your employment contract",
    completed: false,
    icon: <Briefcase className="w-5 h-5" />,
  },
  {
    id: "gdpr_consent",
    category: "Legal Requirements",
    title: "GDPR Consent",
    description: "Provide consent for data processing and privacy policy",
    completed: false,
    icon: <Shield className="w-5 h-5" />,
  },

  // Professional References
  {
    id: "reference_1",
    category: "Professional References",
    title: "First Professional Reference",
    description: "Provide details of first professional reference",
    completed: false,
    icon: <Users className="w-5 h-5" />,
  },
  {
    id: "reference_2",
    category: "Professional References",
    title: "Second Professional Reference",
    description: "Provide details of second professional reference",
    completed: false,
    icon: <Users className="w-5 h-5" />,
  },
  {
    id: "references_verified",
    category: "Professional References",
    title: "References Verified",
    description: "Our team will contact your references to verify",
    completed: false,
    icon: <Users className="w-5 h-5" />,
  },

  // Equipment & Setup
  {
    id: "equipment_list",
    category: "Equipment & Setup",
    title: "Submit Equipment List",
    description: "Provide detailed list of professional equipment and tools",
    completed: false,
    icon: <Briefcase className="w-5 h-5" />,
  },
  {
    id: "equipment_verified",
    category: "Equipment & Setup",
    title: "Equipment Verified",
    description: "Our team will verify your equipment meets our standards",
    completed: false,
    icon: <Briefcase className="w-5 h-5" />,
  },
  {
    id: "brands_specified",
    category: "Equipment & Setup",
    title: "Brands & Products Specified",
    description: "Specify brands and products you work with for quality assurance",
    completed: false,
    icon: <Briefcase className="w-5 h-5" />,
  },

  // Company Integration
  {
    id: "system_training",
    category: "Company Integration",
    title: "Complete System Training",
    description: "Learn how to use our booking and management systems",
    completed: false,
    icon: <Award className="w-5 h-5" />,
  },
  {
    id: "profile_setup",
    category: "Company Integration",
    title: "Complete Profile Setup",
    description: "Set up your professional profile with photos and bio",
    completed: false,
    icon: <Award className="w-5 h-5" />,
  },
  {
    id: "team_introduction",
    category: "Company Integration",
    title: "Team Introduction",
    description: "Meet the team and get to know your colleagues",
    completed: false,
    icon: <Users className="w-5 h-5" />,
  },
  {
    id: "policies_acknowledged",
    category: "Company Integration",
    title: "Acknowledge Policies",
    description: "Review and acknowledge company policies and procedures",
    completed: false,
    icon: <Award className="w-5 h-5" />,
  },
];

export default function InductionChecklist() {
  const [checklist, setChecklist] = useState<ChecklistItem[]>(INDUCTION_CHECKLIST);

  const toggleItem = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const categories = Array.from(new Set(checklist.map((item) => item.category)));
  const completedCount = checklist.filter((item) => item.completed).length;
  const totalCount = checklist.length;
  const progressPercentage = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="container mx-auto py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-green-600 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Viva Therapies</h1>
              <p className="text-sm text-gray-600">Induction Checklist</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link href="/">
              <Button variant="outline">Home</Button>
            </Link>
            <Link href="/track">
              <Button variant="outline">Track Application</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-12">
        {/* Welcome Section */}
        <Card className="p-8 mb-8 bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200">
          <div className="flex items-center gap-4 mb-4">
            <CheckCircle className="w-12 h-12 text-emerald-600" />
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Welcome to Viva Therapies!</h2>
              <p className="text-gray-600">Your induction checklist to get started</p>
            </div>
          </div>
          <p className="text-gray-700 mb-4">
            Congratulations on joining our team! This checklist will guide you through the onboarding process. 
            Complete each item to ensure you're fully set up and ready to start delivering exceptional service.
          </p>
        </Card>

        {/* Progress Bar */}
        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Overall Progress</h3>
            <span className="text-2xl font-bold text-emerald-600">
              {completedCount}/{totalCount}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-500 to-green-500 h-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {progressPercentage}% complete - Great progress!
          </p>
        </Card>

        {/* Checklist by Category */}
        <div className="space-y-6">
          {categories.map((category) => {
            const categoryItems = checklist.filter((item) => item.category === category);
            const categoryCompleted = categoryItems.filter((item) => item.completed).length;

            return (
              <Card key={category} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{category}</h3>
                  <span className="text-sm text-gray-600">
                    {categoryCompleted}/{categoryItems.length} completed
                  </span>
                </div>

                <div className="space-y-3">
                  {categoryItems.map((item) => (
                    <div
                      key={item.id}
                      className={`flex items-start gap-4 p-4 rounded-lg border-2 transition-all ${
                        item.completed
                          ? "bg-emerald-50 border-emerald-200"
                          : "bg-gray-50 border-gray-200 hover:border-emerald-300"
                      }`}
                    >
                      <Checkbox
                        id={item.id}
                        checked={item.completed}
                        onCheckedChange={() => toggleItem(item.id)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <label
                          htmlFor={item.id}
                          className={`font-semibold cursor-pointer block ${
                            item.completed ? "text-emerald-700 line-through" : "text-gray-900"
                          }`}
                        >
                          {item.title}
                        </label>
                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                      </div>
                      <div
                        className={`flex-shrink-0 ${
                          item.completed ? "text-emerald-600" : "text-gray-400"
                        }`}
                      >
                        {item.icon}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Next Steps */}
        <Card className="p-8 mt-8 bg-blue-50 border-blue-200">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Award className="w-6 h-6 text-blue-600" />
            What's Next?
          </h3>
          <div className="space-y-3 text-gray-700">
            <p>
              ✓ <strong>Complete all checklist items</strong> - Work through each category systematically
            </p>
            <p>
              ✓ <strong>Contact your onboarding manager</strong> - Reach out if you have any questions
            </p>
            <p>
              ✓ <strong>Schedule your first booking</strong> - Once setup is complete, you can start accepting clients
            </p>
            <p>
              ✓ <strong>Attend team meetings</strong> - Join our regular team calls and training sessions
            </p>
          </div>
          <div className="mt-6 flex gap-3">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Contact Onboarding Manager
            </Button>
            <Button variant="outline">
              Download Onboarding Guide
            </Button>
          </div>
        </Card>

        {/* Support Section */}
        <Card className="p-6 mt-8 text-center">
          <h4 className="font-bold text-lg mb-2">Need Help?</h4>
          <p className="text-gray-700 mb-4">
            Our onboarding team is here to support you throughout the induction process.
          </p>
          <Button variant="outline">
            Schedule a Call with Onboarding Team
          </Button>
        </Card>
      </main>
    </div>
  );
}

