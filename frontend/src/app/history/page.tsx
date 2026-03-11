'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import api from '@/services/api';
import Navbar from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { BottomNav } from '@/components/BottomNav';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SectionLabel } from '@/components/SectionLabel';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from '@/components/ui/table';
import { 
  Loader2, 
  History as HistoryIcon,
  ArrowLeft,
  ChevronRight,
  Calendar,
  Layers
} from 'lucide-react';

interface AnalysisHistory {
  _id: string;
  resumeId: {
    _id: string;
    filename: string;
  };
  resumeScore: number;
  createdAt: string;
}

function HistoryContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const resumeIdFilter = searchParams.get('resumeId');
  
  const [history, setHistory] = useState<AnalysisHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const url = resumeIdFilter ? `/history/resume/${resumeIdFilter}` : '/history';
        const response = await api.get(url);
        setHistory(response.data.data.history);
      } catch (err) {
        console.error('Failed to fetch history', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [resumeIdFilter]);

  return (
    <div className="min-h-screen bg-bg-primary lg:flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 max-w-[1280px] mx-auto px-4 py-8 lg:px-8 lg:py-12 w-full pb-28 lg:pb-12">
          <div className="flex flex-col gap-16">
            <div className="space-y-4">
              <Link href="/dashboard" className="inline-flex items-center text-[10px] font-mono font-bold uppercase tracking-widest text-text-dim hover:text-lime-accent transition-colors">
                <ArrowLeft size={14} className="mr-2" /> RETURN TO SYSTEM 
              </Link>
              <SectionLabel label="SYSTEM LOGS" title="ANALYSIS HISTORY." />
            </div>

            {loading ? (
              <div className="flex h-64 items-center justify-center border border-border-subtle bg-bg-secondary/20">
                <Loader2 className="h-10 w-10 animate-spin text-lime-accent" />
              </div>
            ) : history.length === 0 ? (
              <div className="p-20 border border-dashed border-border-subtle text-center space-y-6 bg-bg-secondary/10">
                <Layers size={48} className="mx-auto text-text-dim opacity-20" />
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-text-dim">NO DATA ENTRIES RECORDED IN RECENT CYCLES.</p>
                <Link href="/upload">
                  <Button variant="secondary" className="px-8 tracking-widest">SUBMIT NEW RESUME</Button>
                </Link>
              </div>
            ) : (
              <div className="bg-bg-secondary border border-border-subtle overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-bg-elevated/20 border-border-subtle hover:bg-bg-elevated/20">
                      <TableHead className="w-[40%] font-mono text-[10px] font-bold uppercase tracking-widest text-text-dim h-14">FILE IDENTIFIER</TableHead>
                      <TableHead className="font-mono text-[10px] font-bold uppercase tracking-widest text-text-dim h-14">TIMESTAMP</TableHead>
                      <TableHead className="font-mono text-[10px] font-bold uppercase tracking-widest text-text-dim h-14 text-right">METRIC</TableHead>
                      <TableHead className="w-16 h-14"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {history.map((record, index) => (
                      <TableRow 
                        key={record._id} 
                        className="border-border-subtle/50 group cursor-pointer"
                        onClick={() => router.push(`/results/${record.resumeId._id}`)}
                      >
                        <TableCell className="py-6">
                          <div className="flex items-center gap-4">
                            <div className="w-8 h-8 flex items-center justify-center border border-border-subtle bg-bg-elevated text-text-dim group-hover:text-lime-accent transition-colors">
                              <Layers size={14} />
                            </div>
                            <span className="font-display font-bold text-text-primary tracking-tight uppercase group-hover:text-lime-accent transition-colors">
                              {record.resumeId.filename}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="py-6">
                           <div className="flex flex-col gap-1">
                              <span className="font-mono text-[10px] font-bold text-text-secondary uppercase tracking-widest">
                                {new Date(record.createdAt).toLocaleDateString()}
                              </span>
                              <span className="font-mono text-[10px] text-text-dim uppercase tracking-widest">
                                {new Date(record.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                           </div>
                        </TableCell>
                        <TableCell className="py-6 text-right">
                          <span className="font-display text-2xl font-black italic text-text-primary group-hover:text-lime-accent transition-colors">
                            {record.resumeScore}
                          </span>
                        </TableCell>
                        <TableCell className="py-6 text-right">
                          <ChevronRight size={18} className="ml-auto text-text-dim group-hover:text-lime-accent transition-transform group-hover:translate-x-1" />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-border-subtle">
               <div className="space-y-4">
                  <h4 className="font-mono text-[10px] font-bold uppercase tracking-widest text-lime-accent">DATA RETENTION</h4>
                  <p className="text-[10px] text-text-dim uppercase tracking-widest leading-relaxed">SYSTEM RECORDS ARE PURGED EVERY 90 DAYS UNLESS ARCHIVED MANUALLY.</p>
               </div>
               <div className="space-y-4">
                  <h4 className="font-mono text-[10px] font-bold uppercase tracking-widest text-text-dim">VERSIONING</h4>
                  <p className="text-[10px] text-text-dim uppercase tracking-widest leading-relaxed">EACH UPLOAD TRIGGERS A NEW ANALYSIS CYCLE AND RECORD ENTRY.</p>
               </div>
               <div className="space-y-4">
                  <h4 className="font-mono text-[10px] font-bold uppercase tracking-widest text-text-dim">ANALYTICS</h4>
                  <p className="text-[10px] text-text-dim uppercase tracking-widest leading-relaxed">EXPORT YOUR HISTORICAL DATA FOR ADVANCED CAREER TRACKING.</p>
               </div>
            </div>
          </div>
        </main>
        <BottomNav />
      </div>
    </div>
  );
}

export default function HistoryPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center p-8">
        <Loader2 className="h-10 w-10 animate-spin text-lime-accent" />
        <p className="mt-6 font-mono text-[10px] font-bold uppercase tracking-widest text-text-dim">RETRIEVING ARCHIVES...</p>
      </div>
    }>
      <HistoryContent />
    </Suspense>
  );
}
