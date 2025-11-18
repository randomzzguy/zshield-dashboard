import type { NextApiRequest, NextApiResponse } from "next";
import FeeOptimizationService from "../../../lib/server/fee";
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { urgency, privacyMode } = req.body || {};
  const mempoolSize = 0;
  const svc = new FeeOptimizationService();
  const recommendedFee = svc.calculateOptimalFee({ urgency, privacyMode, mempoolSize });
  const broadcastRecommendation = svc.recommendBroadcastTime(new Date().getUTCHours());
  res.status(200).json({ success: true, recommendedFee, broadcastRecommendation, mempoolSize });
}