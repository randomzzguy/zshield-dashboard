import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { cacheGet, cacheSet } from "../../../lib/server/cache";
import { initSentry, capture } from "../../../lib/server/sentry";
export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  initSentry();
  try {
    const cached = cacheGet<number>("latestHeight");
    if (cached && typeof cached === "number") {
      return res.status(200).json({ success: true, source: "cache", latestHeight: cached });
    }
    const candidates: Array<{ url: string; parse: (data: any) => number | null }> = [
      { url: "https://api.zcha.in/v2/mainnet/blocks/latest", parse: (d) => d?.height ?? d?.blockHeight ?? d?.data?.height ?? null },
      { url: "https://explorer.zcha.in/api/v2/mainnet/blocks/latest", parse: (d) => d?.height ?? d?.blockHeight ?? d?.data?.height ?? null },
      { url: "https://api.zcha.in/v2/mainnet/network", parse: (d) => d?.chainHeight ?? d?.height ?? null },
      { url: "https://sochain.com/api/get_info/ZEC", parse: (d) => d?.data?.blocks ?? null },
      { url: "https://api.blockchair.com/zcash/stats", parse: (d) => d?.data?.best_block_height ?? null },
    ];
    for (const c of candidates) {
      try {
        const r = await axios.get(c.url, { timeout: 5000 });
        const h = c.parse(r.data);
        if (typeof h === "number" && h > 0) {
          cacheSet("latestHeight", h, 60000);
          return res.status(200).json({ success: true, source: "http-fallback", latestHeight: h });
        }
      } catch (e) { capture(e); }
    }
    res.status(200).json({ success: true, source: "http-fallback", info: { error: "unavailable" } });
  } catch (e: any) {
    capture(e);
    res.status(200).json({ success: true, source: "http-fallback", info: { error: e?.message || "error" } });
  }
}