"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";

import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";

export function ModeToggler() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <Toggle
      pressed={isDark}
      onPressedChange={(pressed) => setTheme(pressed ? "dark" : "light")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      disabled={!mounted}
      className={cn(
        "relative h-6 w-11 min-w-0 rounded-full p-0 overflow-hidden",
        "border-2 border-primary/20 hover:bg-transparent aria-pressed:bg-transparent",
        "transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 backdrop-blur-md dark:shadow-white/10 shadow-sm",
        !mounted && "opacity-40",
        isDark ? "bg-primary" : "bg-background",
      )}
    >
      {/* Sliding thumb */}
      <span
        className={cn(
          "absolute top-0.5 left-0.5 size-4 rounded-full flex items-center justify-center transition-transform duration-300 border border-white",
          "bg-primary text-primary-foreground",
          isDark
            ? "translate-x-5 bg-background text-foreground"
            : "translate-x-0",
        )}
      >
        <Sun
          className={cn(
            "absolute size-2.5 transition-all duration-300",
            isDark
              ? "rotate-90 scale-0 opacity-0"
              : "rotate-0 scale-100 opacity-100",
          )}
        />
        <Moon
          className={cn(
            "absolute size-2.5 transition-all duration-300",
            isDark
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-0 opacity-0",
          )}
        />
      </span>
    </Toggle>
  );
}
