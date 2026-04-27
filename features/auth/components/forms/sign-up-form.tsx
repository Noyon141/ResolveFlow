"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { submitSignUp } from "../../action/auth";
import { type SignUpInput, signUpSchema } from "../../validations";

const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
  });

  const startRegistration = async (data: SignUpInput) => {
    setIsLoading(true);
    await submitSignUp({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      },
    });
    setIsLoading(false);
  };

  return (
    <>
      <div className="w-full max-w-md mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Create Account
          </h1>
          <p className="text-muted-foreground">
            Sign up to get started with your account
          </p>
        </div>

        <form onSubmit={handleSubmit(startRegistration)} className="space-y-6">
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

          <Button
            type="submit"
            className="w-full font-black tracking-wider text-xl"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
              </>
            ) : (
              "Sign Up"
            )}
          </Button>
          {/* <Button
            className="w-full text-lg border border-white"
            variant={"ghost"}
            type="button"
            size={"lg"}
            disabled={isLoading}
            // onClick={{}}
          >
            <span className="flex items-center justify-center gap-2">
              Continue with Google <FaGoogle />
            </span>
          </Button> */}

          {/* <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="text-primary font-medium hover:underline"
            >
              Sign in
            </Link>
          </div> */}
        </form>
      </div>
    </>
  );
};

export default SignUpForm;
