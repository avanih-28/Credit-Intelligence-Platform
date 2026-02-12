import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, HelpCircle } from "lucide-react";
import { ScoreResult } from "@/lib/scoring";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export default function Results() {
  const [result, setResult] = useState<ScoreResult | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("latestScore");
    if (data) {
        setResult(JSON.parse(data));
    }
  }, []);

  if (!result) {
    return <div>Loading...</div>;
  }

  const getScoreColor = (score: number) => {
    if (score >= 750) return "text-emerald-400";
    if (score >= 650) return "text-blue-400";
    if (score >= 550) return "text-amber-400";
    return "text-destructive";
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/dashboard">
            <Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button>
        </Link>
        <h1 className="text-3xl font-bold text-white">Analysis Results</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Score Card */}
        <Card className="md:col-span-1 bg-card/40 backdrop-blur-md border-white/5 border-t-primary/50">
            <CardHeader>
                <CardTitle className="text-center text-muted-foreground">Total Score</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
                <div className={`text-6xl font-bold font-mono tracking-tighter ${getScoreColor(result.score)} neon-text mb-2`}>
                    {result.score}
                </div>
                <Badge variant="outline" className="border-white/10 text-white">
                    {result.riskCategory} Risk
                </Badge>
            </CardContent>
        </Card>

        {/* Explainability Breakdown */}
        <Card className="md:col-span-2 bg-card/40 backdrop-blur-md border-white/5">
            <CardHeader>
                <CardTitle>Factor Breakdown</CardTitle>
                <CardDescription>Transparent explanation of your score</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {result.factors.map((factor, i) => (
                    <div key={i} className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                            <span className="font-medium text-white flex items-center gap-2">
                                {factor.name}
                                <Tooltip>
                                    <TooltipTrigger><HelpCircle className="w-3 h-3 text-muted-foreground" /></TooltipTrigger>
                                    <TooltipContent className="max-w-xs">{factor.explanation}</TooltipContent>
                                </Tooltip>
                            </span>
                            <span className="font-mono text-muted-foreground">
                                {factor.score} <span className="text-white/20">/ {factor.maxPossible}</span>
                            </span>
                        </div>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-primary/80 rounded-full" 
                                style={{ width: `${(factor.score / factor.maxPossible) * 100}%` }}
                            />
                        </div>
                        <p className="text-xs text-muted-foreground">{factor.explanation}</p>
                    </div>
                ))}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
