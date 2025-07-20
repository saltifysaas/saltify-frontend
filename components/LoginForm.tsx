"use client";

import { useState } from "react";
import Link from "next/link";
import api from "@/utils/api"; // adjust path if needed

export default function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/auth/login", form);
      console.log("✅ Login success:", res.data);
      // Optional: redirect to dashboard
      // router.push("/dashboard");
    } catch (err: any) {
      console.error("❌ Login error:", err);
      setError(err?.response?.data?.message || "Something went wrong");
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

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#14532d] text-white font-semibold py-3 rounded-md hover:bg-[#166534] transition"
      >
        {loading ? "Logging in..." : "Login"}
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
