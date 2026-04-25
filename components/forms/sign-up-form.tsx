"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { SignUpInput, signUpSchema } from "@/validations/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, MailCheck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { toast } from "sonner";

export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpInput) => {
    // // TODO: Implement sign-up logic
    // console.log("Sign up data:", data);
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    await authClient.signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
      callbackURL: "/dashboard",
      fetchOptions: {
        onError: (ctx) => {
          setIsLoading(false);
          toast.error(
            ctx.error.message || "Sign up failed. Please try again.❌",
          );
        },
        onSuccess: () => {
          setIsLoading(false);
          toast.success("Account created! Please verify your email.✅");
          setIsEmailSent(true);
        },
        onRequest: () => {
          setIsLoading(true);
        },
      },
    });
  };

  const socialSubmit = async () => {
    await authClient.signIn.social(
      {
        provider: "google",
        callbackURL: "/dashboard",
      },
      {
        onError: (ctx) => {
          toast.error(
            ctx.error.message || "Sign up failed. Please try again.❌",
          );
        },
        onSuccess: () => {
          toast.success("Signed in successfully! Redirecting...");
        },
      },
    );
  };

  if (isEmailSent) {
    return (
      <div className="w-full max-w-md mx-auto space-y-8">
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <div className="h-16 w-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-2">
            <MailCheck size={32} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Check your inbox
          </h1>
          <p className="text-muted-foreground">
            We just sent a verification link to{" "}
            <span className="font-semibold text-foreground">
              {getValues("email")}
            </span>
            .<br />
            Click the link inside to activate your agency dashboard.
          </p>
        </div>

        <div className="pt-6 border-t border-border/50">
          <p className="text-center text-sm text-muted-foreground">
            You can safely close this window.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Create Account
        </h1>
        <p className="text-muted-foreground">
          Sign up to get started with your account
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Field>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            disabled={isLoading}
            {...register("name")}
            aria-invalid={!!errors.name}
          />
          {errors.name && <FieldError>{errors.name.message}</FieldError>}
        </Field>

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            disabled={isLoading}
            {...register("email")}
            aria-invalid={!!errors.email}
          />
          {errors.email && <FieldError>{errors.email.message}</FieldError>}
        </Field>

        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            disabled={isLoading}
            {...register("password")}
            aria-invalid={!!errors.password}
          />
          {errors.password && (
            <FieldError>{errors.password.message}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            disabled={isLoading}
            {...register("confirmPassword")}
            aria-invalid={!!errors.confirmPassword}
          />
          {errors.confirmPassword && (
            <FieldError>{errors.confirmPassword.message}</FieldError>
          )}
        </Field>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : (
            "Sign Up"
          )}
        </Button>
        <Button
          className="w-full text-lg border border-white"
          variant={"ghost"}
          type="button"
          size={"lg"}
          disabled={isLoading}
          onClick={socialSubmit}
        >
          <span className="flex items-center justify-center gap-2">
            Continue with Google <FaGoogle />
          </span>
        </Button>

        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="text-primary font-medium hover:underline"
          >
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
}
