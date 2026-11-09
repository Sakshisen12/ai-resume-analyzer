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
  ShieldAlert,
  Zap,
  RotateCcw,
  FileText,
  CheckCircle2,
  AlertCircle,
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
  const [showEdit, setShowEdit] = useState(false);

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
      setShowEdit(false);
    } catch (err: any) {
      setError(err.response?.data?.message || 'MATCHING FAILED. ENGINE TIMEOUT.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary lg:flex">
      <Sidebar />
      <div className="flex-1 flex flex-col lg:pl-[240px]">
        <Navbar />
        <main className="flex-1 max-w-[1280px] mx-auto px-4 py-8 lg:px-8 lg:py-12 w-full pb-28 lg:pb-12">
          <div className="flex flex-col gap-10">
            {/* Header / Navigation */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-4">
                <Link 
                  href={`/results/${resumeId}`} 
                  className="inline-flex items-center text-[10px] font-mono font-bold uppercase tracking-widest text-text-dim hover:text-lime-accent transition-colors"
                >
                  <ArrowLeft size={14} className="mr-2" /> RETURN TO RESUME REPORT
                </Link>
                <SectionLabel label="JOB MATCHING ENGINE" title="OPTIMIZE FOR TARGET ROLE." />
              </div>

              {result && (
                <div className="flex gap-3">
                  <Button 
                    variant="secondary" 
                    className="h-11 px-5 text-xs font-mono tracking-widest"
                    onClick={() => setShowEdit(!showEdit)}
                  >
                    <RotateCcw className="mr-2 h-4 w-4" /> 
                    {showEdit ? 'HIDE JOB INPUT' : 'EDIT JOB DESCRIPTION'}
                  </Button>
                  <Link href={`/results/${resumeId}`}>
                    <Button variant="primary" className="h-11 px-5 text-xs font-mono tracking-widest">
                      VIEW REPORT <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Error Banner */}
            {error && (
              <div className="p-4 border border-red-500/30 bg-red-500/10 text-red-400 font-mono text-xs rounded-md flex items-center gap-3">
                <AlertCircle size={18} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Input Form (Shown if !result OR if user clicks 'Edit Job Description') */}
            {(!result || showEdit) && (
              <Card className="bg-bg-secondary border-border-subtle overflow-hidden">
                <div className="border-b border-border-subtle p-6 bg-bg-elevated/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText size={18} className="text-lime-accent" />
                    <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-text-primary">
                      TARGET JOB DESCRIPTION
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-text-dim uppercase tracking-wider">
                    {jobDescription.length} characters
                  </span>
                </div>
                <CardContent className="p-6">
                  <Textarea 
                    placeholder="Paste the full job description or requirements here (role responsibilities, required skills, qualifications)..."
                    className="min-h-[260px] border border-border-subtle bg-bg-primary/50 p-6 font-body text-sm text-text-primary leading-relaxed resize-y focus-visible:ring-1 focus-visible:ring-lime-accent"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                  />
                  <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-text-dim">
                      Gemini AI will perform a semantic keyword match & gap analysis against your uploaded resume.
                    </p>
                    <Button 
                      variant="primary" 
                      className="h-12 px-8 tracking-widest text-xs w-full sm:w-auto"
                      onClick={handleMatch}
                      disabled={loading || !jobDescription.trim()}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ANALYZING MATCH...
                        </>
                      ) : (
                        <>
                          START MATCHING <Sparkles className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Match Results Display (Full Width Layout) */}
            {result && (
              <div className="space-y-8">
                {/* Row 1: Score Card + Critical Gap Analysis Card */}
                <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
                  {/* Match Score Card */}
                  <Card className="bg-bg-secondary border-border-subtle flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
                    <ScoreRing score={result.matchScore} size={160} className="mb-2" />
                    <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-text-dim mt-2">
                      MATCH COMPATIBILITY
                    </p>
                    <span className="mt-3 px-3 py-1 bg-lime-accent/10 border border-lime-accent/30 text-lime-accent text-[10px] font-mono font-bold tracking-widest uppercase rounded-full">
                      {result.matchScore >= 80 ? 'EXCELLENT ALIGNMENT' : result.matchScore >= 60 ? 'COMPETITIVE FIT' : 'SIGNIFICANT GAPS'}
                    </span>
                  </Card>

                  {/* Critical Gap Analysis Card */}
                  <Card className="bg-bg-secondary border-border-subtle overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-border-subtle bg-bg-elevated/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Zap size={18} className="text-lime-accent" />
                        <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-text-primary">
                          CRITICAL GAP ANALYSIS
                        </h3>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-bg-elevated text-[10px] font-mono font-bold text-text-dim">
                        AI EVALUATION
                      </span>
                    </div>
                    <CardContent className="p-6 lg:p-8 flex-1 flex flex-col justify-center">
                      <p className="font-body text-base lg:text-lg text-text-secondary leading-relaxed border-l-2 border-lime-accent pl-5 py-2">
                        {result.skillGapAnalysis}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Row 2: Missing Keywords & Competencies */}
                <Card className="bg-bg-secondary border-border-subtle overflow-hidden">
                  <div className="p-6 border-b border-border-subtle bg-bg-elevated/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {result.missingKeywords.length > 0 ? (
                        <ShieldAlert size={18} className="text-red-400" />
                      ) : (
                        <ShieldCheck size={18} className="text-lime-accent" />
                      )}
                      <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-text-primary">
                        MISSING TARGET KEYWORDS & TOOLS
                      </h3>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold ${
                      result.missingKeywords.length > 0 
                        ? 'bg-red-500/10 border border-red-500/30 text-red-400' 
                        : 'bg-lime-accent/10 border border-lime-accent/30 text-lime-accent'
                    }`}>
                      {result.missingKeywords.length > 0 ? `${result.missingKeywords.length} KEYWORDS MISSING` : 'ALL DETECTED'}
                    </span>
                  </div>
                  <CardContent className="p-6 lg:p-8">
                    {result.missingKeywords.length > 0 ? (
                      <div className="space-y-6">
                        <p className="text-xs text-text-secondary leading-relaxed">
                          The target job description places emphasis on these keywords which are not currently detected in your resume:
                        </p>
                        <div className="flex flex-wrap gap-2.5">
                          {result.missingKeywords.map(keyword => (
                            <SkillTag key={keyword} skill={keyword} status="gap" />
                          ))}
                        </div>
                        <div className="p-4 rounded-md bg-bg-primary/50 border border-border-subtle flex items-start gap-3">
                          <CheckCircle2 size={16} className="text-lime-accent shrink-0 mt-0.5" />
                          <p className="text-xs text-text-dim leading-relaxed">
                            Recommendation: Work these tools and terms directly into your project descriptions and bullet points to maximize ATS match scores.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="p-6 text-center space-y-2">
                        <ShieldCheck size={32} className="text-lime-accent mx-auto" />
                        <p className="text-sm font-bold text-text-primary">
                          All Primary Target Keywords Detected!
                        </p>
                        <p className="text-xs text-text-dim max-w-md mx-auto">
                          Your resume already covers the essential technical requirements and tools mentioned in this posting.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Row 3: Optimization Strategy & Tailoring Recommendations */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Sparkles size={18} className="text-lime-accent" />
                    <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-text-dim">
                      TAILORING RECOMMENDATIONS ({result.recommendations.length} STEPS)
                    </h3>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {result.recommendations.map((rec, i) => (
                      <Card 
                        key={i} 
                        className="bg-bg-secondary border-border-subtle hover:border-lime-accent transition-all duration-200 p-6 flex flex-col justify-between"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="font-display text-2xl font-black text-lime-accent/50 italic">
                              {(i + 1).toString().padStart(2, '0')}
                            </span>
                            <span className="px-2 py-0.5 rounded bg-bg-elevated border border-border-subtle text-[9px] font-mono text-text-dim uppercase tracking-wider">
                              Strategy {i + 1}
                            </span>
                          </div>
                          <p className="text-xs lg:text-sm font-normal text-text-secondary leading-relaxed">
                            {rec}
                          </p>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}
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
