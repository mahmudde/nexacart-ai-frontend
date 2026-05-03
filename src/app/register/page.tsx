import type { Metadata } from "next";
import { AuthPageShell } from "@/components/auth/auth-page-shell";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Register",
};

export default function RegisterPage() {
  return (
    <AuthPageShell>
      <div className="mx-auto flex w-full max-w-6xl items-center justify-center">
        <RegisterForm />
      </div>
    </AuthPageShell>
  );
}