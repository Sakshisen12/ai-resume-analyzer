"use client"

import { Menu } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { navItems } from "@/lib/nav-items"
import { cn } from "@/lib/utils"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"

export function MobileSidebar() {
  const pathname = usePathname()

  return (
    <Sheet>
      <SheetTrigger
        render={
          <button
            className="lg:hidden p-2 text-text-secondary hover:text-text-primary transition-colors rounded-md"
            aria-label="Open navigation menu"
          />
        }
      >
        <Menu size={20} />
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] bg-bg-primary p-0 border-r border-border-subtle">
        <div className="flex h-20 items-center px-8 border-b border-border-subtle">
          <Link href="/" className="font-display text-2xl font-bold tracking-tighter text-text-primary">
            RESUME<span className="text-lime-accent">AI</span>
          </Link>
        </div>
        
        <nav className="flex-1 space-y-1 px-4 py-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <SheetClose key={item.href}>
                <Link
                  href={item.href}
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
            )
          })}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
