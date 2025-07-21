"use client";

import { useState } from "react";
import Link from "next/link";
import api from "@/lib/api"; // Axios instance with baseURL set from NEXT_PUBLIC_API_URL

export default function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/login", {
        email: form.email,
        password: form.password,
      });

      console.log("✅ Login success:", res.data);
      // Optionally redirect, store token, or show success toast
    } catch (err: unknown) {
  const error = err as { response?: { data?: unknown }; message?: string };
  console.error("Login failed:", error.response?.data || error.message);
} finally {
      setLoading(false);
    }
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
        disabled={loading}
        className={`w-full bg-[#14532d] text-white font-semibold py-3 rounded-md hover:bg-[#166534] transition ${
          loading && "opacity-70 cursor-not-allowed"
        }`}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <p className="text-center text-sm mt-4 text-gray-400">
        Don’t have an account?{" "}
        <Link href="/auth/register" className="text-white underline">
          Register
        </Link>
      </p>
    </form>
  );
}
