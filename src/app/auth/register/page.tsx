import AuthLayout from "@/components/AuthLayout";
import RegisterForm from "@/components/RegisterForm";
console.log('API endpoint is:', process.env.NEXT_PUBLIC_API_URL);


export default function RegisterPage() {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
}
