import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "./pages/NotFound";
import { Route, Switch, Router } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import OfficeDashboard from "./pages/OfficeDashboard";
import CandidateDetails from "./pages/CandidateDetails";
import AvailablePositions from "./pages/AvailablePositions";
import ApplyForm from "./pages/ApplyForm";
import CandidatePortal from "./pages/CandidatePortal";
import InductionChecklist from "./pages/InductionChecklist";
import EmailVerification from "./pages/EmailVerification";
import Settings from "./pages/Settings";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "./lib/trpc";
import { httpBatchLink } from "@trpc/client";
import React from "react";



function App() {
  const [queryClient] = React.useState(() => new QueryClient());
  const [trpcClient] = React.useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "/api/trpc",
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
          <ThemeProvider>
            <TooltipProvider>
              <Toaster />
              <Router base="/viva-recruitment-site/">
                <Switch>
                  <Route path="/" component={Home} />
                  <Route path="/office" component={OfficeDashboard} />
                  <Route path="/candidate/:id" component={CandidateDetails} />
                  <Route path="/positions" component={AvailablePositions} />
                  <Route path="/apply" component={ApplyForm} />
                  <Route path="/track" component={CandidatePortal} />
                  <Route path="/verify-email-office" component={EmailVerification} />
                  <Route path="/verify-email-candidate" component={EmailVerification} />
                  <Route path="/induction" component={InductionChecklist} />
                  <Route path="/settings" component={Settings} />
                  <Route path="/404" component={NotFound} />
                  <Route component={NotFound} />
                </Switch>
              </Router>
            </TooltipProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;

