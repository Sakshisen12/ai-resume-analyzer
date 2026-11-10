import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export function ProgressBar({ label, value = 0, className = "" }) {
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
  );
}
