"use client";

import { useState } from "react";
import Link from "next/link";
import api from "@/utils/api";

export default function RegisterForm() {
  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
    email: "",
    subdomain: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      businessName: form.subdomain,
      ownerName: form.fullName,
      email: form.email,
      domain: form.subdomain,
      password: form.password,
    };

    try {
      const res = await api.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        payload
      );
      console.log("✅ Registration successful:", res.data);
      // Optional: toast, login redirect, or onboarding steps
    } catch (err: unknown) {
      const error = err as { response?: { data?: unknown }; message?: string };
      console.error("❌ Register failed:", error.response?.data || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2.5">
      {[
        { label: "Subdomain", name: "subdomain", placeholder: "yourbrand", type: "text" },
        { label: "Full Name", name: "fullName", placeholder: "First and Last", type: "text" },
        { label: "Mobile Number", name: "mobile", placeholder: "+91", type: "tel" },
        { label: "Work Email", name: "email", placeholder: "you@company.com", type: "email" },
        { label: "Password", name: "password", placeholder: "••••••••", type: "password" },
      ].map((field) => (
        <div key={field.name}>
          <label className="block mb-.5 font-medium">{field.label}</label>
          <input
            type={field.type}
            name={field.name}
            value={form[field.name as keyof typeof form]}
            onChange={handleChange}
            placeholder={field.placeholder}
            className="w-full p-3 rounded-md bg-transparent border border-[#14532d] text-white placeholder-gray-400 focus:outline-none"
            required
          />
        </div>
      ))}

      <div className="flex justify-center">
        <button
          type="submit"
          className="w-[200px] bg-[#14532d] text-white font-normal py-3 rounded-md hover:bg-[#166534] transition"
        >
          Register
        </button>
      </div>

      <p className="text-center text-sm mt-6">
        Already have an account?{" "}
        <Link href="/auth/login" className="underline">
          Login
        </Link>
      </p>
    </form>
  );
}
