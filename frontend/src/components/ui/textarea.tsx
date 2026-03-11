import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-20 w-full rounded-md border border-border-normal bg-bg-secondary px-4 py-2 text-sm text-text-primary transition-colors placeholder:text-text-dim hover:border-border-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-accent disabled:cursor-not-allowed disabled:opacity-40 aria-invalid:border-destructive aria-invalid:ring-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
