import React, { createContext, useContext, useState } from "react";
import { cn } from "@/lib/utils";

const TabsContext = createContext(null);

export function Tabs({ defaultValue, value, onValueChange, className = "", children, ...props }) {
  const [selectedTab, setSelectedTab] = useState(value || defaultValue || "");
  const currentTab = value !== undefined ? value : selectedTab;

  const handleTabChange = (val) => {
    setSelectedTab(val);
    if (onValueChange) onValueChange(val);
  };

  return (
    <TabsContext.Provider value={{ currentTab, handleTabChange }}>
      <div className={cn("group/tabs flex flex-col gap-6 w-full", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabsList({ className = "", children, ...props }) {
  return (
    <div
      className={cn(
        "group/tabs-list inline-flex w-full items-center justify-start border-b border-border-subtle bg-transparent p-0",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function TabsTrigger({ value, className = "", children, ...props }) {
  const context = useContext(TabsContext);
  const isActive = context?.currentTab === value;

  return (
    <button
      type="button"
      onClick={() => context?.handleTabChange(value)}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 px-4 py-3 text-[11px] font-mono font-medium uppercase tracking-widest transition-all cursor-pointer",
        isActive ? "text-lime-accent" : "text-text-dim hover:text-text-primary",
        "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-lime-accent after:transition-opacity",
        isActive ? "after:opacity-100" : "after:opacity-0",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, className = "", children, ...props }) {
  const context = useContext(TabsContext);
  if (context?.currentTab !== value) return null;

  return (
    <div className={cn("w-full text-sm outline-none animate-in fade-in-0 duration-150", className)} {...props}>
      {children}
    </div>
  );
}
