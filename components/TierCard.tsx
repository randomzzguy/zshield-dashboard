import React from "react";
import { TIERS } from "../lib/tiers";

export function TierCard() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Plan</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.values(TIERS).map((tier) => (
          <div key={tier.name} className="border border-gray-200 dark:border-gray-700 rounded p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">{tier.name}</span>
              <span className="text-sm">${tier.price}</span>
            </div>
            <ul className="text-sm space-y-1">
              {tier.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}