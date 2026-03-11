'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import api from '@/services/api';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UploadZone } from '@/components/UploadZone';
import { SectionLabel } from '@/components/SectionLabel';
import { 
  AlertCircle,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function UploadPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleUpload = async (file: File) => {
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
      setError('ONLY PDF FILES ARE SUPPORTED AT THIS TIME.');
      return;
    }

    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('resume', file);

    try {
      const response = await api.post('/resume/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const resumeId = response?.data?.data?.resume?._id;
      const analysisData = response?.data?.analysis
                        ?? response?.data?.data?.analysis;

      console.log('[UPLOAD] Saving to localStorage, id:', resumeId);
      console.log('[UPLOAD] Data being saved:', analysisData);

      if (resumeId && analysisData) {
        localStorage.setItem(
          `analysis_${resumeId}`,
          JSON.stringify(analysisData)
        );
      }

      setSuccess(true);
      setTimeout(() => {
        if (resumeId) {
          router.push(`/results/${resumeId}`);
        } else {
          router.push(`/dashboard`);
        }
      }, 1000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'UPLOAD FAILED. PLEASE TRY AGAIN.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="px-4 py-12 lg:px-8 lg:py-20 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-12"
      >
        <div className="space-y-4">
          <SectionLabel 
            label="STEP 01" 
            title="SUBMIT YOUR RESUME." 
          />
          <p className="text-lg text-text-secondary font-medium max-w-2xl leading-relaxed">
            Upload your resume in PDF format. Our AI will dissect your experience and provide a brutal analysis.
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="bg-red-500/10 border-red-500/20 text-red-500 rounded-none font-mono text-[10px] uppercase tracking-widest">
            <AlertCircle size={14} className="mr-2" />
            <div>
              <AlertTitle className="font-bold">SYSTEM ERROR</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </div>
          </Alert>
        )}

        {success && (
          <Alert className="bg-lime-accent/10 border-lime-accent/20 text-lime-accent rounded-none font-mono text-[10px] uppercase tracking-widest">
            <CheckCircle2 size={14} className="mr-2" />
            <div>
              <AlertTitle className="font-bold">UPLOAD SUCCESS</AlertTitle>
              <AlertDescription>RESUME RECEIVED. ANALYZING NOW...</AlertDescription>
            </div>
          </Alert>
        )}

        <UploadZone 
          onUpload={handleUpload} 
          isUploading={isUploading} 
          className="min-h-[400px]"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-border-subtle">
          <div className="space-y-4">
            <h4 className="font-mono text-[10px] font-bold uppercase tracking-widest text-text-dim text-lime-accent">DATA PRIVACY</h4>
            <p className="text-xs text-text-secondary leading-relaxed uppercase tracking-wider">YOUR RESUME IS SECURELY STORED AND ONLY USED FOR AI ANALYSIS. WE DO NOT SELL YOUR PERSONAL DATA.</p>
          </div>
          <div className="space-y-4">
            <h4 className="font-mono text-[10px] font-bold uppercase tracking-widest text-text-dim">OPTIMIZATION TIP</h4>
            <p className="text-xs text-text-secondary leading-relaxed uppercase tracking-wider">FOR BEST RESULTS, ENSURE YOUR PDF IS TEXT-SELECTABLE AND NOT A FLAT IMAGE SCAN.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
