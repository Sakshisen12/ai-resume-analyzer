import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';

export default function LogoutPage() {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
  }, [logout]);

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center p-8">
      <Loader2 className="h-10 w-10 animate-spin text-lime-accent mb-4" />
      <p className="font-mono text-xs uppercase tracking-widest text-text-dim">
        LOGGING OUT OF SYSTEM...
      </p>
    </div>
  );
}
