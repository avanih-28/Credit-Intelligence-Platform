import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/Layout";
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import Calculate from "@/pages/Calculate";
import Results from "@/pages/Results";
import KYC from "@/pages/KYC";
import Invest from "@/pages/Invest";
import Loans from "@/pages/Loans";
import Admin from "@/pages/Admin";
import AIAdvisor from "@/pages/AIAdvisor";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Layout>
      <Switch>
        {/* Core Routes - Preserved */}
        <Route path="/" component={Landing} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/calculate" component={Calculate} />
        <Route path="/results" component={Results} />

        {/* Enterprise Modules - Added */}
        <Route path="/kyc" component={KYC} />
        <Route path="/invest" component={Invest} />
        <Route path="/loans" component={Loans} />
        <Route path="/admin" component={Admin} />
        <Route path="/advisor" component={AIAdvisor} />
        
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
