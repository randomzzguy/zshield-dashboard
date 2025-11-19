export async function subscribeToPremium() {
  const r = await fetch("/api/payments/now/create-invoice", { method: "POST" });
  const data = await r.json();
  if (!data?.invoice_url) throw new Error("nowpayments_invoice_error");
  window.location.href = data.invoice_url;
}