import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "/api";

export const api = {
  analyzeTransaction: async (txid: string) => {
    const response = await axios.post(`${API_BASE}/transactions/analyze`, { txid });
    return response.data;
  },
  getFeeEstimate: async (urgency: string, privacyMode: boolean) => {
    const response = await axios.post(`${API_BASE}/transactions/fee-estimate`, { urgency, privacyMode });
    return response.data;
  },
  simulateTransaction: async (params: any) => {
    const response = await axios.post(`${API_BASE}/transactions/simulate`, params);
    return response.data;
  },
  getAddressTransactions: async (address: string) => {
    const response = await axios.post(`${API_BASE}/transactions/address-transactions`, { address });
    return response.data;
  },
};