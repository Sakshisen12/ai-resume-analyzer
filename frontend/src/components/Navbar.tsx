import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { MobileSidebar } from '@/components/MobileSidebar';

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border-subtle bg-bg-primary/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-4 lg:px-8">
        <div className="flex items-center gap-4">
          <MobileSidebar />
          <Link href="/dashboard" className="font-display text-xl font-bold tracking-tighter text-text-primary">
            RESUME<span className="text-lime-accent">AI</span>
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden items-center gap-2 md:flex">
            <span className="text-[10px] font-mono uppercase tracking-widest text-text-dim">User</span>
            <span className="text-xs font-bold text-text-primary">{user?.name}</span>
          </div>
          
          <div className="h-8 w-8 rounded-md border border-border-subtle bg-bg-elevated flex items-center justify-center text-[10px] font-mono font-bold text-lime-accent">
            {user?.name?.slice(0, 2).toUpperCase() || 'UI'}
          </div>
        </div>
      </div>
    </nav>
  );
}
