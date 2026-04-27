import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import type { SignInInput, SignUpInput } from "../validations";

export const submitSignUp = async ({ data }: { data: SignUpInput }) => {
  await authClient.signUp.email({
    name: data.name,
    email: data.email,
    password: data.password,

    fetchOptions: {
      onError: (ctx) => {
        toast.error(ctx.error.message || "Sign up failed. Please try again.❌");
      },
      onSuccess: () => {
        toast.success("Account created! Please verify your email.✅");
      },
      onRequest: () => {},
    },
  });
};

export const submitSignin = async ({ data }: { data: SignInInput }) => {
  await authClient.signIn.email({
    email: data.email,
    password: data.password,
    fetchOptions: {
      onError: (ctx) => {
        toast.error(ctx.error.message || "Login failed. Please try again.❌");
      },
      onSuccess: () => {
        toast.success("Login successful! Welcome back.✅");
      },
      onRequest: () => {},
    },
  });
};
