import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-bg-elevated", className)}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-bg-hover to-transparent animate-scan" />
    </div>
  )
}

export { Skeleton }
