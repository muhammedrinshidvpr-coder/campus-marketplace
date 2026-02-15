"use client";
import { useState, useEffect } from "react";

// 1. Tell React what an "Item" looks like
interface Item {
    _id: string;
    title: string;
    description: string;
    price: number;
    seller_email: string;
}

export default function MarketplaceFeed() {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // 2. Fetch the items as soon as the page loads!
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await fetch("https://campus-trade-backend-mase.onrender.com/api/items");
                if (!res.ok) throw new Error("Failed to load items");

                const data = await res.json();
                setItems(data); // Save the data to our React state
            } catch (err) {
                console.error("Fetch error:", err);
                setError("Could not load marketplace items. Is the backend running?");
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    return (
        <div className="min-h-screen bg-zinc-950 text-white p-8 font-sans">
            <div className="max-w-6xl mx-auto">

                {/* Header Section */}
                <div className="flex justify-between items-end mb-10 border-b border-zinc-800 pb-6">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">CampusTrade Feed</h1>
                        <p className="text-zinc-400">Discover gear from other students</p>
                    </div>
                    <a href="/sell" className="bg-white text-black px-5 py-2 rounded-lg font-semibold hover:bg-zinc-200 transition-colors">
                        + Sell Item
                    </a>
                </div>

                {/* Loading & Error States */}
                {loading && <div className="text-center text-zinc-400 mt-20 animate-pulse">Loading items...</div>}
                {error && <div className="text-center text-red-400 mt-20 bg-red-950/30 p-4 rounded-lg border border-red-900">{error}</div>}

                {/* The Grid of Items */}
                {!loading && !error && items.length === 0 && (
                    <div className="text-center text-zinc-500 mt-20">No items for sale yet. Be the first to post!</div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item) => (
                        <div key={item._id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-zinc-600 transition-colors shadow-lg flex flex-col">
                            <div className="flex justify-between items-start mb-4">
                                <h2 className="text-xl font-bold line-clamp-2">{item.title}</h2>
                                <span className="bg-blue-500/10 text-blue-400 font-bold px-3 py-1 rounded-full text-sm border border-blue-500/20 whitespace-nowrap ml-3">
                                    ₹{item.price}
                                </span>
                            </div>
                            <p className="text-zinc-400 text-sm mb-6 flex-grow line-clamp-3">{item.description}</p>

                            <div className="pt-4 border-t border-zinc-800 flex justify-between items-center">
                                <span className="text-xs text-zinc-500 truncate pr-2">{item.seller_email}</span>
                                <a href={`mailto:${item.seller_email}`} className="text-sm font-medium text-white hover:underline">
                                    Contact Seller
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}