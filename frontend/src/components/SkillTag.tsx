import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface SkillTagProps {
  skill: string
  status: "matched" | "missing" | "detected" | "gap"
  className?: string
}

export function SkillTag({ skill, status, className }: SkillTagProps) {
  const getVariant = () => {
    switch (status) {
      case "matched":
      case "detected":
        return "default"
      case "missing":
      case "gap":
        return "destructive"
      default:
        return "secondary"
    }
  }

  return (
    <Badge 
      variant={getVariant()} 
      className={cn(
        "rounded-none px-3 py-1", 
        status === "matched" || status === "detected" ? "bg-lime-accent text-black" : "bg-transparent text-red-500 border-red-500",
        className
      )}
    >
      {skill}
    </Badge>
  )
}
