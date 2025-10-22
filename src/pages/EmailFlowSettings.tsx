import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Send, Clock } from "lucide-react";

const PIPELINE_STAGES = [
  { id: "application_review", name: "Application Review", position: 1 },
  { id: "phone_interview", name: "Phone Interview", position: 2 },
  { id: "skills_assessment", name: "Skills Assessment", position: 3 },
  { id: "final_interview", name: "Final Interview", position: 4 },
  { id: "induction", name: "Induction", position: 5 },
];

interface EmailFlowConfig {
  stageId: string;
  enabled: boolean;
  templateId: string;
  sendAutomatically: boolean;
  delayDays: number;
  sendToCandidate: boolean;
  sendToTeam: boolean;
  teamEmail: string;
}

export function EmailFlowSettings() {
  const [flows, setFlows] = useState<EmailFlowConfig[]>(
    PIPELINE_STAGES.map((stage) => ({
      stageId: stage.id,
      enabled: true,
      templateId: stage.id,
      sendAutomatically: true,
      delayDays: 0,
      sendToCandidate: true,
      sendToTeam: stage.id === "application_review",
      teamEmail: "recruitment@vivatherapies.com",
    }))
  );

  const handleFlowUpdate = (stageId: string, updates: Partial<EmailFlowConfig>) => {
    setFlows(
      flows.map((flow) =>
        flow.stageId === stageId ? { ...flow, ...updates } : flow
      )
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Email Flow Configuration</h2>
        <p className="text-slate-600">
          Set up automated emails for each stage of the recruitment pipeline
        </p>
      </div>

      <div className="grid gap-4">
        {PIPELINE_STAGES.map((stage) => {
          const flow = flows.find((f) => f.stageId === stage.id);
          if (!flow) return null;

          return (
            <Card key={stage.id} className="border-0 shadow-md">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{stage.name}</CardTitle>
                    <CardDescription>
                      Manage email communications when candidates reach this stage
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-600">Enable</span>
                    <Switch
                      checked={flow.enabled}
                      onCheckedChange={(checked) =>
                        handleFlowUpdate(stage.id, { enabled: checked })
                      }
                    />
                  </div>
                </div>
              </CardHeader>

              {flow.enabled && (
                <CardContent className="space-y-6">
                  {/* Candidate Email Section */}
                  <div className="border-t pt-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Mail className="w-5 h-5 text-purple-600" />
                      <h3 className="font-semibold text-slate-900">Candidate Email</h3>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id={`candidate-${stage.id}`}
                          checked={flow.sendToCandidate}
                          onChange={(e) =>
                            handleFlowUpdate(stage.id, { sendToCandidate: e.target.checked })
                          }
                          className="w-4 h-4"
                        />
                        <label htmlFor={`candidate-${stage.id}`} className="text-sm text-slate-700">
                          Send email to candidate
                        </label>
                      </div>

                      {flow.sendToCandidate && (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              Email Template
                            </label>
                            <Select value={flow.templateId} onValueChange={(value) =>
                              handleFlowUpdate(stage.id, { templateId: value })
                            }>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value={stage.id}>Default {stage.name} Template</SelectItem>
                                <SelectItem value="custom">Custom Template</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              id={`auto-${stage.id}`}
                              checked={flow.sendAutomatically}
                              onChange={(e) =>
                                handleFlowUpdate(stage.id, { sendAutomatically: e.target.checked })
                              }
                              className="w-4 h-4"
                            />
                            <label htmlFor={`auto-${stage.id}`} className="text-sm text-slate-700">
                              Send automatically when candidate enters this stage
                            </label>
                          </div>

                          {flow.sendAutomatically && (
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2">
                                <Clock className="w-4 h-4 inline mr-2" />
                                Send after (days)
                              </label>
                              <input
                                type="number"
                                min="0"
                                max="30"
                                value={flow.delayDays}
                                onChange={(e) =>
                                  handleFlowUpdate(stage.id, { delayDays: parseInt(e.target.value) })
                                }
                                className="w-20 px-3 py-2 border border-slate-300 rounded-lg text-sm"
                              />
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  {/* Team Email Section */}
                  <div className="border-t pt-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Send className="w-5 h-5 text-pink-600" />
                      <h3 className="font-semibold text-slate-900">Team Notification</h3>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id={`team-${stage.id}`}
                          checked={flow.sendToTeam}
                          onChange={(e) =>
                            handleFlowUpdate(stage.id, { sendToTeam: e.target.checked })
                          }
                          className="w-4 h-4"
                        />
                        <label htmlFor={`team-${stage.id}`} className="text-sm text-slate-700">
                          Send notification to recruitment team
                        </label>
                      </div>

                      {flow.sendToTeam && (
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Team Email Address
                          </label>
                          <input
                            type="email"
                            value={flow.teamEmail}
                            onChange={(e) =>
                              handleFlowUpdate(stage.id, { teamEmail: e.target.value })
                            }
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <h4 className="font-semibold text-amber-900 mb-2">Email Flow Tips</h4>
        <ul className="text-sm text-amber-800 space-y-1">
          <li>• Automatic emails are sent when a candidate's stage changes</li>
          <li>• Use delays to give candidates time to complete tasks before sending reminders</li>
          <li>• Team notifications help keep your recruitment team informed of progress</li>
          <li>• All emails use the templates you've configured in the Email Templates section</li>
        </ul>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Reset to Defaults</Button>
        <Button className="bg-gradient-to-r from-purple-600 to-pink-600">Save Configuration</Button>
      </div>
    </div>
  );
}

