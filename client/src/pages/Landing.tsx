import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, ShieldCheck, Lock } from "lucide-react";

export default function Landing() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8">
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-primary mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            SYSTEM OPERATIONAL
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">Next-Gen</span><br />
          <span className="text-primary neon-text">Credit Intelligence</span>
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Enterprise-grade alternative credit scoring platform. 
          Transparent, explainable, and secure.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <Link href="/register">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white min-w-[160px] h-12 text-base shadow-[0_0_20px_rgba(124,58,237,0.3)]">
                Get Started <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
        </Link>
        <Link href="/login">
            <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5 text-white min-w-[160px] h-12 text-base">
                Secure Login
            </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 text-left w-full max-w-5xl">
        <div className="p-6 rounded-lg border border-white/5 bg-white/[0.02] backdrop-blur-sm">
            <ShieldCheck className="w-8 h-8 text-emerald-500 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Explainable Scoring</h3>
            <p className="text-sm text-muted-foreground">Transparent breakdown of every scoring factor. No black-box algorithms.</p>
        </div>
        <div className="p-6 rounded-lg border border-white/5 bg-white/[0.02] backdrop-blur-sm">
            <Lock className="w-8 h-8 text-amber-500 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Bank-Grade Security</h3>
            <p className="text-sm text-muted-foreground">Firebase Auth integration with strict Firestore rules for data isolation.</p>
        </div>
        <div className="p-6 rounded-lg border border-white/5 bg-white/[0.02] backdrop-blur-sm">
            <div className="w-8 h-8 text-primary font-mono font-bold text-xl mb-4">900</div>
            <h3 className="text-lg font-bold text-white mb-2">300-900 Scale</h3>
            <p className="text-sm text-muted-foreground">Standardized industry scoring model for seamless integration.</p>
        </div>
      </div>
    </div>
  );
}
