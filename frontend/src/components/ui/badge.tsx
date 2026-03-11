import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-sm border border-border-normal px-2.5 py-0.5 text-[10px] font-mono font-medium uppercase tracking-widest transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-accent disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      variant: {
        default: "bg-lime-accent text-black border-lime-accent",
        secondary: "bg-transparent text-text-secondary border-border-normal hover:border-lime-accent hover:text-lime-accent",
        destructive: "bg-transparent text-red-500 border-red-500",
        outline: "border-border-normal text-text-secondary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
