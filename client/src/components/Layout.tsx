import { Link, useLocation } from "wouter";
import { NAV_ITEMS, INITIAL_USER } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen flex bg-background text-foreground font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-sidebar-border bg-sidebar/50 backdrop-blur-xl fixed h-full z-10 hidden md:flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-[0_0_15px_rgba(124,58,237,0.5)]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-5 h-5 text-white"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            AltScore<span className="text-primary">.ai</span>
          </span>
        </div>

        <div className="px-4 py-2">
            <div className="text-xs font-mono text-muted-foreground mb-4 uppercase tracking-widest px-2">
                Platform
            </div>
            <nav className="space-y-1">
            {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = location === item.href;
                return (
                <Link key={item.href} href={item.href}>
                    <a
                    className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative overflow-hidden",
                        isActive
                        ? "text-white bg-primary/10 shadow-[inset_0_0_20px_rgba(124,58,237,0.1)] border border-primary/20"
                        : "text-muted-foreground hover:text-white hover:bg-white/5"
                    )}
                    >
                    {isActive && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary shadow-[0_0_10px_#7c3aed]" />
                    )}
                    <Icon className={cn("w-4 h-4", isActive ? "text-primary" : "text-muted-foreground group-hover:text-white")} />
                    {item.label}
                    </a>
                </Link>
                );
            })}
            </nav>
        </div>

        <div className="mt-auto p-6 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 border border-primary/20">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>AM</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-white">{INITIAL_USER.name}</span>
              <span className="text-xs text-muted-foreground">Enterprise Plan</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 relative z-0">
        {/* Header */}
        <header className="h-16 border-b border-border bg-background/50 backdrop-blur-lg sticky top-0 z-20 px-6 flex items-center justify-between">
            <div className="md:hidden">
                {/* Mobile Trigger would go here */}
                <span className="font-bold">AltScore</span>
            </div>
            
            <div className="flex-1 max-w-md hidden md:block">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                        placeholder="Search markets, reports, or users..." 
                        className="pl-9 bg-secondary/50 border-white/5 focus:border-primary/50 transition-all"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-white">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_8px_#7c3aed]" />
                </Button>
                <div className="h-6 w-px bg-border mx-2" />
                <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                    SYSTEM ONLINE
                </div>
            </div>
        </header>

        <div className="p-6 md:p-8 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            {children}
        </div>
      </main>
    </div>
  );
}
