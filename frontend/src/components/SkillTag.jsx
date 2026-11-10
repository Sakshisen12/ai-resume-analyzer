import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function SkillTag({ skill, status = "detected", className = "" }) {
  const isMatch = status === "matched" || status === "detected";

  return (
    <Badge 
      variant={isMatch ? "default" : "destructive"} 
      className={cn(
        "rounded-none px-3 py-1", 
        isMatch ? "bg-lime-accent text-black" : "bg-transparent text-red-500 border-red-500",
        className
      )}
    >
      {skill}
    </Badge>
  );
}
