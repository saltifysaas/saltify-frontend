"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [workspaceName, setWorkspaceName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!workspaceName.trim()) {
      alert("Workspace Name is required");
      return;
    }

    // Example: Call your backend API here
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workspaceName, email, password }),
      });

      if (!res.ok) {
        throw new Error("Registration failed");
      }

      alert("Registration successful!");
      // Optional: redirect user to login or dashboard
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <section className="max-w-md mx-auto mt-8 p-6 border border-gray-300 rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col">
          <span className="mb-1">Workspace Name</span>
          <input
            type="text"
            value={workspaceName}
            onChange={(e) => setWorkspaceName(e.target.value)}
            required
            placeholder="Your company or workspace"
            className="border border-gray-300 p-2 rounded"
          />
        </label>

        <label className="flex flex-col">
          <span className="mb-1">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-300 p-2 rounded"
          />
        </label>

        <label className="flex flex-col">
          <span className="mb-1">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border border-gray-300 p-2 rounded"
          />
        </label>

        <label className="flex flex-col">
          <span className="mb-1">Confirm Password</span>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="border border-gray-300 p-2 rounded"
          />
        </label>

        <button
          type="submit"
          className="bg-black text-white p-2 rounded hover:bg-gray-800"
        >
          Register
        </button>
      </form>
    </section>
  );
}
