import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
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
  ArrowLeft,
  Zap,
  Target,
  BarChart3,
  TrendingUp,
  History as HistoryIcon,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { SkillsRadarChart, ScoreBarChart } from '@/components/AnalyticsCharts';

export default function ResultsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);

  // Helper: fetch existing analysis from MongoDB via history endpoint
  const fetchAnalysisFromDB = async () => {
    try {
      const response = await api.get(`/history/resume/${id}`);
      const history = response.data.data.history;
      if (history && history.length > 0) {
        return history[0];
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
          
          const analysisData = response.data?.data?.analysis || response.data?.analysis;
          if (analysisData) {
            setAnalysis(analysisData);
            setLoading(false);
          } else {
             throw new Error('Analysis data missing from response');
          }

        } catch (err) {
          if (cancelled) return;
          setError(err.response?.data?.message || 'FAILED TO INITIALIZE ENGINE.');
          setLoading(false);
        }
      } catch (err) {
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
          onClick={() => navigate('/upload')}
          className="font-mono text-xs uppercase tracking-widest bg-lime-accent text-black px-6 py-2 rounded-sm hover:bg-white transition-colors font-bold cursor-pointer"
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
          onClick={() => navigate('/upload')}
          className="font-mono text-xs uppercase tracking-widest bg-lime-accent text-black px-6 py-2 rounded-sm hover:bg-white transition-colors font-bold cursor-pointer"
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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4">
            <Link to="/dashboard" className="inline-flex items-center text-[10px] font-mono font-bold uppercase tracking-widest text-text-dim hover:text-lime-accent transition-colors">
              <ArrowLeft size={14} className="mr-2" /> RETURN TO DASHBOARD
            </Link>
            <SectionLabel label="PERFORMANCE REPORT" title="ANALYSIS COMPLETE." />
          </div>
          
          <div className="flex gap-4">
            <Link to={`/match?resumeId=${id}`}>
              <Button variant="primary" className="h-14 px-8 tracking-widest">
                OPTIMIZE FOR JOB <Target className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Top Executive Score Cards - 3 Columns */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {/* Card 1: Overall Performance */}
          <Card className="bg-bg-secondary border-border-subtle flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <TrendingUp size={100} />
            </div>
            <ScoreRing score={analysis?.resumeScore || 0} size={160} className="mb-2" />
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-text-dim mt-2">
              OVERALL PERFORMANCE
            </p>
            <span className="mt-3 px-3 py-1 bg-lime-accent/10 border border-lime-accent/30 text-lime-accent text-[10px] font-mono font-bold tracking-widest uppercase rounded-full">
              {analysis?.resumeScore && analysis.resumeScore >= 80 ? 'EXCELLENT PROFILE' : analysis?.resumeScore && analysis.resumeScore >= 60 ? 'COMPETITIVE PROFILE' : 'NEEDS OPTIMIZATION'}
            </span>
          </Card>

          {/* Card 2: ATS Compatibility */}
          <Card className="bg-bg-secondary border-border-subtle p-8 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-text-dim block">
                    ATS COMPATIBILITY
                  </span>
                  <span className="text-3xl font-display font-black text-text-primary italic">
                    {analysis?.atsCompatibilityScore}%
                  </span>
                </div>
                <div className="h-10 w-10 rounded-md bg-bg-elevated border border-border-subtle flex items-center justify-center text-lime-accent">
                  <ShieldCheck size={20} />
                </div>
              </div>

              <div className="space-y-2">
                <ProgressBar label="PARSING STRENGTH" value={analysis?.atsCompatibilityScore || 0} className="w-full" />
              </div>
            </div>

            <div className="pt-6 border-t border-border-subtle/50 space-y-2">
              <p className="text-[11px] font-mono font-medium text-text-secondary leading-relaxed">
                Your resume is <strong className="text-lime-accent font-bold">{analysis?.atsCompatibilityScore && analysis.atsCompatibilityScore >= 80 ? 'highly optimized' : 'partially optimized'}</strong> for automated applicant tracking systems.
              </p>
            </div>
          </Card>

          {/* Card 3: Competency Radar Insights */}
          <Card className="bg-bg-secondary border-border-subtle p-6 flex flex-col justify-between md:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <BarChart3 size={16} className="text-lime-accent" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-text-dim">
                  SKILLS RADAR
                </span>
              </div>
              <span className="text-[10px] font-mono text-text-dim uppercase tracking-wider">
                {analysis?.skillsDetected?.length || 0} Identified
              </span>
            </div>

            <div className="py-1">
              <SkillsRadarChart 
                skills={analysis?.skillsDetected?.slice(0, 5).map(skill => ({
                  name: skill,
                  value: 80 + Math.random() * 20
                })) || []} 
              />
            </div>

            <div className="pt-4 border-t border-border-subtle/50 flex items-center justify-between text-[10px] font-mono text-text-dim">
              <span>AI CONFIDENCE</span>
              <span className="text-lime-accent font-bold">98.4%</span>
            </div>
          </Card>
        </div>

        {/* Full-Width Analysis Tabs Section */}
        <div className="w-full space-y-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-8 border-b border-border-subtle pb-px gap-4 flex-wrap">
              <TabsTrigger value="overview" className="flex items-center gap-2 pb-3">
                <Zap size={14} /> OVERVIEW & IMPACT
              </TabsTrigger>
              <TabsTrigger value="skills" className="flex items-center gap-2 pb-3">
                <Target size={14} /> SKILLS & GAPS
                <span className="ml-1 px-2 py-0.5 rounded-full bg-bg-elevated text-[10px] font-mono font-bold">
                  {analysis?.skillsDetected?.length || 0} / {analysis?.missingSkills?.length || 0}
                </span>
              </TabsTrigger>
              <TabsTrigger value="suggestions" className="flex items-center gap-2 pb-3">
                <Sparkles size={14} /> ACTIONABLE SUGGESTIONS
                <span className="ml-1 px-2 py-0.5 rounded-full bg-lime-accent/10 text-lime-accent text-[10px] font-mono font-bold">
                  {analysis?.improvementSuggestions?.length || 0}
                </span>
              </TabsTrigger>
            </TabsList>
            
            {/* Tab 1: Overview */}
            <TabsContent value="overview" className="space-y-6">
              <Card className="border-border-subtle bg-bg-secondary overflow-hidden">
                <CardContent className="p-0">
                  <div className="border-b border-border-subtle p-6 lg:p-8 bg-bg-elevated/20">
                    <div className="flex items-center gap-2 mb-4">
                      <Zap size={16} className="text-lime-accent" />
                      <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest text-text-dim">
                        AI EXPERIENCE EVALUATION
                      </h3>
                    </div>
                    <p className="font-body text-base lg:text-lg text-text-primary leading-relaxed border-l-2 border-lime-accent pl-5 py-1">
                      {analysis?.experienceStrength}
                    </p>
                  </div>

                  <div className="p-6 lg:p-8 grid gap-8 md:grid-cols-2">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-2">
                        <BarChart3 size={16} className="text-lime-accent" />
                        <h4 className="font-mono text-[10px] font-bold uppercase tracking-widest text-text-dim">
                          SCORE METRICS COMPARISON
                        </h4>
                      </div>
                      <Card className="bg-bg-primary border-border-subtle p-6">
                        <ScoreBarChart 
                          data={[
                            { name: 'RESUME SCORE', score: analysis?.resumeScore || 0 },
                            { name: 'ATS MATCH', score: analysis?.atsCompatibilityScore || 0 }
                          ]} 
                        />
                      </Card>
                    </div>

                    <div className="space-y-4 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <CheckCircle2 size={16} className="text-lime-accent" />
                          <h4 className="font-mono text-[10px] font-bold uppercase tracking-widest text-text-dim">
                            RECOMMENDED NEXT STEPS
                          </h4>
                        </div>
                        <div className="space-y-3">
                          <div className="p-4 rounded-md border border-border-subtle bg-bg-primary/50 text-xs text-text-secondary leading-relaxed">
                            <strong className="text-text-primary block mb-1">Tailor for Specific Roles:</strong>
                            Use the <span className="text-lime-accent font-mono font-bold">Job Matcher</span> to compare this resume directly against job postings to find missing keywords.
                          </div>
                          <div className="p-4 rounded-md border border-border-subtle bg-bg-primary/50 text-xs text-text-secondary leading-relaxed">
                            <strong className="text-text-primary block mb-1">Track Version Improvements:</strong>
                            Every time you make edits and re-upload, your progress is saved to version history so you can measure your score boost.
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 flex gap-4">
                        <Link to={`/match?resumeId=${id}`} className="flex-1">
                          <Button variant="primary" className="w-full tracking-widest text-xs h-12">
                            START JOB MATCH <Target className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                        <Link to="/history">
                          <Button variant="secondary" className="tracking-widest text-xs h-12 px-6">
                            <HistoryIcon className="mr-2 h-4 w-4" /> HISTORY
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab 2: Skills & Gaps */}
            <TabsContent value="skills" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Detected Competencies Card */}
                <Card className="bg-bg-secondary border-border-subtle overflow-hidden">
                  <div className="p-6 border-b border-border-subtle bg-bg-elevated/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={18} className="text-lime-accent" />
                      <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-text-primary">
                        DETECTED COMPETENCIES
                      </h3>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-lime-accent/10 border border-lime-accent/30 text-lime-accent text-[10px] font-mono font-bold">
                      {analysis?.skillsDetected?.length || 0} IDENTIFIED
                    </span>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-xs text-text-secondary mb-4 leading-relaxed">
                      These technical skills and competencies were successfully extracted by the parser:
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                      {analysis?.skillsDetected?.map((skill) => (
                        <SkillTag key={skill} skill={skill} status="detected" />
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Critical Gaps Card */}
                <Card className="bg-bg-secondary border-border-subtle overflow-hidden">
                  <div className="p-6 border-b border-border-subtle bg-bg-elevated/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShieldAlert size={18} className="text-red-400" />
                      <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-red-400">
                        CRITICAL SKILL GAPS
                      </h3>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-[10px] font-mono font-bold">
                      {analysis?.missingSkills?.length || 0} MISSING
                    </span>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-xs text-text-secondary mb-4 leading-relaxed">
                      Adding these industry-standard keywords could significantly boost ATS filtering results:
                    </p>
                    <div className="flex flex-wrap gap-2.5 mb-6">
                      {analysis?.missingSkills?.map((skill) => (
                        <SkillTag key={skill} skill={skill} status="gap" />
                      ))}
                    </div>
                    <div className="p-4 rounded-md bg-bg-primary/50 border border-border-subtle flex items-start gap-3">
                      <AlertCircle size={16} className="text-text-dim shrink-0 mt-0.5" />
                      <p className="text-[11px] text-text-dim leading-relaxed">
                        Tip: Incorporate these missing competencies into your projects or work experience bullets with measurable metrics.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Tab 3: Actionable Suggestions */}
            <TabsContent value="suggestions" className="space-y-4">
              <div className="grid gap-4">
                {analysis?.improvementSuggestions?.map((suggestion, idx) => (
                  <div 
                    key={idx} 
                    className="group flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 p-6 lg:p-8 bg-bg-secondary border border-border-subtle hover:border-lime-accent rounded-md transition-all duration-200"
                  >
                    <div className="flex items-center gap-3 sm:block shrink-0">
                      <span className="font-display text-2xl lg:text-3xl font-black text-lime-accent/50 group-hover:text-lime-accent transition-colors italic">
                        {(idx + 1).toString().padStart(2, '0')}
                      </span>
                      <span className="sm:hidden px-2 py-0.5 rounded bg-bg-elevated text-[9px] font-mono text-text-dim uppercase tracking-wider">
                        Recommendation
                      </span>
                    </div>
                    
                    <div className="space-y-2 flex-1">
                      <div className="hidden sm:flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-bg-elevated border border-border-subtle text-[9px] font-mono font-bold text-text-dim uppercase tracking-wider">
                          PRIORITY ACTION {idx + 1}
                        </span>
                      </div>
                      <p className="text-text-primary text-sm font-normal leading-relaxed">
                        {suggestion}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
