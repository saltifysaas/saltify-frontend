"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function RegisterForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState({
    identifier: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    // You can validate email/mobile format here if needed
    console.log("Entered:", form.identifier);
    setStep(2);
  };

  const handleRegister = () => {
    // TODO: Final submit logic — validate password, hit backend, etc.
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    console.log("Registering:", form);
  };

  return (
    <form onSubmit={handleStart} className="space-y-4 text-[#00380e]">
      {/* Intro Message */}
      <p className="text-sm text-center text-gray-600">
        Create your free <strong>Saltify</strong> Account using your email ID, mobile number, or any other service <span className="text-xs">(it’s free!)</span>
      </p>

      {/* Step 1: Ask for Email or Mobile */}
      {step === 1 && (
        <>
          <input
            name="identifier"
            type="text"
            placeholder="Enter your email or mobile number"
            value={form.identifier}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-md bg-transparent border border-[#00380e] placeholder-gray-400 text-[#00380e] focus:outline-none"
          />

          <button
            type="submit"
            className="w-full bg-[#00380e] text-white font-normal py-3 rounded-md hover:bg-[#166534] transition"
          >
            Continue
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
                onClick={() => console.log(`Continue with ${provider.name}`)}
                className="w-full flex items-center justify-center border border-gray-300 rounded-md py-2 hover:bg-gray-100 transition"
              >
                <Image
                  src={provider.icon}
                  alt={provider.name}
                  width={20}
                  height={20}
                  className="mr-2"
                />
                Continue with {provider.name}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Step 2: Set Password */}
      {step === 2 && (
        <>
          <input
            name="password"
            type="password"
            placeholder="Create a password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-md bg-transparent border border-[#00380e] placeholder-gray-400 text-[#00380e] focus:outline-none"
          />

          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-md bg-transparent border border-[#00380e] placeholder-gray-400 text-[#00380e] focus:outline-none"
          />

          <button
            type="button"
            onClick={handleRegister}
            className="w-full bg-[#00380e] text-white font-normal py-3 rounded-md hover:bg-[#166534] transition"
          >
            Register
          </button>
        </>
      )}

      {/* Already have account? */}
      <p className="text-center text-sm mt-6">
        Already have an account?{" "}
        <Link href="/auth/login" className="underline">
          Login
        </Link>
      </p>
    </form>
  );
}
