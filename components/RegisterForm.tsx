"use client";

import { useState, useEffect } from "react";
import api from "../utils/api";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

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
    <form onSubmit={handleRegister} className="flex flex-col gap-4 w-80">
      <input
        type="text"
        placeholder="Business Name"
        value={businessName}
        onChange={(e) => setBusinessName(e.target.value)}
        className="p-2 border border-gray-300 rounded"
        required
      />
      <input
        type="text"
        placeholder="Owner Name"
        value={ownerName}
        onChange={(e) => setOwnerName(e.target.value)}
        className="p-2 border border-gray-300 rounded"
        required
      />
      <input
        type="text"
        placeholder="Domain"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
        className="p-2 border border-gray-300 rounded"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 border border-gray-300 rounded"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 border border-gray-300 rounded"
        required
      />
      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
      >
        Register
      </button>
      {message && <p className="mt-2">{message}</p>}
    </form>
  );
}
