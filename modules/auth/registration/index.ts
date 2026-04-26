import { authClient } from "@/lib/auth-client";
import { SignInInput, SignUpInput } from "@/modules/auth/validations";
import { toast } from "sonner";

export const registration = async ({ data }: { data: SignUpInput }) => {
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

export const login = async ({ data }: { data: SignInInput }) => {
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
