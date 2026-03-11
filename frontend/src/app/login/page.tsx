'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import api from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, data } = response.data;
      login(token, { id: data.user.id, name: data.user.name, email: data.user.email });
    } catch (err: any) {
      setError(err.response?.data?.message || 'AUTHORIZATION FAILED. INVALID CREDENTIALS.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary px-4 py-20 relative overflow-hidden">
      {/* Editorial Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <h1 className="font-display text-[25vw] font-black leading-none text-bg-elevated/5 italic tracking-tighter uppercase">
          LOCKED&nbsp;IN.
        </h1>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md z-10"
      >
        <div className="space-y-12">
          <div className="text-center space-y-4">
             <Link href="/" className="inline-block">
               <span className="font-display text-4xl font-black text-text-primary italic tracking-tight uppercase group">
                 RESUME<span className="text-lime-accent">AI.</span>
               </span>
             </Link>
             <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-text-dim">AUTHORIZED ACCESS ONLY</p>
          </div>

          <Card className="bg-bg-secondary border-border-subtle shadow-[0_32px_64px_-12px_rgba(0,0,0,0.8)]">
            <CardContent className="p-8 lg:p-12">
              <form onSubmit={handleSubmit} className="space-y-8">
                {error && (
                  <div className="p-4 border border-red-500/30 bg-red-500/5 text-red-500 font-mono text-[10px] uppercase tracking-widest leading-relaxed">
                    ERROR: {error}
                  </div>
                )}
                
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="email" className="font-mono text-[10px] font-bold uppercase tracking-widest text-text-dim ml-1">USER IDENTIFIER</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="NAME@SYSTEM.COM"
                      required
                      autoComplete="email"
                      className="h-14 px-5 bg-bg-elevated/20 border-border-subtle hover:border-text-dim transition-colors uppercase font-mono text-xs tracking-widest"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center px-1">
                      <Label htmlFor="password" className="font-mono text-[10px] font-bold uppercase tracking-widest text-text-dim">SECRET KEY</Label>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      required
                      autoComplete="current-password"
                      className="h-14 px-5 bg-bg-elevated/20 border-border-subtle hover:border-text-dim transition-colors"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  variant="primary"
                  className="w-full h-16 text-xs tracking-[0.2em]"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      AUTHENTICATING...
                    </>
                  ) : (
                    <>
                      INITIALIZE SESSION <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <p className="text-center font-mono text-[10px] font-bold uppercase tracking-widest text-text-dim">
            NEW SYSTEM ENTITY?{' '}
            <Link href="/signup" className="text-text-primary hover:text-lime-accent transition-colors border-b border-text-dim hover:border-lime-accent">
              CREATE IDENTITY
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
