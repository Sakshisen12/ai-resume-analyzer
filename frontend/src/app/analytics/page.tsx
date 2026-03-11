'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import api from '@/services/api';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  TrendingUp, 
  ShieldCheck, 
  Target, 
  Loader2,
  ArrowLeft
} from 'lucide-react';
import { 
  SkillsRadarChart, 
  ScoreBarChart, 
  HistoryLineChart 
} from '@/components/AnalyticsCharts';
import { useRouter } from 'next/navigation';

interface AnalysisRecord {
  _id: string;
  resumeScore: number;
  atsCompatibilityScore: number;
  skillsDetected: string[];
  createdAt: string;
}

function AnalyticsContent() {
  const [history, setHistory] = useState<AnalysisRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await api.get('/history');
        setHistory(response.data.data.history);
      } catch (err) {
        console.error('Failed to fetch history', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-950">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-500" />
      </div>
    );
  }

  // Process data for charts
  const latestAnalysis = history[0];
  
  const scoreData = [
    { name: 'Resume Score', score: latestAnalysis?.resumeScore || 0 },
    { name: 'ATS compatibility', score: latestAnalysis?.atsCompatibilityScore || 0 }
  ];

  const historyData = [...history].reverse().map(record => ({
    date: new Date(record.createdAt).toLocaleDateString(),
    score: record.resumeScore
  }));

  const skillsData = latestAnalysis?.skillsDetected.slice(0, 6).map(skill => ({
    name: skill,
    value: 80 + Math.random() * 20 // Simulated weight for visualization
  })) || [];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col pb-20">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        <Button 
          variant="ghost" 
          onClick={() => router.push('/dashboard')}
          className="mb-8 text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-4xl font-bold tracking-tight mb-2 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Career Analytics
          </h1>
          <p className="text-slate-400">Deep dive into your professional profile and growth trends.</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {/* Main Stat Card */}
          <Card className="bg-slate-900/40 border-slate-800 scale-100 hover:scale-[1.02] transition-transform">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <Target className="h-4 w-4 text-cyan-500" />
                Latest Performance
              </CardDescription>
              <CardTitle className="text-3xl font-black text-cyan-500">
                {latestAnalysis?.resumeScore || 0}%
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScoreBarChart data={scoreData} />
            </CardContent>
          </Card>

          {/* Skills Radar */}
          <Card className="bg-slate-900/40 border-slate-800 lg:col-span-1">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-purple-500" />
                Skill Competency
              </CardDescription>
              <CardTitle className="text-xl font-bold">Domain Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              {skillsData.length > 0 ? (
                <SkillsRadarChart skills={skillsData} />
              ) : (
                <div className="h-[300px] flex items-center justify-center text-slate-500">
                  No skills data available
                </div>
              )}
            </CardContent>
          </Card>

          {/* History Trend */}
          <Card className="bg-slate-900/40 border-slate-800 md:col-span-2 lg:col-span-1">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                Improvement History
              </CardDescription>
              <CardTitle className="text-xl font-bold">Progress Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <HistoryLineChart data={historyData} />
            </CardContent>
          </Card>
        </div>

        {/* Detailed Insights Section */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-slate-900/40 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-cyan-500" />
                ATS Compatibility Insight
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-400 text-sm">
                Your resume currently matches <span className="text-cyan-400 font-bold">{latestAnalysis?.atsCompatibilityScore}%</span> of the industry standard requirements for your role.
              </p>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-cyan-500" 
                  style={{ width: `${latestAnalysis?.atsCompatibilityScore || 0}%` }}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/40 border-slate-800">
            <CardHeader>
              <CardTitle>Top Keywords Detected</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {latestAnalysis?.skillsDetected.map((skill, i) => (
                  <span 
                    key={i}
                    className="px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-xs font-medium text-slate-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default function AnalyticsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-500" />
      </div>
    }>
      <AnalyticsContent />
    </Suspense>
  );
}
