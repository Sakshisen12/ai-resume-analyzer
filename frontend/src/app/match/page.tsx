'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/services/api';
import Navbar from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { BottomNav } from '@/components/BottomNav';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScoreRing } from '@/components/ScoreRing';
import { SkillTag } from '@/components/SkillTag';
import { SectionLabel } from '@/components/SectionLabel';
import { 
  Loader2, 
  Target, 
  ArrowLeft,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Target as TargetIcon
} from 'lucide-react';

interface JobMatch {
  matchScore: number;
  missingKeywords: string[];
  skillGapAnalysis: string;
  recommendations: string[];
}

function JobMatchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const resumeId = searchParams.get('resumeId');
  
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<JobMatch | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!resumeId) {
      router.push('/dashboard');
    }
  }, [resumeId, router]);

  const handleMatch = async () => {
    if (!jobDescription || !resumeId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await api.post('/job/match', {
        resumeId,
        jobDescription
      });
      setResult(response.data.data.jobMatch);
    } catch (err: any) {
      setError(err.response?.data?.message || 'MATCHING FAILED. ENGINE TIMEOUT.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary lg:flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 max-w-[1280px] mx-auto px-4 py-8 lg:px-8 lg:py-12 w-full pb-28 lg:pb-12">
          <div className="flex flex-col gap-12">
            <div className="space-y-4">
              <Link href="/dashboard" className="inline-flex items-center text-[10px] font-mono font-bold uppercase tracking-widest text-text-dim hover:text-lime-accent transition-colors">
                <ArrowLeft size={14} className="mr-2" /> RETURN TO SYSTEM 
              </Link>
              <SectionLabel label="JOB MATCHING ENGINE" title="OPTIMIZE FOR TARGET." />
            </div>

            <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
              {/* Input Area */}
              <div className="space-y-8">
                <Card className="bg-bg-secondary border-border-subtle overflow-hidden">
                  <div className="border-b border-border-subtle p-6 bg-bg-elevated/10">
                    <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest text-text-dim">TARGET JOB DESCRIPTION</h3>
                  </div>
                  <CardContent className="p-0">
                    <Textarea 
                      placeholder="PASTE THE FULL JOB DESCRIPTION HERE..."
                      className="min-h-[450px] border-none bg-transparent p-8 font-light text-text-primary leading-relaxed resize-none focus-visible:ring-0"
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                    />
                    <div className="p-6 border-t border-border-subtle flex justify-end">
                      <Button 
                        variant="primary" 
                        className="h-14 px-10 tracking-widest"
                        onClick={handleMatch}
                        disabled={loading || !jobDescription}
                      >
                        {loading ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            CALCULATING...
                          </>
                        ) : (
                          <>
                            START MATCHING <Sparkles className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {error && (
                  <div className="p-6 border border-red-500/30 bg-red-500/5 text-red-500 font-mono text-[10px] uppercase tracking-widest leading-relaxed">
                    CRITICAL: {error}
                  </div>
                )}
              </div>

              {/* Results Area */}
              <div className="space-y-8">
                <AnimatePresence mode="wait">
                  {!result ? (
                    <motion.div 
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="h-full border border-dashed border-border-subtle rounded-none p-12 text-center flex flex-col items-center justify-center space-y-6 bg-bg-secondary/20"
                    >
                      <div className="p-6 border border-border-subtle rounded-full text-text-dim">
                        <TargetIcon size={32} />
                      </div>
                      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-text-dim leading-relaxed max-w-[200px]">
                        AWAITING INPUT DATA. START ENGINE TO VIEW METRICS.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="results"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-8"
                    >
                      <Card className="bg-bg-secondary border-border-subtle flex flex-col items-center justify-center p-10 text-center">
                        <ScoreRing score={result.matchScore} size={150} className="mb-4" />
                        <h4 className="font-display text-4xl font-black text-text-primary italic">
                          {result.matchScore > 70 ? 'LOCKED IN.' : 'NEEDS WORK.'}
                        </h4>
                        <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-lime-accent mt-2">MATCH COMPATIBILITY</p>
                      </Card>

                      <div className="space-y-4">
                        <h4 className="font-mono text-[10px] font-bold uppercase tracking-widest text-text-dim">CRITICAL GAP ANALYSIS</h4>
                        <div className="p-6 bg-bg-secondary border border-border-subtle">
                           <p className="text-sm font-medium leading-relaxed text-text-primary uppercase tracking-wide">
                             "{result.skillGapAnalysis}"
                           </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-mono text-[10px] font-bold uppercase tracking-widest text-text-dim text-red-500">MISSING KEYWORDS</h4>
                        <div className="flex flex-wrap gap-2">
                          {result.missingKeywords.length > 0 ? (
                            result.missingKeywords.map(keyword => (
                              <SkillTag key={keyword} skill={keyword} status="gap" />
                            ))
                          ) : (
                            <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-lime-accent uppercase tracking-widest">
                              <ShieldCheck size={14} /> ALL PRIMARY KEYWORDS DETECTED.
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="space-y-6">
                        <h4 className="font-mono text-[10px] font-bold uppercase tracking-widest text-text-dim">OPTIMIZATION STRATEGY</h4>
                        <div className="grid gap-3">
                          {result.recommendations.map((rec, i) => (
                            <div key={i} className="flex gap-4 p-5 bg-bg-elevated/30 border border-border-subtle group hover:border-lime-accent transition-colors">
                              <ChevronRight size={16} className="text-lime-accent shrink-0 mt-0.5" />
                              <p className="text-xs font-medium text-text-secondary uppercase tracking-wider leading-relaxed">{rec}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </main>
        <BottomNav />
      </div>
    </div>
  );
}

export default function JobMatchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center p-8">
        <Loader2 className="h-10 w-10 animate-spin text-lime-accent" />
        <p className="mt-6 font-mono text-[10px] font-bold uppercase tracking-widest text-text-dim">SYNCHRONIZING SYSTEM...</p>
      </div>
    }>
      <JobMatchContent />
    </Suspense>
  );
}
