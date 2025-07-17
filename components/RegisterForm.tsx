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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("✅ API base URL:", process.env.NEXT_PUBLIC_API_URL);
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await api.post("/auth/register", {
        businessName,
        ownerName,
        domain,
        email,
        password,
      });

      if (response.status === 200 || response.status === 201) {
        if (response.data.token) {
          Cookies.set("token", response.data.token);
        }
        setMessage("✅ Registered successfully! Redirecting...");
        setTimeout(() => router.push("/dashboard"), 1500);
      } else {
        setMessage("❌ Registration failed.");
      }
    } catch (error: unknown) {
      console.error(error);

      if (
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        typeof error.response === "object" &&
        error.response !== null &&
        "data" in error.response
      ) {
        const serverMessage = (error as any).response.data?.message;
        setMessage(`❌ ${serverMessage || "Server error."}`);
      } else if (error instanceof Error) {
        setMessage(`❌ ${error.message}`);
      } else {
        setMessage("❌ An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold">Create Your Account</h2>
        <p className="text-sm text-gray-400">Join Saltify in a few clicks</p>
      </div>

      <div className="space-y-3">
        <input
          type="text"
          placeholder="Business Name"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          className="input-field"
          required
        />
        <input
          type="text"
          placeholder="Owner Name"
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
          className="input-field"
          required
        />
        <input
          type="text"
          placeholder="Domain"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          className="input-field"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 rounded-lg font-medium text-white ${
          loading
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-[#3B82F6] hover:bg-blue-600"
        }`}
      >
        {loading ? "Registering..." : "Register"}
      </button>

      {message && <p className="text-sm text-center text-gray-300">{message}</p>}

      <div className="text-center text-sm text-gray-400">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-[#3B82F6] hover:underline">
          Login
        </Link>
      </div>
    </form>
  );
}
