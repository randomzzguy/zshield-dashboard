import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function PayPage() {
  const router = useRouter();
  const { i, addr, amt } = router.query as { i?: string; addr?: string; amt?: string };
  const [verifying, setVerifying] = useState(false);
  const [paid, setPaid] = useState(false);
  const [txid, setTxid] = useState<string | null>(null);

  const verify = async () => {
    if (!i) return;
    setVerifying(true);
    try {
      const r = await fetch(`/api/payments/zec/verify?invoiceId=${encodeURIComponent(i)}&addr=${encodeURIComponent(String(addr || ""))}`);
      const j = await r.json();
      if (j?.paid) { setPaid(true); setTxid(j?.txid || null); }
    } finally {
      setVerifying(false);
    }
  };

  useEffect(() => {
    const t = setInterval(() => { if (!paid && i) verify(); }, 5000);
    return () => clearInterval(t);
  }, [i, paid]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-4">Pay with Zcash</h1>
        {!paid ? (
          <div className="space-y-3">
            <div>
              <div className="text-sm">Send exactly</div>
              <div className="font-mono text-xl">{amt} ZEC</div>
            </div>
            <div>
              <div className="text-sm">To address</div>
              <div className="font-mono break-all">{addr}</div>
            </div>
            <div className="flex gap-3 pt-2">
              <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded" onClick={() => navigator.clipboard.writeText(String(addr))}>Copy Address</button>
              <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded" onClick={() => navigator.clipboard.writeText(String(amt))}>Copy Amount</button>
              <button className="px-4 py-2 bg-maroon text-white rounded disabled:opacity-50" disabled={verifying} onClick={verify}>{verifying ? "Verifying..." : "I’ve Paid"}</button>
            </div>
            <div className="text-xs text-gray-600">We poll the blockchain every 5s to confirm your payment.</div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="text-green-600 font-medium">Payment confirmed</div>
            {txid && <div className="font-mono text-xs">TXID: {txid}</div>}
            <a className="px-4 py-2 bg-maroon text-white rounded inline-block" href="/dashboard">Go to Dashboard</a>
          </div>
        )}
      </div>
    </div>
  );
}