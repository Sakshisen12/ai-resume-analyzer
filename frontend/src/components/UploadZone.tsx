"use client"

import { useState } from "react"
import { FileUp, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface UploadZoneProps {
  onUpload: (file: File) => void
  isUploading?: boolean
  className?: string
}

export function UploadZone({ onUpload, isUploading, className }: UploadZoneProps) {
  const [isDragActive, setIsDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true)
    } else if (e.type === "dragleave") {
      setIsDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onUpload(e.dataTransfer.files[0])
    }
  }

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={cn(
        "group relative flex min-h-[300px] cursor-pointer flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed transition-all",
        isDragActive 
          ? "border-lime-accent bg-bg-elevated/50" 
          : "border-border-subtle bg-bg-secondary hover:border-border-bright hover:bg-bg-elevated/30",
        isUploading && "pointer-events-none opacity-50",
        className
      )}
    >
      <input
        type="file"
        className="absolute inset-0 cursor-pointer opacity-0"
        onChange={(e) => e.target.files?.[0] && onUpload(e.target.files[0])}
        accept=".pdf,.doc,.docx"
      />
      
      <div className="flex flex-col items-center gap-4 text-center">
        <div className={cn(
          "flex h-16 w-16 items-center justify-center rounded-full border border-border-subtle bg-bg-elevated transition-transform group-hover:scale-110",
          isDragActive && "border-lime-accent text-lime-accent"
        )}>
          {isUploading ? (
            <Loader2 className="h-8 w-8 animate-spin" />
          ) : (
            <FileUp className="h-8 w-8" />
          )}
        </div>
        
        <div className="space-y-1">
          <p className="font-display text-2xl font-bold tracking-tight text-text-primary">
            {isUploading ? "PROCESSNG RESUME..." : "DROP YOUR RESUME"}
          </p>
          <p className="text-xs font-mono uppercase tracking-widest text-text-dim">
            PDF, DOCX up to 10MB
          </p>
        </div>
      </div>

      {isDragActive && (
        <div className="absolute inset-0 z-10 animate-fade-up bg-lime-accent/5 p-4">
          <div className="h-full w-full border border-lime-accent border-dashed" />
        </div>
      )}
    </div>
  )
}
