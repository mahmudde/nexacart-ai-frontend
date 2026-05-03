"use client";

import Link from "next/link";
import { z } from "zod";
import { Bot, Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "@/hooks/use-auth";
import { authService } from "@/services/auth.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const demoCredentials = [
  {
    label: "User Demo",
    email: "user.demo@shopai.com",
    password: "User@123456",
  },
  {
    label: "Manager Demo",
    email: "manager.demo@shopai.com",
    password: "Manager@123456",
  },
  {
    label: "Admin Demo",
    email: "admin.demo@shopai.com",
    password: "Admin@123456",
  },
];

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const loginMutation = useLogin();

  const handleSocialLogin = async (provider: "google" | "facebook") => {
    try {
      const { error } = await authService.socialLogin(provider);
      if (error) {
        toast.error(error.message || `Failed to login with ${provider}`);
      }
    } catch (error) {
      toast.error(`An unexpected error occurred during ${provider} login`);
      console.error(error);
    }
  };

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    loginMutation.mutate(values);
  };

  const handleDemoFill = (email: string, password: string) => {
    form.setValue("email", email);
    form.setValue("password", password);
  };

  return (
    <div className="glass w-full max-w-md rounded-[2.5rem] p-6 shadow-2xl md:p-8">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
          <Bot className="h-7 w-7" />
        </div>

        <h1 className="text-3xl font-semibold tracking-tight">
          Welcome back
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Login to continue shopping smarter with NexaCart AI.
        </p>
      </div>

      <div className="mb-6 grid gap-3 sm:grid-cols-2">
        <Button
          type="button"
          variant="outline"
          className="h-12 rounded-full bg-background/50"
          onClick={() => handleSocialLogin("google")}
        >
          Continue with Google
        </Button>

        <Button
          type="button"
          variant="outline"
          className="h-12 rounded-full bg-background/50"
          onClick={() => handleSocialLogin("facebook")}
        >
          Continue with Facebook
        </Button>
      </div>

      <div className="mb-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">
          or continue with email
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <div className="mb-6 grid gap-2 sm:grid-cols-3">
        {demoCredentials.map((credential) => (
          <Button
            key={credential.email}
            type="button"
            variant="outline"
            size="sm"
            className="rounded-full bg-background/50 text-xs"
            onClick={() =>
              handleDemoFill(credential.email, credential.password)
            }
          >
            {credential.label}
          </Button>
        ))}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="you@example.com"
                    className="h-12 rounded-full bg-background/60 px-5"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="h-12 rounded-full bg-background/60 px-5 pr-12"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="h-12 w-full rounded-full"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign in
          </Button>
        </form>
      </Form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Do not have an account?{" "}
        <Link href="/register" className="font-medium text-foreground">
          Create account
        </Link>
      </p>
    </div>
  );
}