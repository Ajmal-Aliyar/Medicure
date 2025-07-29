import { api } from "@/lib/axios";
import type { IWallet, IWalletService } from "@/types/wallet";

const BASE_URL = "/api/admin/wallet";

export const adminWalletService: IWalletService = {
  getWallet: async (): Promise<IWallet> => {
    const response = await api.get<{ data: IWallet }>(
      `${BASE_URL}`
    );
    return response.data.data;
  },
};
