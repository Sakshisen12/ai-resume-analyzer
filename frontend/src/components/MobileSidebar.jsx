import { Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { navItems } from "@/lib/nav-items";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

export function MobileSidebar() {
  const { pathname } = useLocation();
  const { logout } = useAuth();

  return (
    <Sheet>
      <SheetTrigger>
        <button
          type="button"
          className="lg:hidden p-2 text-text-secondary hover:text-text-primary transition-colors rounded-md cursor-pointer"
          aria-label="Open navigation menu"
        >
          <Menu size={20} />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] bg-bg-primary p-0 border-r border-border-subtle">
        <div className="flex h-20 items-center px-8 border-b border-border-subtle">
          <Link to="/" className="font-display text-2xl font-bold tracking-tighter text-text-primary">
            RESUME<span className="text-lime-accent">AI</span>
          </Link>
        </div>
        
        <nav className="flex-1 space-y-1 px-4 py-6">
          {navItems.map((item) => {
            if (item.label === "Logout") {
              return (
                <SheetClose key={item.label}>
                  <button
                    onClick={logout}
                    className="w-full group flex items-center gap-3 rounded-md px-4 py-4 text-sm font-mono uppercase tracking-widest text-text-dim hover:bg-red-500/10 hover:text-red-400 transition-colors cursor-pointer text-left"
                  >
                    <item.icon size={18} className="text-text-dim group-hover:text-red-400 transition-colors" />
                    {item.label}
                  </button>
                </SheetClose>
              );
            }

            const isActive = pathname === item.href;
            return (
              <SheetClose key={item.href}>
                <Link
                  to={item.href}
                  className={cn(
                    "group flex items-center gap-3 rounded-md px-4 py-4 text-sm font-mono uppercase tracking-widest transition-colors",
                    isActive 
                      ? "bg-bg-elevated text-lime-accent" 
                      : "text-text-dim hover:bg-bg-secondary hover:text-text-primary"
                  )}
                >
                  <item.icon size={18} className={cn(isActive ? "text-lime-accent" : "text-text-dim group-hover:text-text-primary")} />
                  {item.label}
                </Link>
              </SheetClose>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
