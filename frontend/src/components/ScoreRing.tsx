"use client"

import { useCountUp } from "@/hooks/useCountUp"
import { getScoreColor, getScoreLabel } from "@/lib/score-utils"
import { cn } from "@/lib/utils"

interface ScoreRingProps {
  score: number
  size?: number
  animated?: boolean
  className?: string
}

export function ScoreRing({ score, size = 160, animated = true, className }: ScoreRingProps) {
  const displayCount = animated ? useCountUp(score) : score
  const color = getScoreColor(score)
  
  // SVG Math
  const strokeWidth = 8
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  return (
    <div 
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#1A1A1A"
          strokeWidth={strokeWidth}
        />
        {/* Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span 
          className="font-display font-bold leading-none tracking-tighter"
          style={{ fontSize: size * 0.28, color }}
        >
          {displayCount}
        </span>
        <span 
          className="font-mono text-[9px] uppercase tracking-[0.2em] text-text-dim mt-1"
        >
          {getScoreLabel(score)}
        </span>
      </div>
    </div>
  )
}
