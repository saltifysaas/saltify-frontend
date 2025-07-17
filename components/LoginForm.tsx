"use client";

import { useState } from "react";
import api from "../utils/api";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      if (response.status === 200) {
        if (response.data.access_token) {
          Cookies.set("token", response.data.access_token);
        }
        setMessage("✅ Login successful! Redirecting...");
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      } else {
        setMessage("❌ Login failed.");
      }
    } catch (error: unknown) {
      if (
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        typeof (error as { response?: unknown }).response === "object"
      ) {
        const response = (error as { response?: { data?: { message?: string } } }).response;
        setMessage(`❌ ${response?.data?.message || "Server error."}`);
      } else if (error instanceof Error) {
        setMessage(`❌ ${error.message}`);
      } else {
        setMessage("❌ An unknown error occurred.");
      }
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">Welcome Back</h2>
        <p className="text-sm text-gray-400">Login to your Saltify account</p>
      </div>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 rounded bg-[#111827] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-3 rounded bg-[#111827] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
        required
      />

      <button
        type="submit"
        className="w-full bg-[#3B82F6] hover:bg-blue-600 text-white py-3 rounded font-medium"
      >
        Login
      </button>

      {message && <p className="text-sm text-gray-300">{message}</p>}

      <div className="text-center text-sm text-gray-400">
        Don’t have an account?{" "}
        <Link href="/auth/register" className="text-[#3B82F6] hover:underline">
          Register
        </Link>
      </div>
    </form>
  );
}
