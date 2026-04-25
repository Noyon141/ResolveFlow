"use client";

import { ModeToggler } from "@/components/theme/mode-toggler";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import * as React from "react";

export const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  // Reusable navigation links
  const navLinks = [
    { href: "/features", label: "Features" },
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: "About" },
  ];

  return (
    <header className="sticky top-4 z-50 w-full px-4 md:px-8">
      {/* 
        App-like pill shape:
        - Floating with a `top-4` margin
        - Rounded-full for an app dock look
        - Glassmorphism effect via background/backdrop-blur
      */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between rounded-full border border-border/50 bg-background/80 px-6 backdrop-blur-md dark:shadow-white/10 shadow-sm transition-all">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <h1 className="inline-block font-black text-xl tracking-tight text-primary">
            Resolve<span className="text-foreground">Flow</span>
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 items-center justify-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-all hover:text-primary hover:scale-105 active:scale-95"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <ModeToggler />
          <div className="flex items-center gap-2 border-l pl-4 border-border/50">
            <Link href="/sign-in">
              <Button variant="ghost" size="sm" className="rounded-full">
                Sign in
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button
                size="sm"
                className="rounded-full font-bold shadow-md hover:shadow-lg transition-transform hover:-translate-y-0.5"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu (Hamburger) */}
        <div className="flex items-center gap-2 md:hidden">
          <ModeToggler />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full shrink-0"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col rounded-l-2xl">
              <SheetHeader>
                <SheetTitle className="text-left font-black tracking-tight text-primary">
                  Resolve<span className="text-foreground">Flow</span>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-6 mt-8">
                <nav className="flex flex-col gap-4 items-center">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium text-foreground transition-colors hover:text-primary "
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="flex flex-col gap-3 mt-4 pt-6 border-t border-border">
                  <Link href="/sign-in" onClick={() => setIsOpen(false)}>
                    <Button
                      variant="outline"
                      className="w-full justify-center rounded-xl h-12"
                    >
                      Sign in
                    </Button>
                  </Link>
                  <Link href="/sign-up" onClick={() => setIsOpen(false)}>
                    <Button className="w-full justify-center rounded-xl h-12 font-bold">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
