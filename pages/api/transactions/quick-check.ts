import type { NextApiRequest, NextApiResponse } from "next";
import { allow } from "../../../lib/server/rateLimit";
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const ip = (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() || req.socket.remoteAddress || "unknown";
  if (!allow(`qc:${ip}`, 20, 60_000)) {
    return res.status(429).json({ privacyScore: 100, message: "Rate limit exceeded. Please try again shortly." });
  }
  const { address } = req.body || {};
  if (!address) return res.status(200).json({ privacyScore: 100, message: "Address has no transaction history" });
  const isShielded = typeof address === "string" && (address.startsWith("z") || address.startsWith("u"));
  const score = isShielded ? 90 : 70;
  res.status(200).json({ privacyScore: score, transactionCount: 0, isShielded });
}