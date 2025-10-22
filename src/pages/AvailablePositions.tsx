import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { PROFESSION_DATA, PROFESSIONS } from "../shared/professionData";
import { Briefcase, CheckCircle, Package, Star, TrendingUp } from "lucide-react";

export default function AvailablePositions() {
  const [selectedProfession, setSelectedProfession] = useState<string>(PROFESSIONS[0]);
  const professionInfo = PROFESSION_DATA[selectedProfession];

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
              <p className="text-sm text-gray-600">London's Premier Mobile Spa Service</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link href="/">
              <Button variant="outline">Home</Button>
            </Link>
            <Link href="/apply">
              <Button>Apply Now</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Join Our Team of Wellness Professionals</h2>
          <p className="text-xl text-blue-100 mb-6">
            Explore exciting opportunities across {PROFESSIONS.length} specialized professions
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
              <div className="text-2xl font-bold">£50-£100</div>
              <div className="text-sm text-blue-100">Commission per service</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
              <div className="text-2xl font-bold">Flexible</div>
              <div className="text-sm text-blue-100">Working hours</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
              <div className="text-2xl font-bold">Mobile</div>
              <div className="text-sm text-blue-100">Work from anywhere</div>
            </div>
          </div>
        </div>
      </section>

      {/* Profession Selector */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto">
          <h3 className="text-2xl font-bold text-center mb-6">Select a Profession</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {PROFESSIONS.map((profession) => (
              <button
                key={profession}
                onClick={() => setSelectedProfession(profession)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedProfession === profession
                    ? "border-blue-600 bg-blue-50 shadow-md"
                    : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                }`}
              >
                <div className="font-semibold text-sm text-center">{profession}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Profession Details */}
      <section className="py-12">
        <div className="container mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{professionInfo.name}</h2>
            <p className="text-gray-600">Complete role details and requirements</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Requirements */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <h3 className="text-xl font-bold">Requirements</h3>
              </div>
              <ul className="space-y-2">
                {professionInfo.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span className="text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Equipment */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-bold">Required Equipment</h3>
              </div>
              <ul className="space-y-2">
                {professionInfo.equipment.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              {["Facialist", "Makeup Artist", "Hair Stylist"].includes(professionInfo.name) && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> Please specify the brands you work with in your application
                    to ensure five-star service delivery.
                  </p>
                </div>
              )}
            </Card>

            {/* Specializations */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-6 h-6 text-purple-600" />
                <h3 className="text-xl font-bold">Specialization Areas</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {professionInfo.specializations.map((spec, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </Card>

            {/* Commission Rates */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-6 h-6 text-green-600" />
                <h3 className="text-xl font-bold">Team Commission Rates</h3>
              </div>
              <div className="space-y-4">
                {professionInfo.commissionRates.map((service, idx) => (
                  <div key={idx}>
                    <h4 className="font-semibold text-gray-900 mb-2">{service.service}</h4>
                    <div className="space-y-1">
                      {service.rates.map((rate, rIdx) => (
                        <div key={rIdx} className="flex justify-between items-center py-2 border-b last:border-0">
                          <span className="text-gray-600">{rate.timeSlot}</span>
                          <span className="font-bold text-green-600">{rate.commission}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <Card className="p-8 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
              <h3 className="text-2xl font-bold mb-4">Ready to Join Our Team?</h3>
              <p className="text-gray-600 mb-6">
                Apply now for the {professionInfo.name} position and start your journey with Viva Therapies
              </p>
              <Link href="/apply">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600">
                  Apply for {professionInfo.name}
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

