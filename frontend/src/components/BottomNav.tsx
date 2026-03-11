"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { navItems } from "@/lib/nav-items"
import { cn } from "@/lib/utils"

export function BottomNav() {
  const pathname = usePathname()

  // Only show first 4 items in bottom nav for space
  const displayItems = navItems.slice(0, 4)

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 w-full items-center justify-around border-t border-border-subtle bg-bg-primary/80 backdrop-blur-md px-4 md:hidden">
      {displayItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-1 transition-colors",
              isActive ? "text-lime-accent" : "text-text-dim"
            )}
          >
            <item.icon size={20} />
            <span className="text-[9px] font-mono uppercase tracking-widest font-bold">
              {item.label}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
