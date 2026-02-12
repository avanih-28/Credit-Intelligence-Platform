import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Simple, core-focused Navbar (No Sidebar)
export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const isAuthPage = location === "/login" || location === "/register" || location === "/";

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
      {/* Top Navigation Bar */}
      <header className="h-16 border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
            <Link href="/">
                <a className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded bg-primary flex items-center justify-center shadow-[0_0_15px_rgba(124,58,237,0.5)] group-hover:shadow-[0_0_25px_rgba(124,58,237,0.8)] transition-all">
                        <span className="font-mono text-white font-bold text-lg">A</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white">
                        AltScore<span className="text-primary">.Core</span>
                    </span>
                </a>
            </Link>

            <nav className="flex items-center gap-6">
                {!isAuthPage && (
                    <>
                        <Link href="/dashboard">
                            <a className={cn("text-sm font-medium hover:text-primary transition-colors", location === "/dashboard" ? "text-primary" : "text-muted-foreground")}>
                                Dashboard
                            </a>
                        </Link>
                        <Link href="/calculate">
                            <a className={cn("text-sm font-medium hover:text-primary transition-colors", location === "/calculate" ? "text-primary" : "text-muted-foreground")}>
                                Calculate
                            </a>
                        </Link>
                         <Link href="/">
                            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive">
                                Logout
                            </Button>
                        </Link>
                    </>
                )}
                
                {isAuthPage && (
                    <div className="flex items-center gap-4">
                        <Link href="/login">
                            <a className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">Login</a>
                        </Link>
                        <Link href="/register">
                            <Button size="sm" className="bg-primary hover:bg-primary/90 text-white shadow-[0_0_15px_rgba(124,58,237,0.3)]">
                                Register
                            </Button>
                        </Link>
                    </div>
                )}
            </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>
      
      {/* Simple Footer */}
      <footer className="border-t border-white/5 py-8 mt-auto bg-black/20">
        <div className="max-w-7xl mx-auto px-6 text-center text-xs text-muted-foreground">
            <p>&copy; 2026 AltScore Enterprise. Core Edition v1.0.0</p>
            <p className="mt-2">Strictly confidential. Authorized access only.</p>
        </div>
      </footer>
    </div>
  );
}
