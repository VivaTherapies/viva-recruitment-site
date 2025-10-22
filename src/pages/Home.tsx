import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Crown, TrendingUp, Clock, Trophy, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">VT</span>
            </div>
            <span className="font-bold text-xl text-slate-900">Viva Therapies</span>
          </div>
          <div className="flex gap-4">
            <Link href="/verify-email-office">
              <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
                Office Portal
              </Button>
            </Link>
            <Link href="/verify-email-candidate">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                Candidate Portal
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            London's Premier Mobile Spa Service
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            Viva Therapies delivers luxury wellness treatments to prestigious hotels and private residences since 2010. Join our elite team of therapists and enjoy unparalleled benefits.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/positions">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                View Available Positions
              </Button>
            </Link>
            <Link href="/apply">
              <Button size="lg" variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
                Join Our Team
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Company Description */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">About Viva Therapies</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Viva Therapies is London's premier mobile spa service, delivering luxury wellness treatments to prestigious hotels and private residences since 2010. We work with VIP guests and discerning private clients in London's most exclusive locations.
            </p>
          </div>
        </div>
      </section>

      {/* Five Key Benefits */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-center text-slate-900 mb-12">
          Five Key Benefits of Joining Viva Therapies
        </h2>
        <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
          Join London's premier mobile spa service and enjoy unparalleled benefits
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {/* Benefit 1 */}
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <Crown className="w-8 h-8 text-purple-600 mb-2" />
              <CardTitle className="text-lg">Elite Clientele</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 text-sm">
                Work with VIP guests and discerning private clients in London's most prestigious 5★ hotels and residences.
              </p>
            </CardContent>
          </Card>

          {/* Benefit 2 */}
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <TrendingUp className="w-8 h-8 text-pink-600 mb-2" />
              <CardTitle className="text-lg">High Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 text-sm">
                Competitive pay with generous tips and full transparency on payments.
              </p>
            </CardContent>
          </Card>

          {/* Benefit 3 */}
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <Clock className="w-8 h-8 text-purple-600 mb-2" />
              <CardTitle className="text-lg">Flexibility & Control</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 text-sm">
                Choose your own working hours, preferred locations, and manage your schedule directly through the Viva Therapist App.
              </p>
            </CardContent>
          </Card>

          {/* Benefit 4 */}
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <Trophy className="w-8 h-8 text-pink-600 mb-2" />
              <CardTitle className="text-lg">Trusted Luxury Brand</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 text-sm">
                Be part of a well-established company since 2010, recognised by top concierges (Golden Keys) and luxury hospitality partners.
              </p>
            </CardContent>
          </Card>

          {/* Benefit 5 */}
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <Users className="w-8 h-8 text-purple-600 mb-2" />
              <CardTitle className="text-lg">Ongoing Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 text-sm">
                Dedicated office team available seven days a week (9am–11pm) plus innovative digital tools to simplify bookings, availability, and payments.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Portal Access Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Office Portal Card */}
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="text-2xl">Office Portal</CardTitle>
                <CardDescription>
                  Comprehensive recruitment management for your team
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-600">
                  Track candidates, schedule interviews, and collaborate effectively with your recruitment team.
                </p>
                <Link href="/verify-email-office">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    Access Office Portal
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Candidate Portal Card */}
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="text-2xl">Candidate Portal</CardTitle>
                <CardDescription>
                  Track your application and stay connected
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-600">
                  Track your application status, update your profile, and stay connected with our recruitment team.
                </p>
                <Link href="/verify-email-candidate">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    Access Candidate Portal
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Available Positions CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Available Positions</h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Explore our current openings with detailed requirements, equipment needs, and commission structures.
          </p>
          <Link href="/positions">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
              View Positions
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">VT</span>
                </div>
                <span className="font-bold text-white">Viva Therapies</span>
              </div>
              <p className="text-sm">London's premier mobile spa and wellness service since 2010</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/positions" className="hover:text-white transition-colors">Open Positions</Link></li>
                <li><Link href="/apply" className="hover:text-white transition-colors">Apply Now</Link></li>
                <li><Link href="/verify-candidate" className="hover:text-white transition-colors">Track Application</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li>Email: careers@vivatherapies.com</li>
                <li>Phone: +44 (0) 20 XXXX XXXX</li>
                <li>London, UK</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Follow Us</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="https://facebook.com/vivatherapies" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Facebook</a></li>
                <li><a href="https://instagram.com/vivatherapies" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="https://twitter.com/viva_therapies" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-sm">
            <p>&copy; 2025 Viva Therapies. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

