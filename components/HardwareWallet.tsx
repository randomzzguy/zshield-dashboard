import React, { useState } from "react";

export function HardwareWallet() {
  const [status, setStatus] = useState("Disconnected");

  const connect = async () => {
    try {
      // Minimal WebUSB availability check; avoids importing external SDKs in MVP
      if ((navigator as any).usb && typeof (navigator as any).usb.requestDevice === "function") {
        await (navigator as any).usb.requestDevice({ filters: [] });
        setStatus("Connected");
      } else {
        setStatus("Unavailable");
      }
    } catch {
      setStatus("Failed");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Hardware Wallet</h2>
      <div className="text-sm mb-3">{status}</div>
      <button onClick={connect} className="px-4 py-2 bg-maroon text-white rounded">Connect</button>
    </div>
  );
}