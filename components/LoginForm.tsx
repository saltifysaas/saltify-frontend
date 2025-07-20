"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login submit:", form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        className="w-full p-3 rounded-md bg-transparent border border-[#14532d] text-white placeholder-gray-400 focus:outline-none"
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
        className="w-full p-3 rounded-md bg-transparent border border-[#14532d] text-white placeholder-gray-400 focus:outline-none"
      />

      <button
        type="submit"
        className="w-full bg-[#14532d] text-white font-semibold py-3 rounded-md hover:bg-[#166534] transition"
      >
        Login
      </button>

      <p className="text-center text-sm mt-4 text-[#00380e]">
        Don’t have an account?{" "}
        <Link href="/auth/register" className="text-[#00380e] underline">
          Register
        </Link>
      </p>
    </form>
  );
}
