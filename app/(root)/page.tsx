import { ArrowRight, Bot, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Header } from "@/components/layouts/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { checkServerSession } from "@/lib/check-server-session";

const HomePage = async () => {
  const session = await checkServerSession();

  if (session?.session) {
    redirect("/dashboard");
  }
  return (
    <section className="flex flex-col min-h-screen relative overflow-hidden bg-background">
      {/* Abstract Background Gradients */}
      {/* <div className="pointer-events-none absolute inset-0 -z-10 flex justify-center">
        <div className="absolute top-[-20%] left-[-10%] h-125 w-125 rounded-full bg-primary/20 blur-[120px] opacity-50 mix-blend-multiply" />
        <div className="absolute top-[20%] right-[-10%] h-100 w-100 rounded-full bg-primary-500/20 blur-[100px] opacity-40 mix-blend-multiply" />
      </div> */}

      <Header />

      <main className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 pt-12 pb-24 max-w-7xl mx-auto w-full">
        {/* App-like Hero Section */}
        <div className="flex flex-col items-center text-center space-y-8 min-w-fit pt-10 md:pt-20">
          <Badge
            variant="secondary"
            className="px-4 py-2 rounded-full text-sm font-medium border border-primary/10 bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2 text-primary">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              ResolveFlow AI is now live
            </span>
          </Badge>

          <h1 className="text-5xl md:text-7xl font-black text-foreground leading-[1.1] md:tracking-wider">
            Triage Support Tickets <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-b from-primary to-primary-foreground">
              Before They Escalate
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            The intelligent B2B dashboard that intercepts, categorizes, and
            routes incoming support emails so your team resolves issues faster.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full pt-4">
            <Button
              asChild
              size="lg"
              className="w-full md:max-w-6/12 rounded-full h-14 px-8 text-base font-bold shadow-xl shadow-primary/25 transition-transform hover:-translate-y-1 active:scale-95"
            >
              <Link href="/registration" className="">
                Start <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Feature Cards - App-like Grid */}
        <div className="mt-24 w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="flex flex-col p-8 rounded-[2rem] bg-background/60 backdrop-blur-md border-border/40 shadow-sm hover:shadow-md transition-all hover:bg-background/80 dark:shadow-white/10">
            <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
              <Zap className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-foreground">
              Instant Routing
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Automatically assign high-priority tickets to the right agent
              instantly, cutting down response times by up to 50%.
            </p>
          </Card>

          <Card className="flex flex-col p-8 rounded-[2rem] bg-linear-to-b from-primary/10 to-transparent backdrop-blur-md border-primary/20 shadow-sm hover:shadow-md transition-all hover:border-primary/30 relative overflow-hidden dark:shadow-white/10">
            <div className="absolute top-0 right-0 p-4">
              <Badge className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full">
                Pro
              </Badge>
            </div>
            <div className="h-14 w-14 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground mb-6">
              <Bot className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-foreground">
              AI Triage
            </h3>
            <p className="text-foreground/80 font-medium leading-relaxed">
              Let AI read, categorize, and draft initial responses so your human
              agents can focus on solving complex issues.
            </p>
          </Card>

          <Card className="flex flex-col p-8 rounded-[2rem] bg-background/60 backdrop-blur-md border-border/40 shadow-sm hover:shadow-md transition-all hover:bg-background/80 dark:shadow-white/10">
            <div className="h-14 w-14 rounded-2xl bg-secondary/50 flex items-center justify-center text-primary mb-6">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-foreground">
              B2B Ready
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Built specifically for B2B scale. Map SLA policies, route by
              account, and track resolution metrics automatically.
            </p>
          </Card>
        </div>
      </main>
    </section>
  );
};

export default HomePage;
