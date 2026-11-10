import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { BottomNav } from '@/components/BottomNav';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SectionLabel } from '@/components/SectionLabel';
import { 
  ArrowLeft,
  HelpCircle,
  Cpu,
  Mail,
  ShieldCheck,
  ExternalLink,
  Sparkles
} from 'lucide-react';

const FAQS = [
  {
    question: "HOW IS THE RESUME SCORE CALCULATED?",
    answer: "ResumeAI evaluates your resume using Google Gemini AI against modern industry recruiting benchmarks. The overall score (0–100) factors in content impact, action-verb usage, quantifiable achievements, formatting readability, and ATS keyword relevance."
  },
  {
    question: "WHAT IS ATS COMPATIBILITY?",
    answer: "ATS (Applicant Tracking System) compatibility measures how easily machine parsing algorithms can read and extract data from your resume without layout breakage, missing text, or lost keywords. A score of 80%+ indicates high machine readability."
  },
  {
    question: "HOW DOES JOB MATCHING WORK?",
    answer: "Paste any target job description into the Job Match engine. The AI compares your experience and technical toolkit against the employer's requirements to compute an alignment score, highlight missing keywords, and suggest specific tailoring strategies."
  },
  {
    question: "WHAT FILE FORMATS ARE SUPPORTED?",
    answer: "We currently support standard PDF (.pdf) files. Text-based PDFs created via Word, Google Docs, or LaTeX yield the highest parsing accuracy."
  },
  {
    question: "IS MY RESUME DATA STORED SECURELY?",
    answer: "Yes. Your resume text is parsed in memory and stored securely in your private encrypted account database. We do not sell or share candidate data with third parties."
  }
];

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-bg-primary lg:flex">
      <Sidebar />
      <div className="flex-1 flex flex-col lg:pl-[240px]">
        <Navbar />
        <main className="flex-1 max-w-[1280px] mx-auto px-4 py-8 lg:px-8 lg:py-12 w-full pb-28 lg:pb-12">
          <div className="flex flex-col gap-10">
            {/* Header / Breadcrumb */}
            <div className="space-y-4">
              <Link 
                to="/dashboard" 
                className="inline-flex items-center text-[10px] font-mono font-bold uppercase tracking-widest text-text-dim hover:text-lime-accent transition-colors"
              >
                <ArrowLeft size={14} className="mr-2" /> RETURN TO SYSTEM 
              </Link>
              <SectionLabel label="SYSTEM ASSISTANCE" title="HELP & DOCUMENTATION." />
            </div>

            {/* Quick Overview Cards */}
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="bg-bg-secondary border-border-subtle p-6 flex flex-col justify-between hover:border-lime-accent transition-colors">
                <div className="space-y-3">
                  <div className="h-10 w-10 rounded-md bg-bg-elevated border border-border-subtle flex items-center justify-center text-lime-accent">
                    <Cpu size={20} />
                  </div>
                  <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-text-primary">
                    AI ENGINE STATUS
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Powered by Google Gemini generative models with multi-model fallback for 99.9% uptime.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-border-subtle flex items-center justify-between text-[10px] font-mono">
                  <span className="text-text-dim">STATUS</span>
                  <span className="text-lime-accent font-bold">OPERATIONAL</span>
                </div>
              </Card>

              <Card className="bg-bg-secondary border-border-subtle p-6 flex flex-col justify-between hover:border-lime-accent transition-colors">
                <div className="space-y-3">
                  <div className="h-10 w-10 rounded-md bg-bg-elevated border border-border-subtle flex items-center justify-center text-lime-accent">
                    <ShieldCheck size={20} />
                  </div>
                  <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-text-primary">
                    SECURITY & PRIVACY
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    JWT-authenticated sessions with bcrypt password encryption and private cloud storage.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-border-subtle flex items-center justify-between text-[10px] font-mono">
                  <span className="text-text-dim">ENCRYPTION</span>
                  <span className="text-lime-accent font-bold">ACTIVE</span>
                </div>
              </Card>

              <Card className="bg-bg-secondary border-border-subtle p-6 flex flex-col justify-between hover:border-lime-accent transition-colors">
                <div className="space-y-3">
                  <div className="h-10 w-10 rounded-md bg-bg-elevated border border-border-subtle flex items-center justify-center text-lime-accent">
                    <Mail size={20} />
                  </div>
                  <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-text-primary">
                    DEVELOPER CONTACT
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Need custom features or found a bug? Submit an issue directly to the project repository.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-border-subtle">
                  <a 
                    href="https://github.com/Sakshisen12/ai-resume-analyzer/issues" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center text-[10px] font-mono font-bold text-lime-accent uppercase tracking-widest hover:underline"
                  >
                    REPORT AN ISSUE <ExternalLink size={12} className="ml-1" />
                  </a>
                </div>
              </Card>
            </div>

            {/* FAQ Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <HelpCircle size={18} className="text-lime-accent" />
                <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-text-dim">
                  FREQUENTLY ASKED QUESTIONS
                </h3>
              </div>

              <div className="grid gap-4">
                {FAQS.map((faq, i) => (
                  <Card key={i} className="bg-bg-secondary border-border-subtle p-6 lg:p-8">
                    <h4 className="font-mono text-xs font-bold text-text-primary tracking-wider mb-3">
                      {faq.question}
                    </h4>
                    <p className="font-body text-sm text-text-secondary leading-relaxed">
                      {faq.answer}
                    </p>
                  </Card>
                ))}
              </div>
            </div>

            {/* Quick Actions Footer */}
            <div className="p-8 border border-border-subtle bg-bg-secondary/40 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="font-display text-lg font-bold text-text-primary">Ready to optimize your resume?</h4>
                <p className="text-xs text-text-dim">Upload your PDF or run a target job match in seconds.</p>
              </div>
              <div className="flex gap-3">
                <Link to="/upload">
                  <Button variant="primary" className="h-11 px-6 text-xs font-mono tracking-widest">
                    UPLOAD RESUME <Sparkles size={14} className="ml-1" />
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button variant="secondary" className="h-11 px-6 text-xs font-mono tracking-widest">
                    DASHBOARD
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </main>
        <BottomNav />
      </div>
    </div>
  );
}
