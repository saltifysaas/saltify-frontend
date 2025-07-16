"use client";

import { useState, useEffect } from "react";
import api from "../utils/api";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterForm() {
  const router = useRouter();

  const [businessName, setBusinessName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [domain, setDomain] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log("✅ API base URL:", process.env.NEXT_PUBLIC_API_URL);
    console.log("✅ Axios base URL:", api.defaults.baseURL);
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/register", {
        businessName,
        ownerName,
        domain,
        email,
        password,
      });

      if (response.status === 201 || response.status === 200) {
        if (response.data.token) {
          Cookies.set("token", response.data.token);
        }
        setMessage("✅ Registered successfully! Redirecting...");
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      } else {
        setMessage("❌ Registration failed.");
      }
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof Error) {
        setMessage(`❌ Error: ${error.message}`);
      } else {
        setMessage("❌ An unknown error occurred.");
      }
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold mb-1">Create Your Account</h2>
        <p className="text-sm text-gray-400">Join Saltify in a few clicks</p>
      </div>

      <input
        type="text"
        placeholder="Business Name"
        value={businessName}
        onChange={(e) => setBusinessName(e.target.value)}
        className="w-full p-3 rounded bg-[#111827] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
        required
      />
      <input
        type="text"
        placeholder="Owner Name"
        value={ownerName}
        onChange={(e) => setOwnerName(e.target.value)}
        className="w-full p-3 rounded bg-[#111827] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
        required
      />
      <input
        type="text"
        placeholder="Domain"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
        className="w-full p-3 rounded bg-[#111827] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
        required
      />
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
        Register
      </button>

      {message && <p className="text-sm text-gray-300">{message}</p>}

      <div className="text-center text-sm text-gray-400">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-[#3B82F6] hover:underline">
          Login
        </Link>
      </div>
    </form>
  );
}
