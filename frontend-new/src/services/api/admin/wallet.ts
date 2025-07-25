import { api } from "@/lib/axios";
import type { IWallet, IWalletService } from "@/types/wallet";

const BASE_URL = "/api/admin/wallet";
interface IAdminWalletService extends IWalletService {}

export const adminWalletService: IAdminWalletService = {
  getWallet: async (): Promise<IWallet> => {
    const response = await api.get<{ data: IWallet }>(
      `${BASE_URL}`
    );
    return response.data.data;
  },
};
