class PrivacyService {
  calculatePrivacyScore(txData: any) {
    let score = 100;
    const risks: string[] = [];
    const recommendations: string[] = [];
    if (!txData.hasShieldedInputs && !txData.hasShieldedOutputs) {
      score -= 50;
      risks.push("Fully transparent transaction - zero privacy");
      recommendations.push("Use shielded (z-address) for sender and receiver");
    } else if (!txData.hasShieldedInputs || !txData.hasShieldedOutputs) {
      score -= 25;
      risks.push("Partially shielded - some metadata leaked");
      recommendations.push("Shield both sending and receiving addresses");
    }
    const hour = new Date((txData.timestamp || Math.floor(Date.now() / 1000)) * 1000).getHours();
    const isLowActivity = hour >= 2 && hour <= 6;
    if (isLowActivity) {
      score -= 15;
      risks.push("Broadcasting during low-activity hours increases linkability");
      recommendations.push("Wait for higher network activity before broadcasting");
    }
    const a = typeof txData.amount === "number" ? txData.amount : 0;
    const isRoundNumber = a % 1 === 0 || a % 0.1 === 0;
    if (isRoundNumber) {
      score -= 10;
      risks.push("Round number amount can create linkability patterns");
      recommendations.push("Add small random amount to break patterns (e.g., 1.05 instead of 1.0)");
    }
    const recommendedFee = 0.0001;
    const isOverpaying = (txData.fee || recommendedFee) > recommendedFee * 1.5;
    if (isOverpaying) {
      score -= 5;
      risks.push("Overpaying fees creates unique fingerprint");
      recommendations.push(`Use recommended fee: ${recommendedFee} ZEC`);
    }
    return {
      overallScore: Math.max(0, score),
      leakageRisks: risks,
      recommendations,
      metadata: {
        timingAnalysis: isLowActivity ? "Low network activity period" : "Normal activity period",
        amountAnalysis: isRoundNumber ? `Round amount (${a}) can create patterns` : "Amount appears random",
        frequencyAnalysis: "Normal",
      },
    };
  }
}
export default PrivacyService;