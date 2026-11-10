import * as React from "react";
import { cn } from "@/lib/utils";

export function Progress({ className = "", value = 0, ...props }) {
  return (
    <div
      data-slot="progress"
      className={cn(
        "relative h-[3px] w-full overflow-hidden bg-bg-elevated rounded-none",
        className
      )}
      {...props}
    >
      <div
        className="bg-lime-accent h-full w-full flex-1 transition-all duration-300"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </div>
  );
}
