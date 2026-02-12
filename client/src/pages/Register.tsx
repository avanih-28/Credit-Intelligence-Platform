import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function Register() {
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate Firebase Registration
    setTimeout(() => {
        setLoading(false);
        setLocation("/dashboard");
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <Card className="bg-card/40 backdrop-blur-md border-white/5 shadow-2xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-white">Create Account</CardTitle>
          <CardDescription>Initialize your secure credit profile.</CardDescription>
        </CardHeader>
        <form onSubmit={handleRegister}>
            <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="first">First Name</Label>
                    <Input id="first" className="bg-black/20 border-white/10" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="last">Last Name</Label>
                    <Input id="last" className="bg-black/20 border-white/10" required />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="user@example.com" className="bg-black/20 border-white/10" required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" className="bg-black/20 border-white/10" required />
            </div>
            </CardContent>
            <CardFooter>
            <Button className="w-full bg-primary hover:bg-primary/90" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Register"}
            </Button>
            </CardFooter>
        </form>
      </Card>
    </div>
  );
}
