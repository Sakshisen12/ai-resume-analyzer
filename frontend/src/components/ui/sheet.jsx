import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const SheetContext = React.createContext(null);

export function Sheet({ children }) {
  const [open, setOpen] = React.useState(false);
  return (
    <SheetContext.Provider value={{ open, setOpen }}>
      {children}
    </SheetContext.Provider>
  );
}

export function SheetTrigger({ children, render }) {
  const { setOpen } = React.useContext(SheetContext);
  return (
    <div onClick={() => setOpen(true)} className="inline-block cursor-pointer">
      {render || children}
    </div>
  );
}

export function SheetClose({ children, render }) {
  const { setOpen } = React.useContext(SheetContext);
  return (
    <div onClick={() => setOpen(false)} className="cursor-pointer">
      {render || children}
    </div>
  );
}

export function SheetContent({ side = "left", className = "", children }) {
  const { open, setOpen } = React.useContext(SheetContext);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setOpen(false)}
      />
      <div
        className={cn(
          "relative z-50 h-full w-[280px] bg-bg-primary p-0 border-r border-border-subtle shadow-xl",
          className
        )}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 rounded-sm text-text-secondary hover:text-text-primary focus:outline-none cursor-pointer p-1"
        >
          <X size={18} />
          <span className="sr-only">Close</span>
        </button>
        {children}
      </div>
    </div>
  );
}
