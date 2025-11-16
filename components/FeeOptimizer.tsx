import React, { useState } from "react";
import { api } from "../lib/api";

export function FeeOptimizer() {
  const [urgency, setUrgency] = useState("medium");
  const [privacyMode, setPrivacyMode] = useState(true);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const estimate = async () => {
    setLoading(true);
    try {
      const data = await api.getFeeEstimate(urgency, privacyMode);
      setResult(data);
    } catch {}
    setLoading(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Fee Optimizer</h2>
      <div className="flex gap-4 mb-4">
        <select className="px-4 py-2 border rounded" value={urgency} onChange={(e) => setUrgency(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={privacyMode} onChange={(e) => setPrivacyMode(e.target.checked)} />
          Privacy Mode
        </label>
        <button className="px-6 py-2 bg-maroon text-white rounded" disabled={loading} onClick={estimate}>{loading ? "Estimating..." : "Estimate"}</button>
      </div>
      {result && (
        <div className="text-sm">
          <div>Recommended Fee: {result.recommendedFee} ZEC</div>
          <div>Mempool Size: {result.mempoolSize}</div>
          <div>Broadcast: {result.broadcastRecommendation?.reasoning}</div>
        </div>
      )}
    </div>
  );
}