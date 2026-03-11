"use client"

import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-bg-secondary group-[.toaster]:text-text-primary group-[.toaster]:border-border-normal group-[.toaster]:shadow-lg group-[.toaster]:rounded-md group-[.toaster]:font-mono group-[.toaster]:text-xs group-[.toaster]:pl-4",
          description: "group-[.toast]:text-text-dim",
          actionButton:
            "group-[.toast]:bg-lime-accent group-[.toast]:text-black group-[.toast]:font-bold",
          cancelButton:
            "group-[.toast]:bg-bg-elevated group-[.toast]:text-text-secondary",
          success: "group-[.toaster]:border-l-[4px] group-[.toaster]:border-l-lime-accent",
          error: "group-[.toaster]:border-l-[4px] group-[.toaster]:border-l-red-500",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
