import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { cacheGet, cacheSet } from "../../../lib/server/cache";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { address } = req.body || {};
  if (!address || typeof address !== "string") return res.status(200).json({ success: false, error: "address_required" });

  const cacheKey = `addr:${address}`;
  const cached = cacheGet<any>(cacheKey);
  if (cached) return res.status(200).json({ success: true, source: "cache", summary: cached });

  const isShielded = address.startsWith("z") || address.startsWith("u");
  let txCount: number | null = null;
  let lastSeen: string | null = null;
  let balance: number | null = null;
  let source = "heuristic";

  const candidates: Array<{ url: string; parse: (d: any) => void }> = [
    { url: `https://sochain.com/api/get_address_balance/ZEC/${address}`, parse: (d) => { balance = Number(d?.data?.confirmed_balance || 0); source = "sochain"; } },
    { url: `https://api.blockchair.com/zcash/dashboards/address/${address}`, parse: (d) => {
      const info = d?.data?.[address]?.address;
      txCount = info?.transaction_count ?? txCount;
      lastSeen = info?.last_transaction_time ?? lastSeen;
      source = "blockchair";
    } },
  ];

  for (const c of candidates) {
    try { const r = await axios.get(c.url, { timeout: 5000 }); c.parse(r.data); } catch {}
  }

  const recommendations: string[] = [];
  if (!isShielded) recommendations.push("Use shielded (z/u) address where possible");
  if ((txCount || 0) > 10) recommendations.push("Address shows activity patterns – consider rotating");

  const summary = { address, isShielded, txCount, lastSeen, balance, recommendations };
  cacheSet(cacheKey, summary, 60000);
  res.status(200).json({ success: true, source, summary });
}