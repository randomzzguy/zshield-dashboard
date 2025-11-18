import type { NextApiRequest, NextApiResponse } from "next";
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { address } = req.body || {};
  if (!address) return res.status(200).json({ privacyScore: 100, message: "Address has no transaction history" });
  const isShielded = typeof address === "string" && (address.startsWith("z") || address.startsWith("u"));
  const score = isShielded ? 90 : 70;
  res.status(200).json({ privacyScore: score, transactionCount: 0, isShielded });
}