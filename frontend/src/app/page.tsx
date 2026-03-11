'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SectionLabel } from '@/components/SectionLabel';
import { cn } from '@/lib/utils';
import { 
  FileText, 
  Zap, 
  ShieldCheck, 
  Target, 
  LineChart, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function LandingPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg-primary">
      {/* Header */}
      <header className="px-4 lg:px-8 h-20 flex items-center sticky top-0 z-50 border-b border-border-subtle bg-bg-primary/80 backdrop-blur-md">
        <Link className="flex items-center gap-2" href="/">
          <span className="font-display text-2xl font-bold tracking-tighter text-text-primary">
            RESUME<span className="text-lime-accent">AI</span>
          </span>
        </Link>
        <nav className="ml-auto flex items-center gap-8">
          <Link className="hidden sm:block text-[10px] font-mono font-bold uppercase tracking-widest text-text-dim hover:text-text-primary transition-colors" href="/login">
            Login
          </Link>
          <Link href="/signup">
            <Button variant="primary" size="sm">
              Get Started
            </Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="mx-auto max-w-[1280px] px-4 py-24 lg:px-8 lg:py-40">
          <div className="flex flex-col items-start space-y-12">
            <div className="space-y-6 max-w-4xl">
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-lime-accent">
                AI PERFORMANCE ANALYZER
              </span>
              <h1 className="font-display text-[clamp(40px,8vw,110px)] font-bold leading-[0.9] tracking-tighter text-text-primary">
                LAND YOUR <span className="text-text-dim">DREAM JOB</span> WITH <span className="text-lime-accent italic">AI</span> ANALYSIS.
              </h1>
              <p className="max-w-2xl text-lg font-medium text-text-secondary md:text-xl leading-relaxed">
                Professional resume scoring, ATS optimization, and personalized improvement suggestions powered by Google Gemini.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link href="/signup" className="w-full sm:w-auto">
                <Button size="lg" className="w-full h-14 text-base tracking-widest">
                  ANALYZE NOW <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#features" className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" className="w-full h-14 text-base tracking-widest">
                  HOW IT WORKS
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Row */}
        <section className="border-y border-border-subtle bg-bg-secondary">
          <div className="mx-auto max-w-[1280px] flex flex-col md:flex-row">
            {[
              { label: "AI POWERED", value: "GEMINI 2.0" },
              { label: "RESUMES SCANNED", value: "50,000+" },
              { label: "SUCCESS RATE", value: "92% ATS PASS" },
              { label: "AVG. SCORE GAIN", value: "+34 POINTS" },
            ].map((stat, idx) => (
              <div 
                key={idx} 
                className={cn(
                  "flex-1 p-8 md:p-12 flex flex-col gap-2",
                  idx !== 0 && "md:border-l border-border-subtle border-t md:border-t-0"
                )}
              >
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-text-dim">
                  {stat.label}
                </span>
                <span className="font-display text-4xl font-bold text-text-primary">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="mx-auto max-w-[1280px] px-4 py-32 lg:px-8">
          <SectionLabel 
            label="FEATURES" 
            title="ENGINEERED FOR SUCCESS." 
            className="mb-20"
          />
          
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid gap-px bg-border-subtle border border-border-subtle sm:grid-cols-2 lg:grid-cols-3"
          >
            {[
              {
                icon: <Zap />,
                title: "INSTANT SCORING",
                description: "Receive an immediate 0-100 score based on your resume's overall quality and impact."
              },
              {
                icon: <ShieldCheck />,
                title: "ATS COMPATIBILITY",
                description: "Ensure your resume passes automated filters with our proprietary ATS scoring system."
              },
              {
                icon: <Target />,
                title: "JOB MATCHING",
                description: "Paste a job description and see exactly how well you match that specific role."
              },
              {
                icon: <FileText />,
                title: "SKILL DETECTION",
                description: "Advanced AI identifies your technical and soft skills, highlighting your strengths."
              },
              {
                icon: <LineChart />,
                title: "IMPROVEMENT TRACKING",
                description: "Monitor your resume score progress over time with built-in version history."
              },
              {
                icon: <Sparkles />,
                title: "AI SUGGESTIONS",
                description: "Get personalized, actionable recommendations on how to strengthen every section."
              }
            ].map((feature) => (
              <motion.div key={feature.title} variants={item}>
                <div className="group bg-bg-primary h-full p-10 hover:bg-bg-secondary transition-colors duration-300">
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-md border border-border-subtle bg-bg-elevated text-text-primary group-hover:bg-lime-accent group-hover:text-black transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="font-display text-xl font-bold tracking-tight text-text-primary mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="mx-auto max-w-[1280px] px-4 py-32 lg:px-8">
          <div className="bg-bg-secondary p-12 lg:p-24 border border-border-subtle relative overflow-hidden">
            <div className="relative z-10 space-y-8 max-w-2xl">
              <h2 className="font-display text-5xl md:text-7xl font-extrabold tracking-tighter text-text-primary uppercase leading-tight">
                READY TO BECOME <span className="text-lime-accent">UNH-IRABLE?</span>
              </h2>
              <p className="text-lg text-text-secondary font-medium">
                Join 50,000+ developers optimized for the top 1% of tech roles.
              </p>
              <Link href="/signup" className="inline-block">
                <Button size="lg" className="h-16 px-12 text-lg tracking-widest">
                  START ANALYZING <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            {/* Visual element */}
            <div className="absolute right-0 top-0 bottom-0 w-1/3 hidden lg:flex items-center justify-center opacity-10">
              <Sparkles size={400} />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mx-auto w-full max-w-[1280px] px-4 py-12 lg:px-8 border-t border-border-subtle flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <span className="font-display text-xl font-extrabold tracking-tighter text-text-primary uppercase">
            RESUME<span className="text-lime-accent">AI</span>
          </span>
         </div>
        
        <div className="flex gap-8">
          {['TWITTER', 'GITHUB', 'LINKEDIN'].map(s => (
            <Link key={s} href="#" className="font-mono text-[10px] font-bold tracking-[0.2em] text-text-dim hover:text-text-primary transition-colors uppercase">
              {s}
            </Link>
          ))}
        </div>

        <p className="font-mono text-[10px] font-bold tracking-widest text-text-dim uppercase">
          © 2026 RESUMEAI — BUILT BY DEVS
        </p>
      </footer>
    </div>
  );
}
