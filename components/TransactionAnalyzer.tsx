import React from "react";

export function TransactionAnalyzer({ txid, setTxid, onAnalyze, loading }: { txid: string; setTxid: (v: string) => void; onAnalyze: () => void; loading: boolean }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4">Analyze Transaction</h2>
      <div className="flex gap-4">
        <input type="text" placeholder="Enter transaction ID" value={txid} onChange={(e) => setTxid(e.target.value)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg" />
        <button onClick={onAnalyze} disabled={loading || !txid} className="px-6 py-2 bg-maroon text-white rounded-lg hover:bg-red-900 disabled:opacity-50">{loading ? "Analyzing..." : "Analyze"}</button>
      </div>
    </div>
  );
}