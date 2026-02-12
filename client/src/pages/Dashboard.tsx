import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, PlusCircle, ShieldCheck, CreditCard, TrendingUp, Bot, PieChart } from "lucide-react";
import { INITIAL_USER, MOCK_HISTORY } from "@/lib/mockData";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

export default function Dashboard() {
  const hasScore = true; 

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-muted-foreground">Core Edition • Enterprise Modules Active</p>
        </div>
        <div className="text-sm text-muted-foreground font-mono bg-white/5 px-3 py-1 rounded border border-white/10">
            ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Core Status Card - PRESERVED */}
        <Card className="bg-card/40 backdrop-blur-md border-white/5 h-full lg:col-span-1 border-t-primary/50">
            <CardHeader>
                <CardTitle>Credit Status</CardTitle>
                <CardDescription>Real-time scoring status</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-4">
                {hasScore ? (
                    <>
                        <div className="relative">
                            <div className="w-40 h-40 rounded-full border-8 border-primary/20 flex items-center justify-center bg-black/20">
                                <div className="text-center">
                                    <span className="text-4xl font-bold text-white font-mono neon-text block">{INITIAL_USER.score.hybrid}</span>
                                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Hybrid</span>
                                </div>
                            </div>
                            <div className="absolute inset-0 rounded-full border-8 border-primary/60 border-t-transparent animate-[spin_3s_linear_infinite]" />
                        </div>
                        <div className="mt-6 text-center w-full">
                            <div className="flex justify-between text-xs text-muted-foreground px-8 mb-4">
                                <div className="text-center">
                                    <div className="text-white font-bold">{INITIAL_USER.score.rule}</div>
                                    <div>Rule</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-primary font-bold">{INITIAL_USER.score.ml}</div>
                                    <div>ML</div>
                                </div>
                            </div>
                            <Link href="/results">
                                <Button className="w-full" variant="outline">View Analysis</Button>
                            </Link>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-muted-foreground mb-6">No credit score calculated yet.</p>
                        <Link href="/calculate">
                            <Button className="bg-primary hover:bg-primary/90">
                                <PlusCircle className="mr-2 h-4 w-4" /> Calculate Now
                            </Button>
                        </Link>
                    </div>
                )}
            </CardContent>
        </Card>

        {/* History Chart - RESTORED */}
        <Card className="bg-card/40 backdrop-blur-md border-white/5 h-full lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-white">Score Trajectory</CardTitle>
            <CardDescription>Hybrid Model vs Traditional Rule-Based</CardDescription>
          </CardHeader>
          <CardContent className="pl-0">
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MOCK_HISTORY}>
                    <defs>
                        <linearGradient id="colorHybrid" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis dataKey="month" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} domain={[600, 800]} />
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#09090b', borderColor: 'rgba(255,255,255,0.1)', color: '#fff' }}
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
                        fillOpacity={0} 
                        fill="transparent" 
                    />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enterprise Modules Grid - EXTENSION */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            Enterprise Modules
            <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded border border-primary/20">NEW</span>
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Link href="/kyc">
                <Card className="bg-card/40 backdrop-blur-md border-white/5 hover:bg-white/5 transition-colors cursor-pointer group">
                    <CardHeader className="pb-2">
                        <ShieldCheck className="w-8 h-8 text-emerald-500 mb-2 group-hover:scale-110 transition-transform" />
                        <CardTitle className="text-base">KYC Verification</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-xs text-muted-foreground">Identity verification for 5+ regions.</p>
                    </CardContent>
                </Card>
            </Link>

            <Link href="/invest">
                <Card className="bg-card/40 backdrop-blur-md border-white/5 hover:bg-white/5 transition-colors cursor-pointer group">
                    <CardHeader className="pb-2">
                        <TrendingUp className="w-8 h-8 text-blue-500 mb-2 group-hover:scale-110 transition-transform" />
                        <CardTitle className="text-base">Investment Engine</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-xs text-muted-foreground">AI-curated global opportunities.</p>
                    </CardContent>
                </Card>
            </Link>

            <Link href="/loans">
                <Card className="bg-card/40 backdrop-blur-md border-white/5 hover:bg-white/5 transition-colors cursor-pointer group">
                    <CardHeader className="pb-2">
                        <CreditCard className="w-8 h-8 text-amber-500 mb-2 group-hover:scale-110 transition-transform" />
                        <CardTitle className="text-base">Loan Simulator</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-xs text-muted-foreground">Micro-loan impact analysis.</p>
                    </CardContent>
                </Card>
            </Link>

            <Link href="/advisor">
                <Card className="bg-card/40 backdrop-blur-md border-white/5 hover:bg-white/5 transition-colors cursor-pointer group">
                    <CardHeader className="pb-2">
                        <Bot className="w-8 h-8 text-primary mb-2 group-hover:scale-110 transition-transform" />
                        <CardTitle className="text-base">AI Advisor</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-xs text-muted-foreground">Personalized financial guidance.</p>
                    </CardContent>
                </Card>
            </Link>
        </div>
      </div>
      
      {/* Admin Link - Footer style */}
      <div className="flex justify-end pt-4">
        <Link href="/admin">
            <Button variant="ghost" className="text-xs text-muted-foreground hover:text-white">
                <PieChart className="w-3 h-3 mr-2" />
                Lender/Admin Dashboard Access
            </Button>
        </Link>
      </div>
    </div>
  );
}
