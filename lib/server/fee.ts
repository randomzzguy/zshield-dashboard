class FeeOptimizationService {
  private readonly STANDARD_FEE = 0.0001;
  calculateOptimalFee(params: { urgency: "low" | "medium" | "high"; privacyMode: boolean; mempoolSize: number }) {
    if (params.privacyMode) return this.STANDARD_FEE;
    switch (params.urgency) {
      case "low": return this.STANDARD_FEE * 0.5;
      case "medium": return this.STANDARD_FEE;
      case "high": return this.STANDARD_FEE * 2;
      default: return this.STANDARD_FEE;
    }
  }
  recommendBroadcastTime(currentHour: number) {
    const highActivityHours = [14, 15, 16, 17, 18, 19, 20];
    const isHighActivity = highActivityHours.includes(currentHour);
    return {
      shouldBroadcastNow: isHighActivity,
      reasoning: isHighActivity ? "High network activity - good for privacy" : "Low network activity - consider waiting for better privacy",
      recommendedTime: !isHighActivity ? `Wait ${Math.min(...highActivityHours.map((h) => (h - currentHour + 24) % 24))} hours` : "Now",
    };
  }
}
export default FeeOptimizationService;