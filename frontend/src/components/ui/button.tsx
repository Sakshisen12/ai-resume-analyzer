"use client"

import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center whitespace-nowrap transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-40 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary:
          "bg-lime-accent text-black font-bold font-display uppercase tracking-wider rounded-md hover:bg-white focus-visible:ring-lime-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary",
        secondary:
          "border border-border-normal bg-transparent text-text-secondary font-display uppercase tracking-wider rounded-md hover:border-lime-accent hover:text-lime-accent focus-visible:ring-2 focus-visible:ring-lime-accent",
        ghost:
          "bg-transparent text-text-secondary rounded-md hover:border hover:border-lime-accent hover:text-lime-accent focus-visible:ring-2 focus-visible:ring-lime-accent",
        destructive:
          "bg-red-500 text-white rounded-md hover:bg-red-600 focus-visible:ring-red-500",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        default: "h-10 px-6 text-sm",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "primary",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
