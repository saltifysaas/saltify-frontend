"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire up Supabase or API login logic
  };

  return (
    <form onSubmit={handleLogin} className="space-y-5">
      {/* Headline */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-light">Welcome Back</h2>
        <p className="text-sm text-shade-soft">Login to your SALTify account</p>
      </div>

      {/* Fields */}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-3 rounded bg-light text-primary placeholder-muted border border-shade-green focus:outline-none focus:ring-2 focus:ring-accent"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-3 rounded bg-light text-primary placeholder-muted border border-shade-green focus:outline-none focus:ring-2 focus:ring-accent"
        required
      />

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-accent hover:bg-shade-green text-highlight py-3 rounded font-semibold transition"
      >
        Login
      </button>

      {/* Footer */}
      <div className="text-center text-sm text-muted">
        Don’t have an account?{" "}
        <Link href="/auth/register" className="text-accent hover:underline">
          Register
        </Link>
      </div>
    </form>
  );
}
