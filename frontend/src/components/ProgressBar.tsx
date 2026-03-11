"use client"

import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface ProgressBarProps {
  label: string
  value: number
  className?: string
}

export function ProgressBar({ label, value, className }: ProgressBarProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-end justify-between">
        <span className="text-[10px] font-mono uppercase tracking-widest text-text-secondary">
          {label}
        </span>
        <span className="text-[10px] font-mono font-bold text-text-primary">
          {value}%
        </span>
      </div>
      <Progress value={value} className="h-[2px]" />
    </div>
  )
}
