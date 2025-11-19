import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

type Item = {
  address: string;
  summary?: any;
};

const storageKey = "zshield_watchlist";

export default function Watchlist() {
  const [items, setItems] = useState<Item[]>([]);
  const [addr, setAddr] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(items));
    } catch {}
  }, [items]);

  const add = async () => {
    if (!addr) return;
    const exists = items.find((i) => i.address === addr);
    if (exists) return;
    setBusy(true);
    try {
      const { data } = await axios.post("/api/analysis/address-summary", { address: addr });
      setItems((prev) => [{ address: addr, summary: data?.summary }, ...prev]);
      setAddr("");
    } finally {
      setBusy(false);
    }
  };

  const remove = (address: string) => {
    setItems((prev) => prev.filter((i) => i.address !== address));
  };

  const refreshAll = async () => {
    if (items.length === 0) return;
    setBusy(true);
    try {
      const refreshed: Item[] = [];
      for (const it of items) {
        try {
          const { data } = await axios.post("/api/analysis/address-summary", { address: it.address });
          refreshed.push({ address: it.address, summary: data?.summary });
        } catch {
          refreshed.push({ address: it.address, summary: it.summary });
        }
      }
      setItems(refreshed);
    } finally {
      setBusy(false);
    }
  };

  const canAdd = useMemo(() => !!addr && !busy, [addr, busy]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Watchlist</h2>
        <button className="px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded" disabled={busy} onClick={refreshAll}>Refresh All</button>
      </div>
      <div className="flex gap-3 mb-4">
        <input className="flex-1 px-3 py-2 border rounded" placeholder="Add address" value={addr} onChange={(e) => setAddr(e.target.value)} />
        <button className="px-4 py-2 bg-maroon text-white rounded disabled:opacity-50" disabled={!canAdd} onClick={add}>{busy ? "Adding..." : "Add"}</button>
      </div>
      {items.length === 0 ? (
        <div className="text-sm text-gray-600">No addresses saved yet.</div>
      ) : (
        <div className="space-y-3">
          {items.map((it) => (
            <div key={it.address} className="border rounded p-3 flex items-center justify-between">
              <div className="space-y-1">
                <div className="font-mono text-sm break-all">{it.address}</div>
                {it.summary && (
                  <div className="text-xs text-gray-700 dark:text-gray-300">
                    <span className="mr-3">Type: {it.summary.isShielded ? "Shielded" : "Transparent"}</span>
                    <span className="mr-3">Tx: {it.summary.txCount ?? "—"}</span>
                    <span className="mr-3">Balance: {it.summary.balance ?? "—"} ZEC</span>
                    <a className="text-maroon underline" href={`/insights/${encodeURIComponent(it.address)}`}>Share</a>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <a className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded" href={`/insights/${encodeURIComponent(it.address)}`}>View</a>
                <button className="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded" onClick={() => remove(it.address)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}