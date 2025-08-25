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
    // Validate identifier if needed
    setStep(2);
  };

  const handleRegister = () => {
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    console.log("Registering:", form);
  };

  return (
    <form onSubmit={handleStart} className="space-y-4 text-[#00380e]">
      {/* Intro */}
      <p className="text-lg text-center text-gray-500">Create your Account</p>

      {/* STEP 1 */}
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

          {/* Continue — centered text & primary style */}
          <button
            type="submit"
            className="
              inline-flex w-full h-11 items-center justify-center
              rounded-md border
              bg-ui-buttonPrimaryBg text-ui-buttonPrimaryText border-ui-buttonPrimaryBorder
              hover:bg-ui-buttonPrimaryHover
              focus:outline-none focus:ring-2 focus:ring-ui-buttonPrimaryBorder
              transition
            "
          >
            <span className="font-semibold leading-none">Continue</span>
          </button>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="px-2 text-sm text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          {/* Third-party */}
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
                <Image src={provider.icon} alt={provider.name} width={20} height={20} className="mr-2" />
                Continue with {provider.name}
              </button>
            ))}
          </div>
        </>
      )}

      {/* STEP 2 */}
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

          {/* Register — same primary styling as Continue/Login */}
          <button
            type="button"
            onClick={handleRegister}
            className="
              inline-flex w-full h-11 items-center justify-center
              rounded-md border
              bg-ui-buttonPrimaryBg text-ui-buttonPrimaryText border-ui-buttonPrimaryBorder
              hover:bg-ui-buttonPrimaryHover
              focus:outline-none focus:ring-2 focus:ring-ui-buttonPrimaryBorder
              transition
            "
          >
            <span className="font-semibold leading-none">Register</span>
          </button>
        </>
      )}

      {/* Footer */}
      <p className="text-center text-sm mt-6">
        Already have an account? <Link href="/auth/login" className="underline">Login</Link>
      </p>
    </form>
  );
}
