import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

export default function AnalyticsPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await api.get('/history');
        setHistory(response.data.data.history || []);
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
      <div className="flex items-center justify-center h-screen bg-bg-primary">
        <Loader2 className="h-8 w-8 animate-spin text-lime-accent" />
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

  const skillsData = latestAnalysis?.skillsDetected?.slice(0, 6).map(skill => ({
    name: skill,
    value: 80 + Math.random() * 20
  })) || [];

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary flex flex-col pb-20">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/dashboard')}
          className="mb-8 text-text-secondary hover:text-lime-accent transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-4xl font-display font-bold tracking-tight mb-2 text-text-primary">
            Career Analytics
          </h1>
          <p className="text-text-secondary">Deep dive into your professional profile and growth trends.</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {/* Main Stat Card */}
          <Card className="bg-bg-secondary border-border-subtle">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <Target className="h-4 w-4 text-lime-accent" />
                Latest Performance
              </CardDescription>
              <CardTitle className="text-3xl font-black text-lime-accent font-display">
                {latestAnalysis?.resumeScore || 0}%
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScoreBarChart data={scoreData} />
            </CardContent>
          </Card>

          {/* Skills Radar */}
          <Card className="bg-bg-secondary border-border-subtle lg:col-span-1">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-cyan-400" />
                Skill Competency
              </CardDescription>
              <CardTitle className="text-xl font-bold font-display">Domain Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              {skillsData.length > 0 ? (
                <SkillsRadarChart skills={skillsData} />
              ) : (
                <div className="h-[300px] flex items-center justify-center text-text-dim">
                  No skills data available
                </div>
              )}
            </CardContent>
          </Card>

          {/* History Trend */}
          <Card className="bg-bg-secondary border-border-subtle md:col-span-2 lg:col-span-1">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-400" />
                Improvement History
              </CardDescription>
              <CardTitle className="text-xl font-bold font-display">Progress Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <HistoryLineChart data={historyData} />
            </CardContent>
          </Card>
        </div>

        {/* Detailed Insights Section */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-bg-secondary border-border-subtle">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-display">
                <BarChart3 className="h-5 w-5 text-lime-accent" />
                ATS Compatibility Insight
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-text-secondary text-sm">
                Your resume currently matches <span className="text-lime-accent font-bold">{latestAnalysis?.atsCompatibilityScore || 0}%</span> of the industry standard requirements for your role.
              </p>
              <div className="h-2 w-full bg-bg-elevated rounded-full overflow-hidden">
                <div 
                  className="h-full bg-lime-accent" 
                  style={{ width: `${latestAnalysis?.atsCompatibilityScore || 0}%` }}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-bg-secondary border-border-subtle">
            <CardHeader>
              <CardTitle className="font-display">Top Keywords Detected</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {latestAnalysis?.skillsDetected?.map((skill, i) => (
                  <span 
                    key={i}
                    className="px-3 py-1 rounded-full bg-bg-elevated border border-border-subtle text-xs font-mono text-text-primary"
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
