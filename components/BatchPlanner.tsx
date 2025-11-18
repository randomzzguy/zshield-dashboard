import React, { useState } from "react";
import axios from "axios";

type Recipient = { address: string; amount: number };

export default function BatchPlanner() {
  const [rows, setRows] = useState<Recipient[]>([{ address: "", amount: 0 }]);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const updateRow = (i: number, key: keyof Recipient, value: string) => {
    const next = [...rows];
    if (key === "amount") next[i].amount = Number(value || 0);
    else next[i].address = value;
    setRows(next);
  };

  const addRow = () => setRows([...rows, { address: "", amount: 0 }]);
  const removeRow = (i: number) => setRows(rows.filter((_, idx) => idx !== i));

  const preview = async () => {
    setLoading(true);
    try {
      const transactions = rows.map((r) => ({ toAddress: r.address, amount: r.amount }));
      const { data } = await axios.post("/api/transactions/batch", { transactions });
      setResult(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Batch Plan Preview</h2>
      <div className="space-y-3">
        {rows.map((r, i) => (
          <div key={i} className="flex gap-3">
            <input className="flex-1 px-3 py-2 border rounded" placeholder="Recipient address" value={r.address} onChange={(e) => updateRow(i, "address", e.target.value)} />
            <input className="w-36 px-3 py-2 border rounded" type="number" step="0.00000001" placeholder="Amount" value={r.amount} onChange={(e) => updateRow(i, "amount", e.target.value)} />
            <button className="px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded" onClick={() => removeRow(i)}>Remove</button>
          </div>
        ))}
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded" onClick={addRow}>Add Recipient</button>
          <button className="px-4 py-2 bg-maroon text-white rounded" disabled={loading} onClick={preview}>{loading ? "Calculating..." : "Preview Savings"}</button>
        </div>
      </div>
      {result && (
        <div className="mt-4 text-sm">
          <div>Total amount: {result.combined?.totalAmount} ZEC</div>
          <div>Estimated fee: {result.combined?.estimatedFee} ZEC</div>
          <div>Should batch: {String(result.savings?.shouldBatch)}</div>
          <div>Individual cost: {result.savings?.individualCost} ZEC</div>
          <div>Batched cost: {result.savings?.batchedCost} ZEC</div>
          <div>Savings: {result.savings?.savings} ZEC ({result.savings?.savingsPercent}%)</div>
        </div>
      )}
    </div>
  );
}