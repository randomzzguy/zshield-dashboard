import React, { useState } from "react";
import { subscribeToPremium } from "../lib/subscription";

export default function PremiumCTA() {
  const [loading, setLoading] = useState(false);
  const go = async () => {
    setLoading(true);
    try { await subscribeToPremium(); } finally { setLoading(false); }
  };
  return (
    <div className="bg-gradient-to-r from-maroon to-red-900 rounded-lg shadow-xl p-6 text-white">
      <h2 className="text-2xl font-bold mb-2">Go Premium</h2>
      <p className="mb-4">Unlimited analyses, batch automation, and real-time monitoring.</p>
      <button className="px-6 py-2 bg-white text-maroon rounded" disabled={loading} onClick={go}>{loading ? "Redirecting..." : "Subscribe"}</button>
    </div>
  );
}