import React from "react";

export function TransactionCard({ transaction }: { transaction: any }) {
  const p = transaction.privacy;
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded p-4">
      <div className="flex justify-between mb-2">
        <span className="font-semibold">{transaction.txid?.slice(0, 10)}...</span>
        <span>{p.overallScore}/100</span>
      </div>
      <div className="text-sm">
        <div>Shielded Inputs: {transaction.analysis?.hasShieldedInputs ? "Yes" : "No"}</div>
        <div>Shielded Outputs: {transaction.analysis?.hasShieldedOutputs ? "Yes" : "No"}</div>
        <div>Fee: {transaction.analysis?.fee}</div>
      </div>
    </div>
  );
}