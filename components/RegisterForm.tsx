"use client";

import { useState } from "react";
import Link from "next/link";
import api from "@/utils/api"; // adjust path if needed

export default function RegisterForm() {
  const [form, setForm] = useState({
    domain: "",       // 🔁 renamed from 'subdomain' for consistency
    fullName: "",
    mobile: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    
    try {
      const res = await api.post("/register", form);
      console.log("API response:", res.data);
      // 🔁 Optionally handle success UI or redirect
    } catch (err) {
      console.error("Registration failed:", err);
      // 🔁 Optionally show error toast
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2.5">
      {/* Fields */}
      {[
        { label: "Domain", name: "domain", placeholder: "domain.saltifysaas.com", type: "text" },
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
            className="w-full p-3 rounded-md bg-transparent border border-[#00380e] text-[#00380e] placeholder-gray-400 focus:outline-none"
          />
        </div>
      ))}

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          type="submit"
          className="w-[200px] bg-[#00380e] text-white font-normal py-3 rounded-md hover:bg-[#166534] transition"
        >
          Register
        </button>
      </div>

      {/* Footer */}
      <p className="text-center text-sm mt-6">
        Already have an account?{" "}
        <Link href="/auth/login" className="underline">
          Login
        </Link>
      </p>
    </form>
  );
}
