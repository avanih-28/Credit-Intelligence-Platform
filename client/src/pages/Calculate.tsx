import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { calculateCreditScore } from "@/lib/scoring";
import { useToast } from "@/hooks/use-toast";

export default function Calculate() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    income: "",
    stdDev: "",
    expenseRatio: "",
    savingsRate: "",
    billPayment: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Parse and validate
    const data = {
        avgIncome: parseFloat(formData.income),
        incomeStdDev: parseFloat(formData.stdDev),
        expenseRatio: parseFloat(formData.expenseRatio) / 100,
        savingsRate: parseFloat(formData.savingsRate) / 100,
        billPaymentRatio: parseFloat(formData.billPayment) / 100,
        spendingVolatility: 0 // Mock default
    };

    // Calculate (Client-side simulation of backend logic)
    const result = calculateCreditScore(data);
    
    // Store result in local storage to pass to Results page
    localStorage.setItem("latestScore", JSON.stringify(result));

    setTimeout(() => {
        setLoading(false);
        toast({
            title: "Calculation Complete",
            description: "Your new credit score has been generated.",
        });
        setLocation("/results");
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Financial Calculator</h1>
        <p className="text-muted-foreground">Input your financial metrics to generate a core credit score.</p>
      </div>

      <Card className="bg-card/40 backdrop-blur-md border-white/5">
        <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label>Monthly Income ($)</Label>
                        <Input 
                            name="income" 
                            type="number" 
                            placeholder="5000" 
                            className="bg-black/20 border-white/10" 
                            required 
                            onChange={handleChange}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Income Standard Deviation ($)</Label>
                        <Input 
                            name="stdDev" 
                            type="number" 
                            placeholder="200" 
                            className="bg-black/20 border-white/10" 
                            required
                            onChange={handleChange}
                        />
                        <p className="text-[10px] text-muted-foreground">Measure of income stability</p>
                    </div>
                    <div className="space-y-2">
                        <Label>Expense Ratio (%)</Label>
                        <Input 
                            name="expenseRatio" 
                            type="number" 
                            placeholder="40" 
                            max="100"
                            className="bg-black/20 border-white/10" 
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Savings Rate (%)</Label>
                        <Input 
                            name="savingsRate" 
                            type="number" 
                            placeholder="20" 
                            max="100"
                            className="bg-black/20 border-white/10" 
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Bill Payment Success (%)</Label>
                        <Input 
                            name="billPayment" 
                            type="number" 
                            placeholder="99" 
                            max="100"
                            className="bg-black/20 border-white/10" 
                            required
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </CardContent>
            <CardFooter className="border-t border-white/5 pt-6">
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={loading}>
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Calculate Score"}
                </Button>
            </CardFooter>
        </form>
      </Card>
    </div>
  );
}
