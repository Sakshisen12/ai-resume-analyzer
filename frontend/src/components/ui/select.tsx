"use client"

import * as React from "react"
import { Select as SelectPrimitive } from "@base-ui/react/select"
import { cn } from "@/lib/utils"
import { ChevronDown, Check } from "lucide-react"

function Select({ ...props }: SelectPrimitive.Root.Props<unknown>) {
  return <SelectPrimitive.Root {...props} />
}

function SelectTrigger({ className, children, ...props }: SelectPrimitive.Trigger.Props) {
  return (
    <SelectPrimitive.Trigger
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-border-normal bg-bg-secondary px-4 py-2 text-sm text-text-primary transition-colors hover:border-border-bright focus-visible:outline-none focus:ring-2 focus:ring-lime-accent disabled:cursor-not-allowed disabled:opacity-40",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown size={16} className="text-text-dim" />
    </SelectPrimitive.Trigger>
  )
}

function SelectPortal({ ...props }: SelectPrimitive.Portal.Props) {
  return <SelectPrimitive.Portal {...props} />
}

function SelectContent({ className, ...props }: SelectPrimitive.Popup.Props) {
  return (
    <SelectPortal>
      <SelectPrimitive.Popup
        className={cn(
          "z-50 min-w-32 overflow-hidden rounded-md border border-border-subtle bg-bg-secondary p-1 text-text-primary shadow-2xl duration-150",
          className
        )}
        {...props}
      />
    </SelectPortal>
  )
}

function SelectItem({ className, children, ...props }: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors data-[highlighted]:bg-bg-elevated data-[highlighted]:text-text-primary disabled:pointer-events-none disabled:opacity-40",
        className
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check size={14} className="text-lime-accent" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

function SelectValue({ ...props }: SelectPrimitive.Value.Props) {
  return <SelectPrimitive.Value {...props} />
}

export {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
}
