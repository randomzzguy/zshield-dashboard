import React, { useState } from "react";
import axios from "axios";

export default function AddressInsights() {
  const [addr, setAddr] = useState("");
  const [insights, setInsights] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/analysis/address-summary", { address: addr });
      setInsights(data?.summary || null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Address Insights</h2>
      <div className="flex gap-3 mb-4">
        <input className="flex-1 px-3 py-2 border rounded" placeholder="Enter Zcash address" value={addr} onChange={(e) => setAddr(e.target.value)} />
        <button className="px-4 py-2 bg-maroon text-white rounded" disabled={loading || !addr} onClick={analyze}>{loading ? "Analyzing..." : "Analyze"}</button>
      </div>
      {insights && (
        <div className="text-sm space-y-2">
          <div>Type: {insights.isShielded ? "Shielded" : "Transparent"}</div>
          <div>Balance: {insights.balance ?? "—"} ZEC</div>
          <div>Tx Count: {insights.txCount ?? "—"}</div>
          <div>Last Seen: {insights.lastSeen ?? "—"}</div>
          {Array.isArray(insights.recommendations) && insights.recommendations.length > 0 && (
            <div>
              <div className="font-medium">Recommendations:</div>
              <ul className="list-disc list-inside">
                {insights.recommendations.map((r: string, i: number) => <li key={i}>{r}</li>)}
              </ul>
            </div>
          )}
          <div className="pt-2 flex gap-3">
            <a className="px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded" href={`/insights/${encodeURIComponent(addr)}`}>Open Share Page</a>
            <button
              className="px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded"
              onClick={() => {
                const link = `${window.location.origin}/insights/${encodeURIComponent(addr)}`;
                navigator.clipboard.writeText(link);
              }}
            >
              Copy Share Link
            </button>
          </div>
        </div>
      )}
    </div>
  );
}