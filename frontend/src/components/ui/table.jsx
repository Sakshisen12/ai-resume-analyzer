import * as React from "react";
import { cn } from "@/lib/utils";

export function Table({ className = "", ...props }) {
  return (
    <div className="relative w-full overflow-auto">
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  );
}

export function TableHeader({ className = "", ...props }) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b border-border-normal", className)}
      {...props}
    />
  );
}

export function TableBody({ className = "", ...props }) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
}

export function TableFooter({ className = "", ...props }) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "border-t bg-bg-elevated/50 font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  );
}

export function TableRow({ className = "", ...props }) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "border-b border-border-subtle transition-colors hover:bg-bg-secondary/50",
        className
      )}
      {...props}
    />
  );
}

export function TableHead({ className = "", ...props }) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "h-12 px-4 text-left align-middle font-mono text-[10px] uppercase tracking-widest text-text-dim",
        className
      )}
      {...props}
    />
  );
}

export function TableCell({ className = "", ...props }) {
  return (
    <td
      data-slot="table-cell"
      className={cn("p-4 align-middle text-text-primary", className)}
      {...props}
    />
  );
}
