"use client";

import { useState } from "react";

export default function LoginPage() {
  const [workspaceName, setWorkspaceName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!workspaceName.trim()) {
      alert("Workspace Name is required");
      return;
    }

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workspaceName, email, password }),
      });

      if (!res.ok) {
        throw new Error("Login failed");
      }

      alert("Login successful!");
      // Optional: redirect user to their workspace dashboard
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <section className="max-w-md mx-auto mt-8 p-6 border border-gray-300 rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col">
          <span className="mb-1">Workspace Name</span>
          <input
            type="text"
            value={workspaceName}
            onChange={(e) => setWorkspaceName(e.target.value)}
            required
            placeholder="Your workspace name"
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

        <button
          type="submit"
          className="bg-black text-white p-2 rounded hover:bg-gray-800"
        >
          Login
        </button>
      </form>
    </section>
  );
}
