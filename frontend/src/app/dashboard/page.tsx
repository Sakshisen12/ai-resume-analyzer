'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import api from '@/services/api';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScoreRing } from '@/components/ScoreRing';
import { 
  Plus, 
  ArrowRight, 
  Loader2, 
  FileQuestion, 
  History as HistoryIcon,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface Resume {
  _id: string;
  filename: string;
  uploadDate: string;
  latestScore?: number;
}

export default function DashboardPage() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await api.get('/resume');
        setResumes(response.data.data.resumes);
      } catch (err) {
        console.error('Failed to fetch resumes', err);
      } finally {
        setLoading(false);
      }
    };
    fetchResumes();
  }, []);

  return (
    <div className="px-4 py-8 lg:px-8 lg:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 xl:gap-12">
        {/* Main Content (70%) */}
        <div className="space-y-10">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-2"
          >
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-lime-accent">
              DASHBOARD OVERVIEW
            </span>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <h1 className="font-display text-5xl font-bold tracking-tighter text-text-primary">
                HELLO, {user?.name?.split(' ')[0].toUpperCase()}—
              </h1>
              <Link href="/upload">
                <Button variant="primary" className="h-12 px-6 tracking-widest">
                  UPLOAD NEW <Plus className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {loading ? (
            <div className="flex h-64 items-center justify-center border border-border-subtle bg-bg-secondary/30">
              <Loader2 className="h-8 w-8 animate-spin text-text-dim" />
            </div>
          ) : resumes.length === 0 ? (
            <Card className="border-dashed py-20 text-center bg-bg-secondary/20">
              <CardContent className="flex flex-col items-center gap-8">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-border-subtle bg-bg-elevated text-text-dim">
                  <FileQuestion size={32} />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display text-2xl font-bold tracking-tight">NO RESUMES FOUND.</h3>
                  <p className="max-w-xs text-xs font-mono uppercase tracking-widest text-text-dim">
                    UPLOAD YOUR FIRST RESUME TO START THE ANALYSIS.
                  </p>
                </div>
                <Link href="/upload">
                  <Button variant="secondary" className="px-8 tracking-widest">
                    INITIAL UPLOAD
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              <div className="flex items-center justify-between border-b border-border-subtle pb-4">
                <h2 className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-text-dim">
                  RECENT ANALYSES ({resumes.length})
                </h2>
              </div>
              
              <div className="grid gap-4 sm:grid-cols-2">
                {resumes.map((resume, index) => (
                  <motion.div
                    key={resume._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="group h-full bg-bg-secondary border-border-subtle hover:border-lime-accent/50 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between gap-4 mb-6">
                          <div className="flex flex-col gap-1 min-w-0">
                            <span className="truncate font-display text-lg font-bold tracking-tight text-text-primary">
                              {resume.filename}
                            </span>
                            <span className="text-[10px] font-mono text-text-dim uppercase tracking-wider">
                              UP: {new Date(resume.uploadDate).toLocaleDateString()}
                            </span>
                          </div>
                          <ScoreRing score={resume.latestScore || 0} size={70} animated={false} className="shrink-0" />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 mt-auto pt-4 border-t border-border-subtle/50">
                          <Link href={`/results/${resume._id}`}>
                            <Button variant="ghost" className="w-full text-[10px] font-bold tracking-widest h-8 px-0 border border-border-subtle hover:bg-bg-elevated hover:text-text-primary">
                              RESULTS
                            </Button>
                          </Link>
                          <Link href={`/match?resumeId=${resume._id}`}>
                            <Button variant="ghost" className="w-full text-[10px] font-bold tracking-widest h-8 px-0 border border-border-subtle hover:bg-bg-elevated hover:text-lime-accent">
                              MATCH
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar/Stats (30%) */}
        <div className="space-y-10 lg:sticky lg:top-28 h-fit">
          <Card className="bg-lime-accent text-black border-none">
            <CardContent className="p-8 space-y-6">
              <div className="flex items-center gap-3">
                <TrendingUp size={20} />
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest">PERFORMANCE</span>
              </div>
              <div className="space-y-1">
                <p className="text-4xl font-display font-black tracking-tighter italic">LOCKED IN.</p>
                <p className="text-sm font-medium leading-tight">Your average score is 12% higher than last month.</p>
              </div>
              <Link href="/analytics" className="block pt-2">
                <Button variant="ghost" className="w-full justify-between p-0 font-bold tracking-widest text-[10px] border-black/10 hover:bg-black/5 hover:text-black">
                  VIEW REPORT <ArrowRight size={14} />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <h3 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-text-dim">
              SYSTEM STATUS
            </h3>
            <div className="space-y-4">
              {[
                { label: "GEMINI 2.0 FLASH", status: "ACTIVE" },
                { label: "ATS PARSER V4", status: "ONLINE" },
                { label: "CREDITS REMAINING", status: "UNLIMITED" },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between border-b border-border-subtle pb-3">
                  <span className="text-[10px] font-mono text-text-secondary">{s.label}</span>
                  <span className="text-[10px] font-mono font-bold text-lime-accent">{s.status}</span>
                </div>
              ))}
            </div>
          </div>

          <Card className="bg-bg-secondary border-border-subtle">
            <CardContent className="p-6 space-y-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-md border border-border-subtle bg-bg-elevated text-text-primary">
                <HistoryIcon size={18} />
              </div>
              <div className="space-y-1">
                <h4 className="font-display font-bold text-text-primary uppercase tracking-tight">VERSION CONTROL</h4>
                <p className="text-[10px] text-text-secondary leading-relaxed uppercase tracking-wider">TRACK EVERY CHANGE IN YOUR PROFESSIONAL NARRATIVE.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
