import React, { useState } from "react";
import { PrivacyScoreCard } from "../components/PrivacyScoreCard";
import { api } from "../lib/api";
import { FeeOptimizer } from "../components/FeeOptimizer";
import { TierCard } from "../components/TierCard";
import { HardwareWallet } from "../components/HardwareWallet";
import { SnapConnect } from "../components/SnapConnect";
import BatchPlanner from "../components/BatchPlanner";
import AddressInsights from "../components/AddressInsights";
import PremiumCTA from "../components/PremiumCTA";
import AuthButtons from "../components/AuthButtons";

export default function Dashboard() {
  const [txid, setTxid] = useState("");
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const analyzeTx = async () => {
    setLoading(true);
    try {
      const result = await api.analyzeTransaction(txid);
      setAnalysis(result);
    } catch {}
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">ZShield Dashboard</h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Analyze Transaction</h2>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Enter transaction ID"
              value={txid}
              onChange={(e) => setTxid(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
            />
            <button
              onClick={analyzeTx}
              disabled={loading || !txid}
              className="px-6 py-2 bg-maroon text-white rounded-lg hover:bg-red-900 disabled:opacity-50"
            >
              {loading ? "Analyzing..." : "Analyze"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {analysis ? (
            <>
              <PrivacyScoreCard privacy={analysis.privacy} />
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Transaction Details</h2>
                <div className="space-y-3">
                  <div>
                    <span className="font-semibold">Type:</span>{" "}
                    {analysis.transaction.hasShieldedInputs && analysis.transaction.hasShieldedOutputs ? "Fully Shielded" : "Partially Shielded"}
                  </div>
                  <div>
                    <span className="font-semibold">Fee:</span>{" "}
                    {analysis.transaction.fee} ZEC
                  </div>
                  <div>
                    <span className="font-semibold">Block:</span>{" "}
                    {analysis.transaction.blockHeight}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <FeeOptimizer />
              <BatchPlanner />
              <AddressInsights />
            </>
          )}
        </div>

        <div className="mt-8">
          <TierCard />
        </div>
        <div className="mt-4">
          <AuthButtons />
        </div>
        <div className="mt-8">
          <SnapConnect />
        </div>
        <div className="mt-8">
          <PremiumCTA />
        </div>
      </div>
    </div>
  );
}