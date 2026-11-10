import * as React from "react";
import { cn } from "@/lib/utils";

const buttonStyles = {
  variants: {
    primary:
      "bg-lime-accent text-black font-bold font-display uppercase tracking-wider rounded-md hover:bg-white focus-visible:ring-lime-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary",
    secondary:
      "border border-border-normal bg-transparent text-text-secondary font-display uppercase tracking-wider rounded-md hover:border-lime-accent hover:text-lime-accent focus-visible:ring-2 focus-visible:ring-lime-accent",
    ghost:
      "bg-transparent text-text-secondary rounded-md hover:border hover:border-lime-accent hover:text-lime-accent focus-visible:ring-2 focus-visible:ring-lime-accent",
    destructive:
      "bg-red-500 text-white rounded-md hover:bg-red-600 focus-visible:ring-red-500",
  },
  sizes: {
    sm: "h-8 px-3 text-xs",
    default: "h-10 px-6 text-sm",
    lg: "h-12 px-8 text-base",
    icon: "h-10 w-10 p-0",
  },
};

export function Button({
  className = "",
  variant = "primary",
  size = "default",
  type = "button",
  ...props
}) {
  const variantClass = buttonStyles.variants[variant] || buttonStyles.variants.primary;
  const sizeClass = buttonStyles.sizes[size] || buttonStyles.sizes.default;

  return (
    <button
      type={type}
      className={cn(
        "inline-flex shrink-0 items-center justify-center whitespace-nowrap transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer",
        variantClass,
        sizeClass,
        className
      )}
      {...props}
    />
  );
}

export const buttonVariants = ({ variant = "primary", size = "default", className = "" } = {}) => {
  return cn(
    "inline-flex shrink-0 items-center justify-center whitespace-nowrap transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer",
    buttonStyles.variants[variant] || buttonStyles.variants.primary,
    buttonStyles.sizes[size] || buttonStyles.sizes.default,
    className
  );
};
