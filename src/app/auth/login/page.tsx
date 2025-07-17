
import AuthLayout from "@/components/AuthLayout";
import LoginForm from "@/components/LoginForm";
import type { Metadata } from "next";

export const generateMetadata = (): Metadata => ({
  title: "Login | SALTify",
  description: "Sign in to your SALTify account and continue building smarter commerce apps.",
  robots: "index, follow",
  openGraph: {
    title: "Login to SALTify",
    description: "Access your SALTify dashboard and manage AI-powered commerce features.",
    siteName: "SALTify",
    url: "https://saltify.ai/auth/login",
    type: "website",
  },
});

export default function LoginPage() {
  return (
    <AuthLayout variant="login">
      <LoginForm />
    </AuthLayout>
  );
}
