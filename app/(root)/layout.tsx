import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "../globals.css";
import TanstackProvider from "@/components/tanstack-provider";
import { ThemeProvider } from "@/components/theme/theme-provider";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Resolve Flow",
  description: "A B2B triage dashboard that intercepts incoming support emails",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col w-full"
        suppressHydrationWarning
      >
        <TanstackProvider>
          <ThemeProvider
            attribute={"class"}
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main className="w-full min-h-full flex flex-col">{children}</main>
            <Toaster />
          </ThemeProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
