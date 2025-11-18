import type { NextApiRequest, NextApiResponse } from "next";
export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ status: "ok", lightwalletdUrl: process.env.NEXT_PUBLIC_LIGHTWALLETD_URL || "mainnet.lightwalletd.com:9067" });
}