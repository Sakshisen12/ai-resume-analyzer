import { cn } from "@/lib/utils"

interface SectionLabelProps {
  label: string
  title: string
  className?: string
  titleClassName?: string
}

export function SectionLabel({ label, title, className, titleClassName }: SectionLabelProps) {
  return (
    <div className={cn("space-y-1", className)}>
      <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-lime-accent">
        {label}
      </span>
      <h2 className={cn("font-display text-4xl font-bold tracking-tighter text-text-primary md:text-5xl", titleClassName)}>
        {title}
      </h2>
    </div>
  )
}
