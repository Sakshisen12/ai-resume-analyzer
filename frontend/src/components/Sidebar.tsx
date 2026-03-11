"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { navItems } from "@/lib/nav-items"
import { cn } from "@/lib/utils"

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[240px] flex-col border-r border-border-subtle bg-bg-primary lg:flex">
      <div className="flex h-20 items-center px-8">
        <Link href="/" className="font-display text-2xl font-bold tracking-tighter text-text-primary">
          RESUME<span className="text-lime-accent">AI</span>
        </Link>
      </div>
      
      <nav className="flex-1 space-y-1 px-4 py-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-md px-4 py-3 text-sm font-mono uppercase tracking-widest transition-colors",
                isActive 
                  ? "bg-bg-elevated text-lime-accent" 
                  : "text-text-dim hover:bg-bg-secondary hover:text-text-primary"
              )}
            >
              <item.icon size={18} className={cn(isActive ? "text-lime-accent" : "text-text-dim group-hover:text-text-primary")} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-border-subtle">
        <div className="flex items-center gap-3 px-4 py-2">
          <div className="h-8 w-8 rounded-md bg-bg-elevated border border-border-subtle flex items-center justify-center text-[10px] font-mono font-bold text-lime-accent">
            JD
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-text-primary">John Doe</span>
            <span className="text-[10px] font-mono text-text-dim uppercase tracking-wider">Pro Plan</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
