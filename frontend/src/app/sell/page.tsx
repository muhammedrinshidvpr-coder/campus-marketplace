"use client";
import { useState } from "react";

export default function SellItem() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [sellerEmail, setSellerEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // <--- 1. NEW AI LOADING STATE --->
    const [isGenerating, setIsGenerating] = useState(false);

    // <--- 2. NEW MAGIC AI FUNCTION --->
    const handleAIGenerate = async () => {
        if (!title) {
            setError("Please enter an Item Title first so the AI knows what to write about!");
            return;
        }

        setIsGenerating(true);
        setError("");

        try {
            console.log("Asking AI for a description...");
            const res = await fetch("http://127.0.0.1:8000/api/generate-description", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: title }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError("Failed to generate AI description.");
            } else {
                // Magically fill the description box!
                setDescription(data.description);
            }
        } catch (err) {
            console.error(err);
            setError("Cannot connect to AI backend.");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setMessage("");
        setLoading(true);

        try {
            const res = await fetch("http://127.0.0.1:8000/api/items", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: title,
                    description: description,
                    price: parseFloat(price),
                    seller_email: sellerEmail
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.detail || "Failed to post item.");
            } else {
                setMessage("Item posted successfully to the marketplace!");
                setTitle("");
                setDescription("");
                setPrice("");
                setSellerEmail("");
            }
        } catch (err) {
            setError("Cannot connect to server. Is the Python backend running?");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-950 font-sans text-white p-4">
            <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
                <h1 className="text-3xl font-bold text-center mb-2">Sell an Item</h1>
                <p className="text-zinc-400 text-center mb-8">List your gear on CampusTrade</p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-1">Item Title</label>
                        <input
                            type="text"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                            placeholder="e.g. Engineering Drawing Board"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-1">Price (₹)</label>
                        <input
                            type="number"
                            required
                            min="0"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                            placeholder="e.g. 500"
                        />
                    </div>

                    <div>
                        {/* <--- 3. NEW AI BUTTON ADDED NEXT TO THE LABEL ---> */}
                        <div className="flex justify-between items-end mb-1">
                            <label className="block text-sm font-medium text-zinc-300">Description</label>
                            <button
                                type="button"
                                onClick={handleAIGenerate}
                                disabled={isGenerating || !title}
                                className="text-xs bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 border border-blue-500/30 px-3 py-1 rounded-md transition-colors disabled:opacity-50 flex items-center gap-1"
                            >
                                {isGenerating ? "✨ Thinking..." : "✨ Magic AI"}
                            </button>
                        </div>

                        <textarea
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 resize-none h-32"
                            placeholder="Slightly used, in perfect condition..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-1">Your College Email</label>
                        <input
                            type="email"
                            required
                            value={sellerEmail}
                            onChange={(e) => setSellerEmail(e.target.value)}
                            className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                            placeholder="student@tkmce.ac.in"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-white text-black font-semibold rounded-lg px-4 py-3 mt-4 hover:bg-zinc-200 transition-colors disabled:bg-zinc-600 disabled:text-zinc-400"
                    >
                        {loading ? "Posting..." : "Post to Marketplace"}
                    </button>
                </form>

                {error && <div className="mt-6 p-4 bg-red-950/50 border border-red-900 rounded-lg text-red-200 text-sm text-center">{error}</div>}
                {message && <div className="mt-6 p-4 bg-green-950/50 border border-green-900 rounded-lg text-green-200 text-sm text-center">{message}</div>}
            </div>
        </div>
    );
}