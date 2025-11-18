import { loadStripe } from "@stripe/stripe-js";

export async function subscribeToPremium() {
  const pub = process.env.NEXT_PUBLIC_STRIPE_KEY;
  if (!pub) throw new Error("publishable_key_missing");
  const stripe = await loadStripe(pub);
  const r = await fetch("/api/checkout/create-session", { method: "POST" });
  const data = await r.json();
  if (!data?.id) throw new Error("session_error");
  await stripe?.redirectToCheckout({ sessionId: data.id });
}