import type { NextApiRequest, NextApiResponse } from "next";

function computeAmount(invoiceId: number, base: number) {
  const variant = (invoiceId % 997) / 1e8;
  return +(base + variant).toFixed(8);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "method_not_allowed" });
  const list = (process.env.ZEC_PAYMENT_TADDRS || "").split(",").map((s) => s.trim()).filter(Boolean);
  const single = process.env.ZEC_PAYMENT_TADDR;
  if (!single && list.length === 0) return res.status(400).json({ error: "zec_payment_address_missing" });
  const base = parseFloat(process.env.ZEC_PRICE_ZEC || "0.05");
  const invoiceId = Math.floor(Date.now() / 1000) + Math.floor(Math.random() * 1000);
  const amountZec = computeAmount(invoiceId, base);
  const expiresAt = Date.now() + 30 * 60 * 1000;
  const addrs = list.length > 0 ? list : [single!];
  const addr = addrs[invoiceId % addrs.length];
  res.status(200).json({ invoiceId, address: addr, amountZec, expiresAt });
}