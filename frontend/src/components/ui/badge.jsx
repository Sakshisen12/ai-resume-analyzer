import * as React from "react";
import { cn } from "@/lib/utils";

const badgeStyles = {
  default: "bg-lime-accent text-black border-lime-accent",
  secondary: "bg-transparent text-text-secondary border-border-normal hover:border-lime-accent hover:text-lime-accent",
  destructive: "bg-transparent text-red-500 border-red-500",
  outline: "border-border-normal text-text-secondary",
};

export function Badge({
  className = "",
  variant = "default",
  children,
  ...props
}) {
  const variantClass = badgeStyles[variant] || badgeStyles.default;

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-sm border px-2.5 py-0.5 text-[10px] font-mono font-medium uppercase tracking-widest transition-colors",
        variantClass,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export const badgeVariants = ({ variant = "default", className = "" } = {}) => {
  return cn(
    "inline-flex items-center justify-center rounded-sm border px-2.5 py-0.5 text-[10px] font-mono font-medium uppercase tracking-widest transition-colors",
    badgeStyles[variant] || badgeStyles.default,
    className
  );
};
