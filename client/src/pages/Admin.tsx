import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Users, AlertTriangle, CheckCircle, TrendingUp, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Admin() {
  const userStats = [
    { country: "India", users: 1240, avgScore: 710, risk: "Low" },
    { country: "USA", users: 850, avgScore: 745, risk: "Very Low" },
    { country: "UK", users: 620, avgScore: 725, risk: "Low" },
    { country: "Singapore", users: 410, avgScore: 760, risk: "Very Low" },
    { country: "EU", users: 530, avgScore: 715, risk: "Moderate" },
  ];

  const riskData = [
    { name: 'Low Risk', value: 65, color: '#10b981' },
    { name: 'Moderate Risk', value: 25, color: '#f59e0b' },
    { name: 'High Risk', value: 10, color: '#ef4444' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/dashboard">
            <Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button>
        </Link>
        <div>
            <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Lender Dashboard</h1>
            <p className="text-muted-foreground">Aggregated portfolio metrics and global risk exposure.</p>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-card/40 backdrop-blur-md border-white/5">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-white">3,650</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                    <Users className="w-3 h-3 mr-1" /> +12% this month
                </p>
            </CardContent>
        </Card>
        <Card className="bg-card/40 backdrop-blur-md border-white/5">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Avg Hybrid Score</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-white">728</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1 text-emerald-500" /> Across all regions
                </p>
            </CardContent>
        </Card>
        <Card className="bg-card/40 backdrop-blur-md border-white/5">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">KYC Verified</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-white">84.2%</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                    <CheckCircle className="w-3 h-3 mr-1 text-primary" /> Compliance Rate
                </p>
            </CardContent>
        </Card>
        <Card className="bg-card/40 backdrop-blur-md border-white/5">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Default Rate (Proj)</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-white">2.1%</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                    <AlertTriangle className="w-3 h-3 mr-1 text-amber-500" /> Below industry avg
                </p>
            </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Country Table */}
        <Card className="md:col-span-2 bg-card/40 backdrop-blur-md border-white/5">
            <CardHeader>
                <CardTitle>Regional Performance</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow className="border-white/5 hover:bg-transparent">
                            <TableHead className="text-muted-foreground">Region</TableHead>
                            <TableHead className="text-muted-foreground text-right">Active Users</TableHead>
                            <TableHead className="text-muted-foreground text-right">Avg Score</TableHead>
                            <TableHead className="text-muted-foreground text-right">Risk Profile</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {userStats.map((stat) => (
                            <TableRow key={stat.country} className="border-white/5 hover:bg-white/5">
                                <TableCell className="font-medium text-white">{stat.country}</TableCell>
                                <TableCell className="text-right">{stat.users}</TableCell>
                                <TableCell className="text-right font-mono">{stat.avgScore}</TableCell>
                                <TableCell className="text-right">
                                    <Badge variant="outline" className={`
                                        ${stat.risk.includes('Low') ? 'border-emerald-500/30 text-emerald-400' : 'border-amber-500/30 text-amber-400'}
                                    `}>
                                        {stat.risk}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

        {/* Risk Pie Chart */}
        <Card className="bg-card/40 backdrop-blur-md border-white/5">
            <CardHeader>
                <CardTitle>Portfolio Risk</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={riskData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {riskData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                            ))}
                        </Pie>
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#09090b', borderColor: 'rgba(255,255,255,0.1)', color: '#fff' }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
