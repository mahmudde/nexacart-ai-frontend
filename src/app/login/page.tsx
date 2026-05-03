import type { Metadata } from "next";
import { AuthPageShell } from "@/components/auth/auth-page-shell";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <AuthPageShell>
      <div className="mx-auto flex w-full max-w-6xl items-center justify-center">
        <LoginForm />
      </div>
    </AuthPageShell>
  );
}