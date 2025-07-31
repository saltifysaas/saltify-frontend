"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function LoginForm() {
  const [useOtp, setUseOtp] = useState(false);

  const [form, setForm] = useState({
    identifier: "",
    password: "",
    otp: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", {
      identifier: form.identifier,
      auth: useOtp ? form.otp : form.password,
    });

    // TODO: route to password or OTP auth
  };

  return (
<form onSubmit={handleSubmit} className="space-y-4 text-[#00332D]">
  <p className="text-sm text-center text-gray-600">
    Login to your <strong>Saltify</strong> account using email, mobile number, or any other service <span className="text-xs">(it’s secure & quick)</span>
  </p>
      {/* Input: Email or Mobile */}
      <input
        name="identifier"
        type="text"
        placeholder="Email or Mobile"
        value={form.identifier}
        onChange={handleChange}
        required
        className="w-full p-3 rounded-md bg-transparent border border-[#14532d] text-white placeholder-gray-400 focus:outline-none"
      />

      {/* Password or OTP Field */}
      {!useOtp ? (
        <>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-md bg-transparent border border-[#14532d] text-white placeholder-gray-400 focus:outline-none"
          />
          <p className="text-right text-sm">
            <button
              type="button"
              onClick={() => setUseOtp(true)}
              className="text-[#3B82F6] underline"
            >
              Login using OTP instead
            </button>
          </p>
        </>
      ) : (
        <>
          <input
            name="otp"
            type="text"
            placeholder="Enter OTP"
            value={form.otp}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-md bg-transparent border border-[#14532d] text-white placeholder-gray-400 focus:outline-none"
          />
          <p className="text-right text-sm">
            <button
              type="button"
              onClick={() => setUseOtp(false)}
              className="text-[#3B82F6] underline"
            >
              Use password instead
            </button>
          </p>
        </>
      )}

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-[#14532d] text-white font-semibold py-3 rounded-md hover:bg-[#00332D] transition"
      >
        Login
      </button>

      {/* Divider */}
      <div className="flex items-center my-4">
        <div className="flex-1 h-px bg-gray-300" />
        <span className="px-2 text-sm text-gray-400">or</span>
        <div className="flex-1 h-px bg-gray-300" />
      </div>

      {/* Third-party login */}
      <div className="space-y-2">
        {[
          { name: "Google", icon: "/icons/google.png" },
          { name: "Microsoft", icon: "/icons/microsoft.png" },
          { name: "LinkedIn", icon: "/icons/linkedin.png" },
        ].map((provider) => (
          <button
            key={provider.name}
            type="button"
            onClick={() => console.log(`Login with ${provider.name}`)} // TODO: real auth
            className="w-full flex items-center justify-center border border-gray-300 rounded-md py-2 hover:bg-gray-100 transition"
          >
            <Image
              src={provider.icon}
              alt={provider.name}
              width={20}
              height={20}
              className="mr-2"
            />
            Login with {provider.name}
          </button>
        ))}
      </div>

      {/* Footer */}
      <p className="text-center text-sm mt-6 text-[#00380e]">
        Don’t have an account?{" "}
        <Link href="/auth/register" className="underline">
          Register
        </Link>
      </p>
    </form>
  );
}
