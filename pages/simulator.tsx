import React, { useState } from "react";
import { api } from "../lib/api";

export default function Simulator() {
  const [fromAddress, setFromAddress] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState(1);
  const [fee, setFee] = useState(0.0001);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const simulate = async () => {
    setLoading(true);
    try {
      const data = await api.simulateTransaction({ fromAddress, toAddress, amount, fee });
      setResult(data);
    } catch {}
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Transaction Simulator</h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
          <input className="w-full px-4 py-2 border rounded" placeholder="From address" value={fromAddress} onChange={(e) => setFromAddress(e.target.value)} />
          <input className="w-full px-4 py-2 border rounded" placeholder="To address" value={toAddress} onChange={(e) => setToAddress(e.target.value)} />
          <div className="flex gap-4">
            <input className="flex-1 px-4 py-2 border rounded" type="number" step="0.00000001" placeholder="Amount" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
            <input className="flex-1 px-4 py-2 border rounded" type="number" step="0.00000001" placeholder="Fee" value={fee} onChange={(e) => setFee(Number(e.target.value))} />
          </div>
          <button className="px-6 py-2 bg-maroon text-white rounded" disabled={loading} onClick={simulate}>{loading ? "Simulating..." : "Simulate"}</button>
        </div>

        {result && (
          <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-2">Privacy Result</h2>
            <pre className="text-sm overflow-x-auto">{JSON.stringify(result.privacy, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}