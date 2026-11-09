'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { MobileSidebar } from '@/components/MobileSidebar';
import {
  LayoutDashboard,
  FileUp,
  Target,
  History,
  BarChart3,
  HelpCircle,
  LogOut,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  User as UserIcon,
} from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  // Format initials cleanly (e.g., "sakshi sen" -> "SS")
  const initials = user?.name
    ? user.name
        .trim()
        .split(/\s+/)
        .map((part) => part[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'UI';

  // Format display name with proper title case (e.g. "sakshi sen" -> "Sakshi Sen")
  const displayName = user?.name
    ? user.name
        .trim()
        .split(/\s+/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
    : 'Candidate';

  const userEmail = user?.email || 'candidate@resumeai.io';

  const menuItems = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Upload & Analyze', href: '/upload', icon: FileUp },
    { label: 'Target Job Match', href: '/match', icon: Target },
    { label: 'Analysis History', href: '/history', icon: History },
    { label: 'Analytics & Trends', href: '/analytics', icon: BarChart3 },
    { label: 'Support & Docs', href: '/support', icon: HelpCircle },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border-subtle bg-bg-primary/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-4 lg:px-8">
        {/* Left Section: Brand & Engine status */}
        <div className="flex items-center gap-4">
          <MobileSidebar />
          <Link
            href={user ? '/dashboard' : '/'}
            className="flex items-center gap-2 group transition-opacity hover:opacity-90"
          >
            <span className="font-display text-xl font-bold tracking-tighter text-text-primary">
              RESUME<span className="text-lime-accent">AI</span>
            </span>
          </Link>

          {/* AI Engine Status Indicator */}
          <div className="hidden sm:flex items-center gap-2 rounded-full border border-border-subtle bg-bg-secondary/60 px-3 py-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-accent"></span>
            </span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-text-secondary flex items-center gap-1">
              Gemini 2.5 Active
            </span>
          </div>
        </div>

        {/* Right Section: Quick Action + Interactive Profile */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Quick Action Button */}
          <Link
            href="/upload"
            className="hidden md:flex items-center gap-1.5 rounded-lg border border-lime-accent/30 bg-lime-accent/10 px-3.5 py-1.5 text-xs font-mono font-medium text-lime-accent hover:bg-lime-accent hover:text-black transition-all"
          >
            <FileUp size={14} />
            <span>New Scan</span>
          </Link>

          {/* Profile Section */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              {/* Profile Trigger Pill */}
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="group flex items-center gap-2.5 rounded-full border border-border-normal bg-bg-secondary/80 p-1 pl-1.5 pr-2.5 hover:border-lime-accent/40 hover:bg-bg-elevated transition-all cursor-pointer shadow-sm focus:outline-none focus:ring-1 focus:ring-lime-accent/40"
                aria-expanded={dropdownOpen}
                aria-haspopup="menu"
              >
                {/* Avatar with Status Dot */}
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-lime-accent/20 to-lime-accent/5 border border-lime-accent/30 text-[11px] font-mono font-bold text-lime-accent shadow-[0_0_10px_rgba(198,255,0,0.12)]">
                  {initials}
                  <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border-2 border-bg-primary"></span>
                  </span>
                </div>

                {/* Name & Role Text */}
                <div className="hidden sm:flex flex-col text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-text-primary tracking-tight max-w-[120px] truncate">
                      {displayName}
                    </span>
                    <ShieldCheck size={12} className="text-lime-accent shrink-0" />
                  </div>
                  <span className="text-[9px] font-mono uppercase tracking-wider text-text-secondary">
                    Candidate Tier
                  </span>
                </div>

                {/* Dropdown Chevron */}
                <ChevronDown
                  size={14}
                  className={`text-text-secondary transition-transform duration-200 group-hover:text-text-primary ${
                    dropdownOpen ? 'rotate-180 text-lime-accent' : ''
                  }`}
                />
              </button>

              {/* Realistic Dropdown Card */}
              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 origin-top-right rounded-xl border border-border-bright bg-bg-secondary/95 backdrop-blur-xl shadow-2xl p-2 z-50 animate-in fade-in-0 zoom-in-95 duration-150">
                  {/* Header: User Info Card */}
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-bg-elevated/70 border border-border-subtle mb-1">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-lime-accent/25 to-lime-accent/5 border border-lime-accent/40 text-xs font-mono font-bold text-lime-accent shadow-[0_0_12px_rgba(198,255,0,0.2)]">
                      {initials}
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-text-primary truncate">
                          {displayName}
                        </span>
                        <span className="inline-flex items-center px-1.5 py-0.2 rounded text-[9px] font-mono font-bold uppercase bg-lime-accent/15 text-lime-accent border border-lime-accent/30">
                          Active
                        </span>
                      </div>
                      <span className="text-[11px] text-text-secondary truncate font-mono">
                        {userEmail}
                      </span>
                    </div>
                  </div>

                  {/* System/Plan Status Pill */}
                  <div className="px-3 py-2 rounded-md bg-bg-primary/50 border border-border-subtle/60 flex items-center justify-between text-[10px] font-mono my-1">
                    <span className="text-text-dim uppercase tracking-wider">AI Access</span>
                    <span className="text-lime-accent font-semibold flex items-center gap-1">
                      <Sparkles size={11} /> Unlimited Gemini
                    </span>
                  </div>

                  <div className="h-px bg-border-subtle my-1.5" />

                  {/* Navigation Links */}
                  <div className="space-y-0.5">
                    {menuItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-text-secondary hover:text-text-primary hover:bg-bg-hover transition-colors"
                      >
                        <item.icon size={15} className="text-text-dim group-hover:text-text-primary" />
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </div>

                  <div className="h-px bg-border-subtle my-1.5" />

                  {/* Sign Out Action */}
                  <button
                    type="button"
                    onClick={() => {
                      setDropdownOpen(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-mono uppercase tracking-wider text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors cursor-pointer text-left"
                  >
                    <LogOut size={15} className="text-red-400" />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="px-3 py-1.5 text-xs font-mono uppercase tracking-wider text-text-secondary hover:text-text-primary transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="rounded-lg bg-lime-accent px-3.5 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-black hover:bg-lime-400 transition-colors"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
