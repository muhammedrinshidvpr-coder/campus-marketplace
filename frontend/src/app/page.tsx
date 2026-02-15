"use client";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // --- 1. NEW LOGS ADDED HERE ---
    console.log("Button clicked! Current name:", name, "Email:", email);

    setError("");
    setMessage("");
    setLoading(true);

    try {
      console.log("Attempting to connect to backend at http://127.0.0.1:8000...");

      const res = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name, college_email: email }),
      });

      console.log("Response received! Status code:", res.status);
      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || "Registration failed");
      } else {
        setMessage("Account created successfully! Welcome to CampusTrade.");
        setName("");
        setEmail("");
      }
    } catch (err) {
      console.error("Connection Error:", err); // --- 2. LOG THE EXACT ERROR ---
      setError("Cannot connect to server. Check the browser console (F12) for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 font-sans text-white p-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
        <h1 className="text-3xl font-bold text-center mb-2">CampusTrade</h1>
        <p className="text-zinc-400 text-center mb-8">Exclusive Student Marketplace</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              placeholder="First Year Test"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">College Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              placeholder="student@tkmce.ac.in"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-semibold rounded-lg px-4 py-3 mt-2 hover:bg-zinc-200 transition-colors disabled:bg-zinc-600 disabled:text-zinc-400"
          >
            {loading ? "Registering..." : "Join Marketplace"}
          </button>
        </form>

        {/* Dynamic Alert Messages */}
        {error && (
          <div className="mt-6 p-4 bg-red-950/50 border border-red-900 rounded-lg text-red-200 text-sm text-center">
            {error}
          </div>
        )}

        {message && (
          <div className="mt-6 p-4 bg-green-950/50 border border-green-900 rounded-lg text-green-200 text-sm text-center">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}