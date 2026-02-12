import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, PlusCircle } from "lucide-react";
import { INITIAL_USER } from "@/lib/mockData";

export default function Dashboard() {
  // Mock check if user has a score yet
  const hasScore = true; 

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <div className="text-sm text-muted-foreground font-mono">ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-card/40 backdrop-blur-md border-white/5 h-full">
            <CardHeader>
                <CardTitle>Credit Status</CardTitle>
                <CardDescription>Real-time scoring status</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-8">
                {hasScore ? (
                    <>
                        <div className="relative">
                            <div className="w-48 h-48 rounded-full border-8 border-primary/20 flex items-center justify-center">
                                <span className="text-5xl font-bold text-white font-mono neon-text">{INITIAL_USER.score.hybrid}</span>
                            </div>
                            <div className="absolute inset-0 rounded-full border-8 border-primary/60 border-t-transparent animate-[spin_3s_linear_infinite]" />
                        </div>
                        <div className="mt-6 text-center">
                            <p className="text-lg font-medium text-emerald-400">Good Standing</p>
                            <p className="text-sm text-muted-foreground mt-1">Last updated: Today</p>
                        </div>
                        <Link href="/results">
                            <Button className="mt-6 w-full" variant="outline">View Full Analysis</Button>
                        </Link>
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

        <Card className="bg-card/40 backdrop-blur-md border-white/5 h-full">
            <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <Link href="/calculate">
                    <Button variant="secondary" className="w-full justify-between h-14 bg-white/5 hover:bg-white/10 border border-white/5">
                        <span className="flex items-center gap-2">
                            <PlusCircle className="w-4 h-4 text-primary" />
                            Update Financial Data
                        </span>
                        <ArrowRight className="w-4 h-4 opacity-50" />
                    </Button>
                </Link>
                <Button variant="secondary" className="w-full justify-between h-14 bg-white/5 hover:bg-white/10 border border-white/5">
                    <span className="flex items-center gap-2">
                        <ArrowRight className="w-4 h-4 text-primary" />
                        Download Report
                    </span>
                    <ArrowRight className="w-4 h-4 opacity-50" />
                </Button>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
