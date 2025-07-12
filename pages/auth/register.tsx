import { useState } from "react";
import api from "../../utils/api";
import Cookies from "js-cookie";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/register", {
        email,
        password,
      });

      if (response.status === 201 || response.status === 200) {
        // Save token if your backend returns one
        if (response.data.token) {
          Cookies.set("token", response.data.token);
        }
        setMessage("✅ Registered successfully!");
      } else {
        setMessage("❌ Registration failed.");
      }
    } catch (error: any) {
      console.error(error);
      setMessage("❌ Error: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Register</h1>
      <form onSubmit={handleRegister} className="flex flex-col gap-4 w-64">
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
      </form>
      {message && <p className="mt-4">{message}</p>}
    </main>
  );
}
