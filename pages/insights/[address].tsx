import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";

export default function AddressInsightPage() {
  const router = useRouter();
  const { address } = router.query as { address?: string };
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const run = async () => {
      if (!address) return;
      setLoading(true);
      try {
        const { data } = await axios.post("/api/analysis/address-summary", { address });
        setSummary(data?.summary || null);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [address]);

  const title = summary ? `ZShield Insights: ${summary.isShielded ? "Shielded" : "Transparent"} · ${address}` : `ZShield Insights`;
  const description = summary ? `Tx: ${summary.txCount ?? "—"}, Balance: ${summary.balance ?? "—"} ZEC, Last seen: ${summary.lastSeen ?? "—"}` : "Shareable privacy insights for any Zcash address.";
  const url = typeof window !== "undefined" ? window.location.href : `https://zshield.xyz/insights/${address ?? ""}`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
      </Head>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Address Insights</h1>
        {!address ? (
          <div className="text-gray-700">No address provided.</div>
        ) : loading ? (
          <div className="text-gray-700">Loading…</div>
        ) : summary ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-3">
            <div className="font-mono break-all text-sm">{address}</div>
            <div>Type: {summary.isShielded ? "Shielded" : "Transparent"}</div>
            <div>Balance: {summary.balance ?? "—"} ZEC</div>
            <div>Tx Count: {summary.txCount ?? "—"}</div>
            <div>Last Seen: {summary.lastSeen ?? "—"}</div>
            {Array.isArray(summary.recommendations) && summary.recommendations.length > 0 && (
              <div>
                <div className="font-medium">Recommendations</div>
                <ul className="list-disc list-inside text-sm">
                  {summary.recommendations.map((r: string, i: number) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex gap-3 pt-2">
              <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded" onClick={() => window.print()}>Print Report</button>
              <a className="px-4 py-2 bg-maroon text-white rounded" href="/dashboard">Back to Dashboard</a>
            </div>
          </div>
        ) : (
          <div className="text-gray-700">No summary available.</div>
        )}
      </div>
    </div>
  );
}