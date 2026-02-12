import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { INITIAL_USER } from "@/lib/mockData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function Loans() {
  const [amount, setAmount] = useState([5000]);
  const [months, setMonths] = useState([12]);

  // Mock calculation logic
  const interestRate = 12.5; // %
  const monthlyPayment = (amount[0] * (1 + interestRate/100)) / months[0];
  const projectedScoreImpact = amount[0] > 10000 ? -15 : -5;
  
  const chartData = [
    { name: 'Current', score: INITIAL_USER.score.hybrid },
    { name: 'Post-Loan', score: INITIAL_USER.score.hybrid + projectedScoreImpact },
    { name: 'Paid Off', score: INITIAL_USER.score.hybrid + 25 }, // Boost after paying off
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/dashboard">
            <Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button>
        </Link>
        <div>
            <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Micro-Loan Simulator</h1>
            <p className="text-muted-foreground">Visualize how borrowing impacts your hybrid credit score over time.</p>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="bg-card/40 backdrop-blur-md border-white/5">
            <CardHeader>
                <CardTitle>Loan Configuration</CardTitle>
                <CardDescription>Adjust parameters to see repayment terms</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                <div className="space-y-4">
                    <div className="flex justify-between">
                        <span className="text-sm font-medium">Loan Amount</span>
                        <span className="text-sm font-mono text-primary font-bold">${amount[0].toLocaleString()}</span>
                    </div>
                    <Slider 
                        value={amount} 
                        onValueChange={setAmount} 
                        max={50000} 
                        step={500}
                        className="py-4" 
                    />
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between">
                        <span className="text-sm font-medium">Tenure (Months)</span>
                        <span className="text-sm font-mono text-primary font-bold">{months[0]} Months</span>
                    </div>
                    <Slider 
                        value={months} 
                        onValueChange={setMonths} 
                        max={60} 
                        step={6}
                        className="py-4" 
                    />
                </div>

                <div className="p-6 bg-black/20 rounded-lg space-y-3 border border-white/5">
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Interest Rate</span>
                        <span>{interestRate}% APR</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Total Repayment</span>
                        <span>${(monthlyPayment * months[0]).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                    </div>
                    <div className="h-px bg-white/10 my-2" />
                    <div className="flex justify-between text-lg font-bold">
                        <span>Monthly EMI</span>
                        <span className="text-emerald-400">${monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                    </div>
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90">Apply Now</Button>
            </CardContent>
        </Card>

        <Card className="bg-card/40 backdrop-blur-md border-white/5">
            <CardHeader>
                <CardTitle>Projected Score Impact</CardTitle>
                <CardDescription>AI Prediction Model v2.1</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[250px] w-full mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                            <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} domain={[650, 800]} />
                            <Tooltip 
                                cursor={{fill: 'rgba(255,255,255,0.05)'}}
                                contentStyle={{ backgroundColor: '#09090b', borderColor: 'rgba(255,255,255,0.1)', color: '#fff' }}
                            />
                            <Bar dataKey="score" radius={[4, 4, 0, 0]} barSize={40}>
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={index === 0 ? '#6b7280' : index === 1 ? '#ef4444' : '#10b981'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="mt-6 text-sm text-muted-foreground text-center">
                    <p>Taking this loan may temporarily lower your score by <span className="text-red-400">{Math.abs(projectedScoreImpact)} points</span> due to increased debt burden. Consistent repayment will boost it significantly.</p>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
