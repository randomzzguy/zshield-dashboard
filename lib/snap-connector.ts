export async function installZShieldSnap() {
  const ethereum: any = (window as any).ethereum;
  if (!ethereum) throw new Error("MetaMask not available");
  const result = await ethereum.request({
    method: "wallet_requestSnaps",
    params: { "npm:zshield-snap": { version: "^1.0.0" } },
  });
  return result["npm:zshield-snap"];
}

export async function analyzeTransactionViaSnap(txParams: any) {
  const ethereum: any = (window as any).ethereum;
  if (!ethereum) throw new Error("MetaMask not available");
  const response = await ethereum.request({
    method: "wallet_invokeSnap",
    params: { snapId: "npm:zshield-snap", request: { method: "analyzeTransaction", params: txParams } },
  });
  return response;
}