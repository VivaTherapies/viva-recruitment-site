import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "./pages/NotFound";
import { Route, Switch } from "wouter";
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
function Router() {
    return (_jsxs(Switch, { children: [_jsx(Route, { path: "/", component: Home }), _jsx(Route, { path: "/office", component: OfficeDashboard }), _jsx(Route, { path: "/candidate/:id", component: CandidateDetails }), _jsx(Route, { path: "/positions", component: AvailablePositions }), _jsx(Route, { path: "/apply", component: ApplyForm }), _jsx(Route, { path: "/track", component: CandidatePortal }), _jsx(Route, { path: "/verify-email-office", component: EmailVerification }), _jsx(Route, { path: "/verify-email-candidate", component: EmailVerification }), _jsx(Route, { path: "/induction", component: InductionChecklist }), _jsx(Route, { path: "/settings", component: Settings }), _jsx(Route, { path: "/404", component: NotFound }), _jsx(Route, { component: NotFound })] }));
}
function App() {
    return (_jsx(ErrorBoundary, { children: _jsx(ThemeProvider, { children: _jsxs(TooltipProvider, { children: [_jsx(Toaster, {}), _jsx(Router, {})] }) }) }));
}
export default App;
