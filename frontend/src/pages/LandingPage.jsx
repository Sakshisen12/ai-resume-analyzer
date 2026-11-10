import React from 'react';
import { Link } from 'react-router-dom';
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
  ArrowRight,
  Star
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
    <div className="flex flex-col min-h-screen bg-bg-primary text-text-primary selection:bg-lime-accent selection:text-black">
      {/* Header */}
      <header className="px-4 lg:px-8 h-20 flex items-center sticky top-0 z-50 border-b border-border-subtle bg-bg-primary/80 backdrop-blur-md">
        <Link className="flex items-center gap-2" to="/">
          <span className="font-display text-2xl font-bold tracking-tighter text-text-primary">
            RESUME<span className="text-lime-accent">AI</span>
          </span>
        </Link>
        <nav className="ml-auto flex items-center gap-8">
          <Link className="hidden sm:block text-[10px] font-mono font-bold uppercase tracking-widest text-text-dim hover:text-text-primary transition-colors" to="/login">
            Login
          </Link>
          <Link to="/signup">
            <Button variant="primary" size="sm">
              Get Started
            </Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section with Cinematic Tech Background */}
        <section className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-36 border-b border-border-subtle">
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity scale-105"
              style={{ backgroundImage: "url('/hero-tech-bg.jpg')" }}
            />
            <div className="absolute top-0 left-1/3 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-lime-accent/15 via-lime-accent/5 to-transparent blur-3xl" />
            <div className="absolute top-1/4 right-0 w-[600px] h-[500px] bg-gradient-to-b from-blue-500/10 via-transparent to-transparent blur-3xl" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_20%,#000_70%,transparent_100%)]" />
            <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/40 via-bg-primary/80 to-bg-primary" />
          </div>

          <div className="relative z-10 mx-auto max-w-[1280px] px-4 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
              {/* Left Column: Hero Content */}
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-lime-accent/30 bg-lime-accent/10 backdrop-blur-sm">
                  <span className="h-2 w-2 rounded-full bg-lime-accent animate-ping" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-lime-accent">
                    AI PERFORMANCE ANALYZER // V2.5
                  </span>
                </div>

                <div className="space-y-4">
                  <h1 className="font-display text-[clamp(42px,6vw,84px)] font-black leading-[0.95] tracking-tighter text-text-primary uppercase">
                    LAND YOUR <span className="text-text-dim">DREAM JOB</span> WITH <span className="text-lime-accent italic">AI</span> ANALYSIS.
                  </h1>
                  <p className="max-w-xl text-base text-text-secondary md:text-lg leading-relaxed font-body">
                    Transform your resume into a top 1% candidate profile. Instant ATS compatibility scoring, deep skills gap detection, and personalized recommendations powered by Google Gemini.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Link to="/signup" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full h-14 px-8 text-sm tracking-widest font-mono font-bold shadow-[0_0_30px_-5px_rgba(190,242,100,0.3)]">
                      ANALYZE MY RESUME <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <a href="#how-it-works" className="w-full sm:w-auto">
                    <Button variant="secondary" size="lg" className="w-full h-14 px-8 text-sm tracking-widest font-mono">
                      HOW IT WORKS
                    </Button>
                  </a>
                </div>

                {/* Social Proof Badges */}
                <div className="pt-4 flex flex-col sm:flex-row sm:items-center gap-4 text-xs font-mono text-text-dim border-t border-border-subtle/60">
                  <div className="flex -space-x-2">
                    {['#38bdf8', '#a855f7', '#bef264', '#f59e0b'].map((color, idx) => (
                      <div 
                        key={idx} 
                        className="h-7 w-7 rounded-full border-2 border-bg-primary flex items-center justify-center text-[9px] font-bold text-black"
                        style={{ backgroundColor: color }}
                      >
                        {String.fromCharCode(65 + idx)}
                      </div>
                    ))}
                  </div>
                  <div>
                    <span className="text-text-primary font-bold">50,000+ candidates</span> optimized for roles at top tech companies.
                  </div>
                </div>
              </div>

              {/* Right Column: Realistic Live Product Interface Mockup */}
              <div className="relative">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-lime-accent/20 via-transparent to-blue-500/20 blur-xl opacity-70" />

                <Card className="relative bg-bg-secondary/90 border-border-normal backdrop-blur-xl shadow-2xl overflow-hidden rounded-xl">
                  {/* Window Title Bar */}
                  <div className="border-b border-border-subtle px-5 py-3.5 bg-bg-elevated/40 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                      <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                      <span className="ml-2 font-mono text-[10px] text-text-dim tracking-wider uppercase">
                        AI_SCANNER // SARAH_RESUME_V2.PDF
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-lime-accent/10 border border-lime-accent/30 text-lime-accent text-[9px] font-mono font-bold tracking-widest uppercase">
                      ACTIVE AUDIT
                    </span>
                  </div>

                  <CardContent className="p-6 space-y-6">
                    {/* Animated Scanning Line */}
                    <div className="relative h-1 w-full bg-bg-elevated rounded-full overflow-hidden">
                      <div className="h-full w-1/3 bg-lime-accent animate-pulse" />
                    </div>

                    {/* Top Candidate Snapshot */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <h4 className="font-display text-lg font-bold text-text-primary">Sarah Jenkins</h4>
                        <p className="text-xs text-text-secondary font-mono">Senior Full-Stack Engineer · 5+ Yrs Exp</p>
                      </div>
                      <div className="text-right">
                        <span className="font-display text-3xl font-black text-lime-accent leading-none">94</span>
                        <span className="block text-[9px] font-mono text-text-dim uppercase tracking-wider">OVERALL SCORE</span>
                      </div>
                    </div>

                    {/* ATS Verification Metric */}
                    <div className="p-4 rounded-lg bg-bg-primary/80 border border-border-subtle flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-md bg-lime-accent/10 text-lime-accent flex items-center justify-center">
                          <ShieldCheck size={20} />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-text-primary flex items-center gap-2">
                            ATS COMPATIBILITY · 98%
                            <span className="px-1.5 py-0.2 rounded bg-lime-accent text-black text-[9px] font-mono font-black">
                              PASSED
                            </span>
                          </div>
                          <p className="text-[11px] text-text-dim">Format is machine-readable across Greenhouse & Lever</p>
                        </div>
                      </div>
                    </div>

                    {/* Extracted Skills Preview */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[10px] font-mono text-text-dim uppercase tracking-wider">
                        <span>DETECTED COMPETENCIES</span>
                        <span className="text-lime-accent">14 EXTRACTED</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {['React 19', 'JavaScript', 'Node.js', 'Docker', 'PostgreSQL', 'GraphQL'].map((skill) => (
                          <span key={skill} className="px-2.5 py-1 rounded bg-bg-elevated border border-border-subtle text-[11px] font-mono text-text-primary">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* AI Feedback Callout */}
                    <div className="p-3.5 rounded-lg bg-lime-accent/5 border border-lime-accent/20 flex items-start gap-3">
                      <Sparkles size={16} className="text-lime-accent shrink-0 mt-0.5" />
                      <p className="text-xs text-text-secondary leading-relaxed">
                        <strong className="text-text-primary font-bold">Key Insight:</strong> High leadership impact detected. Recommend quantifying cloud deployment speedup metrics in project section.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Row */}
        <section className="border-b border-border-subtle bg-bg-secondary/60">
          <div className="mx-auto max-w-[1280px] flex flex-col md:flex-row">
            {[
              { label: "AI ENGINE", value: "GEMINI 2.5 FLASH", hint: "Sub-second analysis" },
              { label: "RESUMES SCANNED", value: "50,000+", hint: "Across 40+ countries" },
              { label: "SUCCESS RATE", value: "92% ATS PASS", hint: "Bypasses automated filters" },
              { label: "AVG. SCORE GAIN", value: "+34 POINTS", hint: "After recommended edits" },
            ].map((stat, idx) => (
              <div 
                key={idx} 
                className={cn(
                  "flex-1 p-8 md:p-10 flex flex-col gap-1.5",
                  idx !== 0 && "md:border-l border-border-subtle border-t md:border-t-0"
                )}
              >
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-text-dim">
                  {stat.label}
                </span>
                <span className="font-display text-3xl lg:text-4xl font-extrabold text-text-primary tracking-tight">
                  {stat.value}
                </span>
                <span className="text-xs text-text-dim font-body">
                  {stat.hint}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works Showcase */}
        <section id="how-it-works" className="relative py-28 lg:py-36 border-b border-border-subtle overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-none opacity-15">
            <div 
              className="absolute inset-0 bg-cover bg-center mix-blend-luminosity"
              style={{ backgroundImage: "url('/team-workspace.jpg')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-primary/90 to-bg-primary" />
          </div>

          <div className="relative z-10 mx-auto max-w-[1280px] px-4 lg:px-8">
            <SectionLabel 
              label="WORKFLOW" 
              title="HOW RESUMEAI OPTIMIZES YOUR APPLICATION." 
              className="mb-16"
            />

            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  step: "01",
                  icon: <FileText size={24} className="text-lime-accent" />,
                  title: "UPLOAD YOUR RESUME",
                  desc: "Drop your existing PDF resume. Our parser instantly extracts text, structural hierarchy, projects, and work history without formatting distortion."
                },
                {
                  step: "02",
                  icon: <Zap size={24} className="text-lime-accent" />,
                  title: "DEEP AI SEMANTIC AUDIT",
                  desc: "Google Gemini scans your resume against modern ATS algorithms, scoring action verbs, measurable impact metrics, and technical competency coverage."
                },
                {
                  step: "03",
                  icon: <Target size={24} className="text-lime-accent" />,
                  title: "TARGET ROLE MATCHING",
                  desc: "Paste any job posting description. The AI pinpoints exactly which required skills you're missing and tells you how to tailor your resume to stand out."
                }
              ].map((step, i) => (
                <Card key={i} className="bg-bg-secondary/90 border-border-subtle backdrop-blur-md p-8 hover:border-lime-accent transition-all duration-300 flex flex-col justify-between">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="h-12 w-12 rounded-lg bg-bg-elevated border border-border-subtle flex items-center justify-center">
                        {step.icon}
                      </div>
                      <span className="font-display text-4xl font-black text-text-dim/30 italic">
                        {step.step}
                      </span>
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-text-primary">
                        {step.title}
                      </h3>
                      <p className="text-sm text-text-secondary font-body leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="mx-auto max-w-[1280px] px-4 py-28 lg:px-8 border-b border-border-subtle">
          <SectionLabel 
            label="CAPABILITIES" 
            title="EVERYTHING YOU NEED TO WIN INTERVIEWS." 
            className="mb-16"
          />
          
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid gap-px bg-border-subtle border border-border-subtle sm:grid-cols-2 lg:grid-cols-3 rounded-lg overflow-hidden"
          >
            {[
              {
                icon: <Zap size={20} />,
                title: "INSTANT PERFORMANCE SCORING",
                description: "Receive an immediate 0-100 score analyzing content depth, brevity, action verbs, and candidate caliber."
              },
              {
                icon: <ShieldCheck size={20} />,
                title: "ATS COMPATIBILITY BENCHMARK",
                description: "Test how recruitment software parses your headers, tables, dates, and experience blocks."
              },
              {
                icon: <Target size={20} />,
                title: "JOB DESCRIPTION GAP ANALYSIS",
                description: "Compare your resume directly against any role to uncover keyword gaps before you apply."
              },
              {
                icon: <FileText size={20} />,
                title: "INTELLIGENT SKILL DETECTION",
                description: "Categorizes programming languages, frameworks, cloud platforms, and soft skills automatically."
              },
              {
                icon: <LineChart size={20} />,
                title: "VERSION REVISION TRACKING",
                description: "Save snapshot versions of each revision to track score improvements as you refine your resume."
              },
              {
                icon: <Sparkles size={20} />,
                title: "ACTIONABLE SUGGESTIONS",
                description: "Receive concrete, prioritized bullet points explaining exactly what changes will yield more recruiter callbacks."
              }
            ].map((feature) => (
              <motion.div key={feature.title} variants={item}>
                <div className="group bg-bg-primary h-full p-8 lg:p-10 hover:bg-bg-secondary transition-colors duration-300">
                  <div className="mb-6 inline-flex h-11 w-11 items-center justify-center rounded-md border border-border-subtle bg-bg-elevated text-lime-accent group-hover:bg-lime-accent group-hover:text-black transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-text-primary mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed text-sm font-body">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Testimonials Section */}
        <section className="mx-auto max-w-[1280px] px-4 py-28 lg:px-8 border-b border-border-subtle">
          <SectionLabel 
            label="SUCCESS STORIES" 
            title="JOIN THOUSANDS OF HIRED CANDIDATES." 
            className="mb-16"
          />

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Marcus Vance",
                role: "Software Engineer @ Stripe",
                quote: "My ATS score jumped from 61% to 94% after applying the keyword suggestions. Landed 4 interviews within two weeks of updating my resume.",
                score: "+33 pts"
              },
              {
                name: "Elena Rostova",
                role: "Senior Product Designer @ Vercel",
                quote: "The Job Match engine is incredible. It caught 6 critical industry keywords I had completely overlooked in my previous portfolio resume.",
                score: "+28 pts"
              },
              {
                name: "Devon Chen",
                role: "DevOps & Cloud Engineer @ Datadog",
                quote: "Having an objective AI score before submitting job applications gave me complete confidence. The suggestions are genuinely actionable.",
                score: "+41 pts"
              }
            ].map((story, i) => (
              <Card key={i} className="bg-bg-secondary border-border-subtle p-8 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-1 text-lime-accent">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} size={14} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-sm text-text-secondary font-body leading-relaxed italic">
                    "{story.quote}"
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-border-subtle flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-text-primary">{story.name}</h4>
                    <p className="text-[11px] text-text-dim font-mono">{story.role}</p>
                  </div>
                  <span className="px-2 py-1 rounded bg-lime-accent/10 border border-lime-accent/30 text-lime-accent text-[10px] font-mono font-bold">
                    {story.score}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-28 lg:py-36 overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
            <div 
              className="absolute inset-0 bg-cover bg-center mix-blend-luminosity"
              style={{ backgroundImage: "url('/hero-tech-bg.jpg')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-bg-primary via-bg-primary/95 to-bg-primary" />
          </div>

          <div className="relative z-10 mx-auto max-w-[1280px] px-4 lg:px-8">
            <div className="bg-bg-secondary/90 border border-border-subtle p-12 lg:p-20 rounded-2xl relative overflow-hidden backdrop-blur-xl">
              <div className="relative z-10 space-y-6 max-w-2xl">
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-lime-accent">
                  GET STARTED IN 60 SECONDS
                </span>
                <h2 className="font-display text-4xl md:text-6xl font-black tracking-tighter text-text-primary uppercase leading-tight">
                  READY TO BUILD AN <span className="text-lime-accent italic">UNBEATABLE</span> RESUME?
                </h2>
                <p className="text-base text-text-secondary font-body leading-relaxed">
                  Upload your PDF and get instant ATS compatibility scores, skill gap analysis, and tailored recommendations.
                </p>
                <div className="pt-2">
                  <Link to="/signup">
                    <Button size="lg" className="h-14 px-10 text-sm tracking-widest font-mono font-bold shadow-[0_0_30px_-5px_rgba(190,242,100,0.3)]">
                      START ANALYZING FOR FREE <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="absolute right-0 top-0 bottom-0 w-1/3 hidden lg:flex items-center justify-center opacity-10 pointer-events-none">
                <Sparkles size={360} className="text-lime-accent" />
              </div>
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
          <span className="text-[10px] font-mono text-text-dim ml-2">
            // POWERED BY GEMINI AI
          </span>
        </div>
        
        <div className="flex gap-8">
          <Link to="/support" className="font-mono text-[10px] font-bold tracking-[0.2em] text-text-dim hover:text-lime-accent transition-colors uppercase">
            SUPPORT & FAQ
          </Link>
          <a href="https://github.com/Sakshisen12/ai-resume-analyzer" target="_blank" rel="noreferrer" className="font-mono text-[10px] font-bold tracking-[0.2em] text-text-dim hover:text-lime-accent transition-colors uppercase">
            GITHUB
          </a>
        </div>

        <p className="font-mono text-[10px] font-bold tracking-widest text-text-dim uppercase">
          © 2026 RESUMEAI — ALL RIGHTS RESERVED
        </p>
      </footer>
    </div>
  );
}
