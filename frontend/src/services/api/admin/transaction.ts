import { api } from "@/lib/axios";
import type { MetaType } from "@/types/common";
import type { Transaction, TransactionChartData } from "@/types/transaction";

const BASE_URL = '/api/admin/transaction';
export const adminTransactionService = {
     getTransactionDetails: async (page: number): Promise<{ data: Transaction[], meta: MetaType}> => {
        const response = await api.get<{ data: Transaction[], meta: MetaType}>(
          `${BASE_URL}`, { params: {page}}
        );
        return response.data;
      },
      
       getTransactionChartDetails: async (
          startDate: string,
          endDate: string
        ): Promise< TransactionChartData[]> => {
          const response = await api.get<{ data: TransactionChartData[] }>(
            `${BASE_URL}/chart?startDate=${startDate}&endDate=${endDate}`
          );
          return response.data.data;
        },
}