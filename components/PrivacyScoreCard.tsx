import React from "react";

interface PrivacyScore {
  overallScore: number;
  leakageRisks: string[];
  recommendations: string[];
}

export const PrivacyScoreCard: React.FC<{ privacy: PrivacyScore }> = ({ privacy }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 50) return "text-yellow-500";
    return "text-red-500";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 50) return "Moderate";
    return "Poor";
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Privacy Score</h2>

      <div className="flex items-center justify-center mb-6">
        <div className="relative">
          <svg className="w-32 h-32">
            <circle cx="64" cy="64" r="56" fill="none" stroke="#e5e7eb" strokeWidth="8" />
            <circle
              cx="64"
              cy="64"
              r="56"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeDasharray={`${(privacy.overallScore / 100) * 351.86} 351.86`}
              transform="rotate(-90 64 64)"
              className={getScoreColor(privacy.overallScore)}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-3xl font-bold ${getScoreColor(privacy.overallScore)}`}>{privacy.overallScore}</span>
            <span className="text-sm text-gray-500">{getScoreLabel(privacy.overallScore)}</span>
          </div>
        </div>
      </div>

      {privacy.leakageRisks.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2 text-red-600">Privacy Risks:</h3>
          <ul className="list-disc list-inside space-y-1">
            {privacy.leakageRisks.map((risk, idx) => (
              <li key={idx} className="text-sm text-gray-700 dark:text-gray-300">{risk}</li>
            ))}
          </ul>
        </div>
      )}

      {privacy.recommendations.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2 text-blue-600">Recommendations:</h3>
          <ul className="list-disc list-inside space-y-1">
            {privacy.recommendations.map((rec, idx) => (
              <li key={idx} className="text-sm text-gray-700 dark:text-gray-300">{rec}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};