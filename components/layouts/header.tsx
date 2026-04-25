"use client";

import { ModeToggler } from "@/components/theme/mode-toggler";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2 p-2">
            <span className="inline-block font-bold sm:text-xl text-primary">
              Resolve<span className="text-foreground">Flow</span>
            </span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/features"
              className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              About
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <ModeToggler />
          <nav className="flex items-center gap-2">
            <Link href="/sign-in">
              <Button variant="ghost" size="sm">
                Sign in
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button size="sm" className="font-bold">
                Get Started
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
