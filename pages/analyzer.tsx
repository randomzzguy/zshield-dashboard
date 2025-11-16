import React, { useState } from "react";
import { api } from "../lib/api";
import { TransactionCard } from "../components/TransactionCard";

export default function AddressAnalyzer() {
  const [address, setAddress] = useState("");
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const analyzeAddress = async () => {
    setLoading(true);
    try {
      const response = await api.getAddressTransactions(address);
      setTransactions(response.transactions || []);
    } catch {}
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Address Privacy Monitor</h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Monitor Any Zcash Address</h2>
          <p className="text-gray-600 mb-4">Paste any Zcash address (t-addr or z-addr) to analyze its privacy patterns</p>
          <div className="flex gap-4">
            <input type="text" placeholder="Enter Zcash address (e.g., t1abc... or zs1xyz...)" value={address} onChange={(e) => setAddress(e.target.value)} className="flex-1 px-4 py-3 border border-gray-300 rounded-lg" />
            <button onClick={analyzeAddress} disabled={loading || !address} className="px-8 py-3 bg-maroon text-white rounded-lg hover:bg-red-900">{loading ? "Analyzing..." : "Analyze"}</button>
          </div>
        </div>
        {transactions.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">Privacy Pattern Analysis</h3>
            <div className="space-y-4">
              {transactions.map((tx, idx) => (
                <TransactionCard key={idx} transaction={tx} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}