"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterForm() {
  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [subdomain, setSubdomain] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ fullName, mobileNumber, workEmail, subdomain, password });
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      {[
        { label: "Full Name", value: fullName, setValue: setFullName, placeholder: "First and Last" },
        { label: "Mobile Number", value: mobileNumber, setValue: setMobileNumber, placeholder: "+91" },
        { label: "Work Email", value: workEmail, setValue: setWorkEmail, placeholder: "you@company.com" },
        { label: "Subdomain", value: subdomain, setValue: setSubdomain, placeholder: "yourbrand" },
        { label: "Password", value: password, setValue: setPassword, placeholder: "••••••••", type: "password" },
      ].map((field, idx) => (
        <div key={idx}>
          <label className="block mb-1 font-medium">{field.label}</label>
          <input
            type={field.type || "text"}
            placeholder={field.placeholder}
            value={field.value}
            onChange={(e) => field.setValue(e.target.value)}
            className="w-full p-3 rounded-md bg-transparent border border-[#000000] rounded 2xl text-white placeholder-gray-400 focus:outline-none"
          />
        </div>
      ))}

      <button
        type="submit"
        className="w-full bg-[#14532d] text-white font-block py-3 rounded-2xl hover:bg-[#166534] transition"
      >
        Regiser Kar
      </button>

      <div className="space-y-3 mt-6">
        <button className="w-full flex items-center justify-center gap-2 bg-[#F9FAFB] text-[#111827] font-medium py-3 rounded-md hover:bg-gray-200 transition">
          <span className="font-bold">G</span> Sign up with Google
        </button>
        <button className="w-full flex items-center justify-center gap-2 bg-[#F9FAFB] text-[#111827] font-medium py-3 rounded-md hover:bg-gray-200 transition">
          <span className="font-bold">in</span> Sign up with LinkedIn
        </button>
      </div>

      <p className="text-center text-sm mt-6">
        Already have an account?{" "}
        <Link href="/auth/login" className="underline">
          Login
        </Link>
      </p>
    </form>
  );
}
