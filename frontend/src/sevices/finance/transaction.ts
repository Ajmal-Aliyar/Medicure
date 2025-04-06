import { api } from "../../utils/axiosInstance";


export interface TransactionDetails {
    _id: string;
    senderId: string;
    recieverId: string;
    amount: number;
    status: string;
    transactionDate: string;
  }


export const fetchTransactionHistoryApi = async ( ): Promise<{transactions: TransactionDetails[]}> => {  
      const response = await api.get<{transactions: TransactionDetails[]}>(
        `/api/transaction/get-transaction`
      );
      return response.data;
  };

export const fetchWalletBalanceApi = async (): Promise<{walletBalance: number}> => {
  const response = await api.get<{walletBalance: number}>('/api/wallet/wallet')
  return response.data
}

export const fetchRevenueDetailsApi = async (): Promise<{revenue: number, refund: number}> => {
  const response = await api.get<{revenue: number, refund: number}>('/api/transaction/get-revenue')
  return response.data
}

