import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { cacheGet, cacheSet } from "../../../lib/server/cache";
export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  try {
    const cached = cacheGet<number>("latestHeight");
    if (cached && typeof cached === "number") {
      return res.status(200).json({ success: true, source: "cache", latestHeight: cached });
    }
    const urls = [
      "https://api.zcha.in/v2/mainnet/blocks/latest",
      "https://explorer.zcha.in/api/v2/mainnet/blocks/latest",
      "https://api.zcha.in/v2/mainnet/network",
    ];
    for (const url of urls) {
      try {
        const r = await axios.get(url, { timeout: 4000 });
        const h = r.data?.height || r.data?.blockHeight || r.data?.data?.height || r.data?.chainHeight;
        if (typeof h === "number" && h > 0) {
          cacheSet("latestHeight", h, 30000);
          return res.status(200).json({ success: true, source: "http-fallback", latestHeight: h });
        }
      } catch {}
    }
    res.status(200).json({ success: true, source: "http-fallback", info: { error: "unavailable" } });
  } catch (e: any) {
    res.status(200).json({ success: true, source: "http-fallback", info: { error: e?.message || "error" } });
  }
}