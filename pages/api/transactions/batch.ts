import type { NextApiRequest, NextApiResponse } from "next";
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { transactions } = req.body || {};
  const list = Array.isArray(transactions) ? transactions : [];
  const recipients = list.map((tx: any) => ({ address: tx?.toAddress || "", amount: Number(tx?.amount || 0) }));
  const totalAmount = recipients.reduce((sum: number, r: any) => sum + (r.amount || 0), 0);
  const STANDARD_FEE = 0.0001;
  const combined = { recipients, totalAmount, estimatedFee: STANDARD_FEE };
  const individualFees = list.length * STANDARD_FEE;
  const batchedFee = STANDARD_FEE;
  const savings = Math.max(0, individualFees - batchedFee);
  const savingsPercent = individualFees > 0 ? ((savings / individualFees) * 100).toFixed(2) : "0.00";
  res.status(200).json({ success: true, combined, savings: { shouldBatch: list.length > 1, individualCost: individualFees, batchedCost: batchedFee, savings, savingsPercent } });
}