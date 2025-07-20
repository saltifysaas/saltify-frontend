"use client";

import { useState } from "react";
import Link from "next/link";
import api from "@/lib/api"; // assuming you have an Axios instance setup here

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

      // Optional: Redirect to dashboard
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
      <div>
        <label>Email</label>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-md bg-transparent border border-[#14532d] text-white placeholder-gray-400 focus:outline-none"
        />
      </div>

      <div>
        <label>Password</label>
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-md bg-transparent border border-[#14532d] text-white placeholder-gray-400 focus:outline-none"
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#14532d] text-white font-semibold py-3 rounded-md hover:bg-[#166534] transition"
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <p className="text-center text-sm mt-4 text-[#ccc]">
        Don’t have an account?{" "}
        <Link href="/auth/register" className="text-[#90ee90] underline">
          Register
        </Link>
      </p>
    </form>
  );
}
