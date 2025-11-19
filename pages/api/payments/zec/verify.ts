import type { NextApiRequest, NextApiResponse } from "next";

function computeAmount(invoiceId: number, base: number) {
  const variant = (invoiceId % 997) / 1e8;
  return +(base + variant).toFixed(8);
}

async function checkBlockchair(address: string, expectedZec: number) {
  try {
    const url = `https://api.blockchair.com/zcash/outputs?q=recipient(${address})`;
    const r = await fetch(url, { method: "GET" });
    const j = await r.json();
    const sat = Math.round(expectedZec * 1e8);
    const rows = j?.data || [];
    for (const row of rows) {
      const value = (row?.value || row?.value_usd) ? row.value : row.value;
      const vSat = typeof row?.value === "number" ? row.value : (typeof row?.value === "string" ? parseInt(row.value, 10) : 0);
      if (vSat === sat) {
        return { paid: true, txid: row?.transaction_hash };
      }
    }
  } catch {}
  return { paid: false };
}

async function checkSoChain(address: string, expectedZec: number) {
  try {
    const addrUrl = `https://sochain.com/api/v2/address/ZEC/${address}`;
    const ar = await fetch(addrUrl);
    const aj = await ar.json();
    const txs: any[] = aj?.data?.txs || [];
    const sat = Math.round(expectedZec * 1e8);
    for (const t of txs.slice(0, 10)) {
      const tr = await fetch(`https://sochain.com/api/v2/get_tx/ZEC/${t.txid}`);
      const tj = await tr.json();
      const outputs: any[] = tj?.data?.outputs || [];
      for (const o of outputs) {
        const vSat = Math.round((o?.value || 0) * 1e8);
        if (o?.address === address && vSat === sat) {
          return { paid: true, txid: t.txid };
        }
      }
    }
  } catch {}
  return { paid: false };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const addr = process.env.ZEC_PAYMENT_TADDR;
  if (!addr) return res.status(400).json({ error: "zec_payment_address_missing" });
  const base = parseFloat(process.env.ZEC_PRICE_ZEC || "0.05");
  const invoiceIdRaw = (req.query.invoiceId || req.body?.invoiceId) as string;
  const invoiceId = parseInt(invoiceIdRaw, 10);
  if (!invoiceId || Number.isNaN(invoiceId)) return res.status(400).json({ error: "invalid_invoice_id" });
  const expectedZec = computeAmount(invoiceId, base);
  const r1 = await checkBlockchair(addr, expectedZec);
  if (r1.paid) return res.status(200).json({ paid: true, txid: r1.txid, address: addr, amountZec: expectedZec });
  const r2 = await checkSoChain(addr, expectedZec);
  if (r2.paid) return res.status(200).json({ paid: true, txid: r2.txid, address: addr, amountZec: expectedZec });
  return res.status(200).json({ paid: false, address: addr, amountZec: expectedZec });
}