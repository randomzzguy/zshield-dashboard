export async function subscribeToPremium() {
  const r = await fetch("/api/payments/zec/create-invoice", { method: "POST" });
  const data = await r.json();
  if (!data?.invoiceId || !data?.address || !data?.amountZec) throw new Error("zec_invoice_error");
  const q = new URLSearchParams({ i: String(data.invoiceId), addr: data.address, amt: String(data.amountZec) });
  window.location.href = `/pay?${q.toString()}`;
}