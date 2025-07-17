
import AuthLayout from "@/components/AuthLayout";
import RegisterForm from "@/components/RegisterForm";
import type { Metadata } from "next";

export const generateMetadata = (): Metadata => ({
  title: "Register | SALTify",
  description: "Create your SALTify account and start building smarter commerce apps.",
  robots: "index, follow",
  openGraph: {
    title: "Register with SALTify",
    description: "Secure onboarding for your AI-driven commerce platform.",
    siteName: "SALTify",
    url: "https://saltify.ai/auth/register",
    type: "website",
  },
});

export default function RegisterPage() {
  return (
    <AuthLayout variant="register">
      <RegisterForm />
    </AuthLayout>
  );
}
