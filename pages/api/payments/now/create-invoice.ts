import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const apiKey = process.env.NOWPAYMENTS_API_KEY;
  const site = process.env.NEXT_PUBLIC_SITE_URL || "https://zshield.xyz";
  if (!apiKey) return res.status(400).json({ error: "nowpayments_api_key_missing" });
  try {
    const body = {
      price_amount: 4.99,
      price_currency: "USD",
      order_id: `premium_${Date.now()}`,
      order_description: "ZShield Premium Monthly",
      success_url: `${site}/dashboard?checkout=success`,
      cancel_url: `${site}/dashboard?checkout=cancel`,
      pay_currency: "zec",
    };
    const r = await fetch("https://api.nowpayments.io/v1/invoice", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": apiKey },
      body: JSON.stringify(body),
    });
    const data = await r.json();
    if (!data?.invoice_url) return res.status(500).json({ error: "nowpayments_error", detail: data });
    res.status(200).json({ invoice_url: data.invoice_url });
  } catch (e: any) {
    res.status(500).json({ error: e?.message || "error" });
  }
}