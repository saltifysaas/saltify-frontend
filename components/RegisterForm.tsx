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
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    console.log("✅ API base URL:", process.env.NEXT_PUBLIC_API_URL);
  }, []);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/register", {
        businessName,
        ownerName,
        domain,
        email,
        password,
      });

      if ((response.status === 201 || response.status === 200) && response.data.token) {
        Cookies.set("token", response.data.token);
        setMessage("✅ Registered successfully! Redirecting...");
        setTimeout(() => router.push("/dashboard"), 1500);
      } else {
        setMessage("❌ Registration failed.");
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ An unknown error occurred.");
    }
  };

  return (
    <div className="w-full max-w-md p-6 bg-[#0f2b22] rounded-2xl shadow-lg text-[#F9FAFB] mx-auto">
      {/* Logo */}
      <div className="flex flex-col items-center mb-6">
        <div className="flex items-center gap-2">
          <div className="bg-[#D1FAE5] text-[#065F46] rounded-full p-2">
            <span className="font-bold text-lg">S</span>
          </div>
          <h1 className="text-2xl font-bold">Saltify</h1>
        </div>
      </div>

      {/* Trial Banner */}
      <div className="bg-[#F9FAFB] text-[#111827] font-semibold text-center rounded-md py-3 mb-6">
        Sign up for 14 days free trial
      </div>

      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Business Name</label>
          <input
            type="text"
            placeholder="Your Brand Name"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="w-full p-3 rounded-md bg-transparent border border-[#14532d] text-white placeholder-gray-400 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Owner Name</label>
          <input
            type="text"
            placeholder="First Last"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            className="w-full p-3 rounded-md bg-transparent border border-[#14532d] text-white placeholder-gray-400 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Domain</label>
          <input
            type="text"
            placeholder="yourbrand.com"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="w-full p-3 rounded-md bg-transparent border border-[#14532d] text-white placeholder-gray-400 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Work Email</label>
          <input
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-md bg-transparent border border-[#14532d] text-white placeholder-gray-400 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-md bg-transparent border border-[#14532d] text-white placeholder-gray-400 focus:outline-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#14532d] text-white font-semibold py-3 rounded-md hover:bg-[#166534] transition"
        >
          CONTINUE
        </button>

        {message && <p className="text-center text-sm mt-2">{message}</p>}
      </form>

      {/* Social Auth */}
      <div className="space-y-3 mt-6">
        <button className="w-full flex items-center justify-center gap-2 bg-[#F9FAFB] text-[#111827] font-medium py-3 rounded-md hover:bg-gray-200 transition">
          <span className="font-bold">G</span> Sign up with Google
        </button>

        <button className="w-full flex items-center justify-center gap-2 bg-[#F9FAFB] text-[#111827] font-medium py-3 rounded-md hover:bg-gray-200 transition">
          <span className="font-bold">in</span> Sign up with LinkedIn
        </button>
      </div>

      {/* Footer */}
      <p className="text-center text-sm mt-6">
        Already have an account?{" "}
        <Link href="/auth/login" className="underline">
          Login
        </Link>
      </p>
    </div>
  );
}
