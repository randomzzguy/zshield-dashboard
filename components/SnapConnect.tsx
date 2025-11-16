import React, { useState } from "react";
import { installZShieldSnap } from "../lib/snap-connector";

export const SnapConnect: React.FC = () => {
  const [installed, setInstalled] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInstall = async () => {
    setLoading(true);
    try {
      await installZShieldSnap();
      setInstalled(true);
      alert("ZShield Snap installed successfully!");
    } catch (error) {
      alert("Failed to install snap. Make sure MetaMask is installed.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-r from-maroon to-red-900 rounded-lg shadow-xl p-8 text-white">
      <h2 className="text-3xl font-bold mb-4">Real-Time Protection</h2>
      <p className="mb-6">Install the ZShield Snap to get automatic privacy warnings before every transaction</p>
      {!installed ? (
        <button onClick={handleInstall} disabled={loading} className="bg-white text-maroon px-8 py-3 rounded-lg font-bold hover:bg-gray-100">
          {loading ? "Installing..." : "Install ZShield Snap"}
        </button>
      ) : (
        <div className="flex items-center gap-3">
          <span className="text-2xl">✅</span>
          <span className="font-semibold">Snap Installed - You're Protected!</span>
        </div>
      )}
    </div>
  );
};