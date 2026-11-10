import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '@/services/api';
import { UploadZone } from '@/components/UploadZone';
import { SectionLabel } from '@/components/SectionLabel';
import { 
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

export default function UploadPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async (file) => {
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
          navigate(`/results/${resumeId}`);
        } else {
          navigate(`/dashboard`);
        }
      }, 1000);
    } catch (err) {
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
          <div className="p-4 border border-red-500/20 bg-red-500/10 text-red-500 font-mono text-[11px] uppercase tracking-widest flex items-center gap-2">
            <AlertCircle size={16} className="shrink-0" />
            <div>
              <p className="font-bold">SYSTEM ERROR</p>
              <p>{error}</p>
            </div>
          </div>
        )}

        {success && (
          <div className="p-4 border border-lime-accent/30 bg-lime-accent/10 text-lime-accent font-mono text-[11px] uppercase tracking-widest flex items-center gap-2">
            <CheckCircle2 size={16} className="shrink-0" />
            <div>
              <p className="font-bold">UPLOAD SUCCESS</p>
              <p>RESUME RECEIVED. ANALYZING NOW...</p>
            </div>
          </div>
        )}

        <UploadZone 
          onUpload={handleUpload} 
          isUploading={isUploading} 
          className="min-h-[400px]"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-border-subtle">
          <div className="space-y-4">
            <h4 className="font-mono text-[10px] font-bold uppercase tracking-widest text-lime-accent">DATA PRIVACY</h4>
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
