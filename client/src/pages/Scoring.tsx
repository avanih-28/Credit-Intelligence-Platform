import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FEATURE_IMPORTANCE, INITIAL_USER } from "@/lib/mockData";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell, RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";
import { Separator } from "@/components/ui/separator";

export default function Scoring() {
  const scoreData = [
    { name: 'Score', value: INITIAL_USER.score.hybrid, fill: '#7c3aed' }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Credit Analysis Engine</h1>
        <p className="text-muted-foreground">Deep dive into your hybrid credit profile and scoring factors.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Score Gauge */}
        <Card className="bg-card/40 backdrop-blur-md border-white/5 md:col-span-1 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />
            <CardHeader>
                <CardTitle>Hybrid Score Composition</CardTitle>
                <CardDescription>70% Rule-Based + 30% ML Behavioral Analysis</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-10 relative">
                <div className="w-64 h-64 relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadialBarChart 
                            innerRadius="70%" 
                            outerRadius="100%" 
                            barSize={20} 
                            data={scoreData} 
                            startAngle={180} 
                            endAngle={0}
                        >
                            <PolarAngleAxis type="number" domain={[300, 900]} angleAxisId={0} tick={false} />
                            <RadialBar
                                background={{ fill: 'rgba(255,255,255,0.05)' }}
                                dataKey="value"
                                cornerRadius={10}
                            />
                        </RadialBarChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center mt-8">
                        <span className="text-6xl font-bold text-white tracking-tighter font-mono neon-text">
                            {INITIAL_USER.score.hybrid}
                        </span>
                        <span className="text-sm text-muted-foreground uppercase tracking-widest mt-2">Excellent</span>
                    </div>
                </div>
                
                <div className="grid grid-cols-2 gap-8 mt-8 w-full">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-white/80">{INITIAL_USER.score.rule}</div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider">Traditional</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{INITIAL_USER.score.ml}</div>
                        <div className="text-xs text-primary/80 uppercase tracking-wider font-bold">ML Boost</div>
                    </div>
                </div>
            </CardContent>
        </Card>

        {/* Comparison Chart */}
        <div className="space-y-6">
            <Card className="bg-card/40 backdrop-blur-md border-white/5 h-full">
                <CardHeader>
                    <CardTitle>Feature Importance (XAI)</CardTitle>
                    <CardDescription>Explainable AI transparency report on your score</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-5">
                        {FEATURE_IMPORTANCE.map((item, index) => (
                            <div key={index} className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-white">{item.feature}</span>
                                    <span className="font-mono text-muted-foreground">{item.value}</span>
                                </div>
                                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-gradient-to-r from-primary to-purple-400 rounded-full" 
                                        style={{ width: `${item.importance * 100}%` }} 
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 p-4 bg-primary/5 border border-primary/10 rounded-lg">
                        <h4 className="text-sm font-bold text-primary mb-1">AI Insight</h4>
                        <p className="text-xs text-muted-foreground">
                            Your <span className="text-white font-semibold">Spending Volatility</span> is lower than 85% of peers in your demographic, positively impacting your ML score component.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
