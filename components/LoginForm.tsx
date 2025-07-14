"use client";

import { useState, useEffect } from "react";
import api from "../utils/api";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [subdomain, setSubdomain] = useState("");

  useEffect(() => {
    const hostname = window.location.hostname;
    const parts = hostname.split(".");
    if (parts.length > 2) {
      setSubdomain(parts[0]);
    } else {
      setSubdomain("");
    }
    console.log("✅ Client Subdomain:", parts[0]);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
        // ✅ Subdomain is NOT sent to backend anymore — this fixes 400!
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
    } catch (error) {
      console.error(error);
      setMessage("❌ An error occurred.");
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4 w-80">
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
        Login
      </button>
      {message && <p className="mt-2">{message}</p>}
    </form>
  );
}
