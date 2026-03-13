"use client"

import { Sidebar } from "@/components/Sidebar"
import Navbar from "@/components/Navbar"
import { BottomNav } from "@/components/BottomNav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-bg-primary lg:flex">
      {/* Sidebar for Desktop */}
      <Sidebar />

      <div className="flex-1 flex flex-col lg:pl-[240px]">
        {/* Navbar for Mobile & Header for Desktop */}
        <Navbar />

        <main className="flex-1 pb-20 lg:pb-0">
          <div className="mx-auto max-w-[1280px]">
            {children}
          </div>
        </main>
      </div>

      {/* Bottom Nav for Mobile */}
      <BottomNav />
    </div>
  )
}
