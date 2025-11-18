import type { NextApiRequest, NextApiResponse } from "next";
import PrivacyService from "../../../lib/server/privacy";
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { fromAddress, toAddress, amount, fee } = req.body || {};
  const sim = {
    hasShieldedInputs: typeof fromAddress === "string" && (fromAddress.startsWith("z") || fromAddress.startsWith("u")),
    hasShieldedOutputs: typeof toAddress === "string" && (toAddress.startsWith("z") || toAddress.startsWith("u")),
    amount: Number(amount || 0),
    fee: Number(fee || 0.0001),
    timestamp: Math.floor(Date.now() / 1000),
  };
  const privacy = new PrivacyService().calculatePrivacyScore(sim);
  res.status(200).json({ success: true, simulation: sim, privacy });
}