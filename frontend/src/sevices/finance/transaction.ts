import { api } from "../../utils/axiosInstance";


interface TransactionDetails {
    _id: string;
    senderFullName: string;
    recieverFullName: string;
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