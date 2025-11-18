import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  const key = process.env.STRIPE_SECRET_KEY;
  const priceId = process.env.STRIPE_PRICE_ID;
  if (!key || !priceId) return res.status(400).json({ error: "stripe_env_missing" });
  const stripe = new Stripe(key, { apiVersion: "2023-10-16" });
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://zshield.xyz"}/dashboard?checkout=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://zshield.xyz"}/dashboard?checkout=cancel`,
    });
    res.status(200).json({ id: session.id });
  } catch (e: any) {
    res.status(500).json({ error: e?.message || "stripe_error" });
  }
}