import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { INITIAL_USER, MOCK_HISTORY } from "@/lib/mockData";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { ArrowUpRight, ShieldCheck, Activity, TrendingUp } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-1">
            Welcome back, {INITIAL_USER.name}
          </h1>
          <p className="text-muted-foreground">
            Your financial intelligence overview for {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}.
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
            <span className="text-sm font-medium text-primary">Live Updates</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card/40 backdrop-blur-md border-white/5 hover:border-primary/50 transition-colors group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Hybrid Score</CardTitle>
            <Activity className="h-4 w-4 text-primary group-hover:text-white transition-colors" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white font-mono tracking-tighter">{INITIAL_USER.score.hybrid}</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <span className="text-emerald-500 flex items-center">
                <ArrowUpRight className="h-3 w-3" /> +12
              </span>
              since last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/40 backdrop-blur-md border-white/5 hover:border-primary/50 transition-colors group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Verification Status</CardTitle>
            <ShieldCheck className="h-4 w-4 text-primary group-hover:text-white transition-colors" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">Pending</div>
            <p className="text-xs text-muted-foreground mt-1">
              Complete KYC to unlock features
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/40 backdrop-blur-md border-white/5 hover:border-primary/50 transition-colors group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Risk Category</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary group-hover:text-white transition-colors" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-400">Low Risk</div>
            <p className="text-xs text-muted-foreground mt-1">
              Top 15% of your demographic
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-primary/20 to-purple-900/10 border-primary/20 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">AI Advisor</CardTitle>
            <span className="text-[10px] px-2 py-0.5 rounded bg-primary text-white">BETA</span>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-white/80">
              "Your credit mix is excellent, but savings rate could improve by 2%."
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Chart */}
      <div className="grid gap-4 md:grid-cols-7">
        <Card className="col-span-4 bg-card/40 backdrop-blur-md border-white/5">
          <CardHeader>
            <CardTitle className="text-white">Score Trajectory</CardTitle>
            <CardDescription>Hybrid Model vs Traditional Rule-Based</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MOCK_HISTORY}>
                    <defs>
                        <linearGradient id="colorHybrid" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorRule" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis 
                        dataKey="month" 
                        stroke="#6b7280" 
                        fontSize={12} 
                        tickLine={false} 
                        axisLine={false}
                    />
                    <YAxis 
                        stroke="#6b7280" 
                        fontSize={12} 
                        tickLine={false} 
                        axisLine={false} 
                        domain={[600, 800]}
                    />
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#09090b', borderColor: 'rgba(255,255,255,0.1)', color: '#fff' }}
                        itemStyle={{ color: '#fff' }}
                    />
                    <Area 
                        type="monotone" 
                        dataKey="hybrid" 
                        name="Hybrid Score"
                        stroke="#7c3aed" 
                        strokeWidth={3}
                        fillOpacity={1} 
                        fill="url(#colorHybrid)" 
                    />
                    <Area 
                        type="monotone" 
                        dataKey="rule" 
                        name="Rule Based"
                        stroke="#06b6d4" 
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        fillOpacity={1} 
                        fill="url(#colorRule)" 
                    />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 bg-card/40 backdrop-blur-md border-white/5">
            <CardHeader>
                <CardTitle className="text-white">Recent Alerts</CardTitle>
                <CardDescription>Security & Financial Events</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {[
                        { title: "Credit Utilization Spiked", time: "2 hours ago", type: "warning" },
                        { title: "Loan Payment Verified", time: "Yesterday", type: "success" },
                        { title: "New Inquiry Detected", time: "3 days ago", type: "neutral" },
                    ].map((item, i) => (
                        <div key={i} className="flex items-start gap-4 p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                            <div className={`w-2 h-2 mt-2 rounded-full ${item.type === 'warning' ? 'bg-amber-500' : item.type === 'success' ? 'bg-emerald-500' : 'bg-blue-500'}`} />
                            <div>
                                <h4 className="text-sm font-medium text-white">{item.title}</h4>
                                <p className="text-xs text-muted-foreground">{item.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
