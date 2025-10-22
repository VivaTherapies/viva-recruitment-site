import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Mail, Settings as SettingsIcon, Bell } from "lucide-react";
import EmailTemplates from "../components/EmailTemplates";
import EmailFlowSettings from "../components/EmailFlowSettings";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("templates");

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
          <Button variant="outline">Back to Dashboard</Button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Settings</h1>
          <p className="text-slate-600">Manage email templates, communication flows, and system configuration</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="templates" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">Email Templates</span>
            </TabsTrigger>
            <TabsTrigger value="flow" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">Email Flow</span>
            </TabsTrigger>
            <TabsTrigger value="general" className="flex items-center gap-2">
              <SettingsIcon className="w-4 h-4" />
              <span className="hidden sm:inline">General</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="templates">
            <EmailTemplates />
          </TabsContent>

          <TabsContent value="flow">
            <EmailFlowSettings />
          </TabsContent>

          <TabsContent value="general">
            <div className="space-y-6">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>EmailJS Configuration</CardTitle>
                  <CardDescription>
                    Configure your EmailJS account for email sending
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      EmailJS Public Key
                    </label>
                    <input
                      type="password"
                      placeholder="your_emailjs_public_key"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      Find this in your EmailJS dashboard under Account Settings
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      EmailJS Service ID
                    </label>
                    <input
                      type="password"
                      placeholder="service_xxxxxxxxx"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      Create a service in EmailJS and copy the Service ID
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Default From Email
                    </label>
                    <input
                      type="email"
                      placeholder="noreply@vivatherapies.com"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                    />
                  </div>

                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
                    Save EmailJS Settings
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>System Settings</CardTitle>
                  <CardDescription>
                    General system configuration
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      placeholder="Viva Therapies"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                      defaultValue="Viva Therapies"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Support Email
                    </label>
                    <input
                      type="email"
                      placeholder="support@vivatherapies.com"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Recruitment Team Email
                    </label>
                    <input
                      type="email"
                      placeholder="recruitment@vivatherapies.com"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                    />
                  </div>

                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
                    Save System Settings
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-900">Need Help?</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-blue-800">
                  <p className="mb-2">
                    For help setting up EmailJS, visit:{" "}
                    <a href="https://www.emailjs.com" target="_blank" rel="noopener noreferrer" className="underline font-semibold">
                      emailjs.com
                    </a>
                  </p>
                  <p>
                    Contact our support team at support@vivatherapies.com for assistance with configuration.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

