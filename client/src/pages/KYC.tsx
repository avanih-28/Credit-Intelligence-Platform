import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { COUNTRIES } from "@/lib/mockData";
import { Loader2, CheckCircle2, AlertCircle, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

export default function KYC() {
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [country, setCountry] = useState("USA");
  const { toast } = useToast();

  const handleVerification = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
        setLoading(false);
        setVerified(true);
        toast({
            title: "Verification Successful",
            description: "Your identity has been verified against national databases.",
        });
    }, 2000);
  };

  const getDocLabel = (c: string) => {
    switch(c) {
        case "India": return "Aadhaar Number";
        case "USA": return "SSN (Social Security)";
        case "UK": return "National Insurance Number";
        case "Singapore": return "NRIC / FIN";
        default: return "National ID";
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-6">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard">
            <Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button>
        </Link>
        <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Identity Verification</h1>
            <p className="text-muted-foreground">Secure, bank-grade KYC verification required for all lending products.</p>
        </div>
      </div>

      <Card className="bg-card/40 backdrop-blur-md border-white/5 relative overflow-hidden">
        {verified && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-500">
                <div className="h-16 w-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Verified Successfully</h3>
                <p className="text-muted-foreground max-w-sm mb-6">
                    Your identity has been confirmed. You now have full access to the AltScore lending marketplace.
                </p>
                <Button variant="outline" onClick={() => setVerified(false)}>Reset Simulation</Button>
            </div>
        )}

        <CardHeader>
          <CardTitle>Personal Details</CardTitle>
          <CardDescription>Enter your government issued ID details.</CardDescription>
        </CardHeader>
        <form onSubmit={handleVerification}>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label>Country of Residence</Label>
                    <Select value={country} onValueChange={setCountry}>
                        <SelectTrigger className="bg-black/20 border-white/10">
                            <SelectValue placeholder="Select Country" />
                        </SelectTrigger>
                        <SelectContent>
                            {COUNTRIES.map((c) => (
                                <SelectItem key={c.code} value={c.code}>
                                    <span className="mr-2">{c.flag}</span> {c.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>First Name</Label>
                        <Input placeholder="Alex" className="bg-black/20 border-white/10" />
                    </div>
                    <div className="space-y-2">
                        <Label>Last Name</Label>
                        <Input placeholder="Mercer" className="bg-black/20 border-white/10" />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>{getDocLabel(country)}</Label>
                    <Input placeholder="XXXX-XXXX-XXXX" className="font-mono bg-black/20 border-white/10" />
                    <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        Data is encrypted using AES-256 before transmission.
                    </p>
                </div>
            </CardContent>
            <CardFooter className="border-t border-white/5 pt-6">
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={loading}>
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Verifying with Gov DB...
                        </>
                    ) : (
                        "Verify Identity"
                    )}
                </Button>
            </CardFooter>
        </form>
      </Card>
    </div>
  );
}
