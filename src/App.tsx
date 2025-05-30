
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import GoalDetail from "./pages/GoalDetail";
import AddGoal from "./pages/AddGoal";
import GoalBreakdown from "./pages/GoalBreakdown";
import HistoryTracking from "./pages/HistoryTracking";
import AccountManagement from "./pages/AccountManagement";
import NotificationSettings from "./pages/NotificationSettings";
import PrivacySettings from "./pages/PrivacySettings";
import HelpCenter from "./pages/HelpCenter";
import CommunityResources from "./pages/CommunityResources";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/goal-detail/:id" element={<GoalDetail />} />
          <Route path="/add-goal" element={<AddGoal />} />
          <Route path="/goal-breakdown" element={<GoalBreakdown />} />
          <Route path="/history-tracking" element={<HistoryTracking />} />
          <Route path="/account-management" element={<AccountManagement />} />
          <Route path="/notification-settings" element={<NotificationSettings />} />
          <Route path="/privacy-settings" element={<PrivacySettings />} />
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/community-resources" element={<CommunityResources />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
