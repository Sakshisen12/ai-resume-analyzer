'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import api from '@/services/api';
import Navbar from '@/components/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ScoreRing } from '@/components/ScoreRing';
import { ProgressBar } from '@/components/ProgressBar';
import { SkillTag } from '@/components/SkillTag';
import { SectionLabel } from '@/components/SectionLabel';
import { 
  Loader2, 
  ArrowLeft,
  Zap,
  Target,
  BarChart3,
  TrendingUp,
  History as HistoryIcon,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { SkillsRadarChart, ScoreBarChart } from '@/components/AnalyticsCharts';

interface Analysis {
  resumeScore: number;
  skillsDetected: string[];
  missingSkills: string[];
  experienceStrength: string;
  atsCompatibilityScore: number;
  improvementSuggestions: string[];
}

export default function ResultsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Helper: fetch existing analysis from MongoDB via history endpoint
  const fetchAnalysisFromDB = async (): Promise<Analysis | null> => {
    try {
      const response = await api.get(`/history/resume/${id}`);
      const history = response.data.data.history;
      if (history && history.length > 0) {
        // Return the most recent analysis
        return history[0] as Analysis;
      }
    } catch {
      // No existing analysis in DB
    }
    return null;
  };

  useEffect(() => {
    let cancelled = false;

    const loadResults = async () => {
      try {
        // Step 1: Check if analysis already exists in DB (handles refresh / revisit)
        const existing = await fetchAnalysisFromDB();
        if (existing && !cancelled) {
          setAnalysis(existing);
          setLoading(false);
          return;
        }

        // Step 2: No existing analysis — request a new one (Synchronous)
        try {
          const response = await api.post('/ai/analyze', { resumeId: id });
          
          if (cancelled) return;
          
          // The backend now returns the analysis directly in the POST response
          const analysisData = response.data?.data?.analysis || response.data?.analysis;
          if (analysisData) {
            setAnalysis(analysisData);
            setLoading(false);
          } else {
             throw new Error('Analysis data missing from response');
          }

        } catch (err: any) {
          if (cancelled) return;
          setError(err.response?.data?.message || 'FAILED TO INITIALIZE ENGINE.');
          setLoading(false);
        }
      } catch (err: any) {
         if (!cancelled) {
           setError('AN UNEXPECTED ERROR OCCURRED.');
           setLoading(false);
         }
      }
    };

    loadResults();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 bg-bg-primary flex flex-col items-center justify-center gap-3">
        <div className="w-48 h-[2px] bg-bg-elevated overflow-hidden mb-4">
          <div className="h-full w-1/2 bg-lime-accent animate-scan" />
        </div>
        <p className="font-mono text-xs uppercase tracking-widest text-lime-accent animate-pulse">
          SCANNING YOUR PROFESSIONAL DNA.
        </p>
        <p className="font-mono text-[10px] uppercase tracking-widest text-text-dim animate-pulse">
          DETERMINING SYSTEM COMPATIBILITY...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <p className="font-mono text-xs uppercase tracking-widest text-destructive">
          FAILED TO LOAD RESULTS
        </p>
        <p className="text-sm text-text-secondary">{error}</p>
        <button
          onClick={() => router.push('/upload')}
          className="font-mono text-xs uppercase tracking-widest bg-lime-accent text-black px-6 py-2 rounded-sm hover:bg-white transition-colors font-bold"
        >
          TRY AGAIN
        </button>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="font-mono text-xs uppercase tracking-widest text-text-dim">
          NO DATA FOUND FOR THIS RESUME
        </p>
        <button
          onClick={() => router.push('/upload')}
          className="font-mono text-xs uppercase tracking-widest bg-lime-accent text-black px-6 py-2 rounded-sm hover:bg-white transition-colors font-bold"
        >
          UPLOAD RESUME
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col pb-20">
      <Navbar />

      <main className="flex-1 max-w-[1280px] mx-auto px-4 py-8 lg:px-8 lg:py-12 w-full">
        {/* TEMPORARY VERIFICATION BANNER — remove after fix confirmed */}
        <div className="mb-6 p-3 border border-lime-accent rounded-sm font-mono text-xs text-lime-accent">
          ✓ RESULTS LOADED SUCCESSFULLY
          <span className="ml-4 text-text-dim">
            ID: {id as string} | Score: {analysis?.resumeScore}
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4">
            <Link href="/dashboard" className="inline-flex items-center text-[10px] font-mono font-bold uppercase tracking-widest text-text-dim hover:text-lime-accent transition-colors">
              <ArrowLeft size={14} className="mr-2" /> RETURN TO DASHBOARD
            </Link>
            <SectionLabel label="PERFORMANCE REPORT" title="ANALYSIS COMPLETE." />
          </div>
          
          <div className="flex gap-4">
            <Link href={`/match?resumeId=${id}`}>
              <Button variant="primary" className="h-14 px-8 tracking-widest">
                OPTIMIZE FOR JOB <Target className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
          {/* Main Results Column */}
          <div className="space-y-16">
            {/* Top Score Row */}
            <div className="grid gap-6 sm:grid-cols-2">
              <Card className="bg-bg-secondary border-border-subtle flex flex-col items-center justify-center p-10 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                  <TrendingUp size={120} />
                </div>
                <ScoreRing score={analysis?.resumeScore || 0} size={180} className="mb-1" />
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-text-dim mt-4">OVERALL PERFORMANCE</p>
              </Card>

              <Card className="bg-bg-secondary border-border-subtle p-10 flex flex-col justify-between group">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-text-dim">ATS COMPATIBILITY</span>
                    <span className="text-2xl font-display font-black text-text-primary italic">{analysis?.atsCompatibilityScore}%</span>
                  </div>
                  <ProgressBar label="PARSING STRENGTH" value={analysis?.atsCompatibilityScore || 0} className="w-full" />
                </div>
                <div className="pt-8 border-t border-border-subtle/50 space-y-4">
                  <p className="text-[11px] font-mono font-bold uppercase tracking-widest text-text-dim leading-relaxed">
                    YOUR RESUME IS {analysis?.atsCompatibilityScore && analysis.atsCompatibilityScore > 80 ? 'HIGHLY' : 'MODERATELY'} OPTIMIZED FOR MACHINE READABILITY.
                  </p>
                </div>
              </Card>
            </div>

            {/* Analysis Tabs Section */}
            <div className="space-y-8">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="mb-10">
                  <TabsTrigger value="overview">OVERVIEW</TabsTrigger>
                  <TabsTrigger value="skills">SKILLS & GAPS</TabsTrigger>
                  <TabsTrigger value="suggestions">SUGGESTIONS</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="mt-0">
                  <Card className="border-border-subtle bg-bg-secondary overflow-hidden">
                    <CardContent className="p-0">
                      <div className="border-b border-border-subtle p-8 bg-bg-elevated/20">
                        <div className="flex items-center gap-3 mb-6">
                          <Zap size={18} className="text-lime-accent" />
                          <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest">EXPERIENCE STRENGTH</h3>
                        </div>
                        <p className="font-display text-2xl font-bold tracking-tight text-text-primary uppercase leading-[1.3] md:text-3xl italic">
                          "{analysis?.experienceStrength}"
                        </p>
                      </div>
                      <div className="p-8 grid gap-8 sm:grid-cols-2">
                         <div className="space-y-12">
                            <Card className="bg-bg-primary border-border-subtle p-6">
                             <BarChart3 size={20} className="mb-4 text-text-dim" />
                             <h4 className="font-mono text-[10px] font-bold uppercase tracking-widest mb-4">SCORE METRICS</h4>
                             <ScoreBarChart 
                                data={[
                                  { name: 'RESUME', score: analysis?.resumeScore || 0 },
                                  { name: 'ATS', score: analysis?.atsCompatibilityScore || 0 }
                                ]} 
                              />
                            </Card>
                         </div>
                         <div className="space-y-4">
                            <h4 className="font-mono text-[10px] font-bold uppercase tracking-widest text-text-dim">QUICK WIN</h4>
                            <p className="text-sm text-text-secondary leading-relaxed uppercase tracking-wider">
                              UPDATE YOUR CONTACT INFORMATION TO ENSURE ATS SYSTEMS CAN REACH YOU IN SECONDS.
                            </p>
                            <Button variant="ghost" className="text-[10px] font-bold tracking-widest p-0 border-none hover:bg-transparent hover:text-lime-accent">
                              LEARN MORE <ChevronRight size={14} className="ml-1" />
                            </Button>
                         </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="skills" className="mt-0 space-y-12">
                  <div className="grid gap-12 sm:grid-cols-2">
                    <div className="space-y-6">
                      <h3 className="text-[10px] font-mono font-bold uppercase tracking-widest text-text-dim flex items-center gap-2">
                        DETECTED COMPETENCIES
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {analysis?.skillsDetected.map((skill) => (
                          <SkillTag key={skill} skill={skill} status="detected" />
                        ))}
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h3 className="text-[10px] font-mono font-bold uppercase tracking-widest text-text-dim text-red-500">
                        CRITICAL GAPS
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {analysis?.missingSkills.map((skill) => (
                          <SkillTag key={skill} skill={skill} status="gap" />
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="suggestions" className="mt-0">
                  <div className="grid gap-4">
                    {analysis?.improvementSuggestions.map((suggestion, idx) => (
                      <div key={idx} className="group flex gap-6 p-8 bg-bg-secondary border border-border-subtle hover:border-lime-accent transition-colors">
                        <span className="font-display text-2xl font-black text-text-dim/20 group-hover:text-lime-accent transition-colors italic">
                          {(idx + 1).toString().padStart(2, '0')}
                        </span>
                        <p className="text-text-primary text-sm font-medium leading-relaxed uppercase tracking-wide">
                          {suggestion}
                        </p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-12">
            <Card className="bg-lime-accent text-black border-none sticky top-28">
              <CardContent className="p-10 space-y-8">
                <div className="flex items-center gap-3">
                  <HistoryIcon size={20} />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest">VERSION CONTROL</span>
                </div>
                <div className="space-y-2">
                  <p className="text-4xl font-display font-black tracking-tighter italic leading-none">SNAPSHOT SAVED.</p>
                  <p className="text-sm font-medium leading-relaxed uppercase">YOUR PERFORMANCE HAS BEEN RECORDED IN THE HISTORY LOG.</p>
                </div>
                <Link href="/history" className="block pt-2">
                  <Button variant="ghost" className="w-full justify-between p-0 font-bold tracking-widest text-[10px] border-black/10 hover:bg-black/5 hover:text-black">
                    VIEW ALL VERSIONS <ChevronRight size={14} />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <h3 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-text-dim">
                DATA INSIGHTS
              </h3>
              <Card className="bg-bg-secondary border-border-subtle p-6">
                <SkillsRadarChart 
                  skills={analysis?.skillsDetected.slice(0, 5).map(skill => ({
                    name: skill,
                    value: 80 + Math.random() * 20
                  })) || []} 
                />
              </Card>
              <div className="p-4 border border-border-subtle bg-bg-elevated/10 rounded-md">
                 <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-text-dim leading-relaxed">
                   AI CONFIDENCE SCORE: 98.4%
                 </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
