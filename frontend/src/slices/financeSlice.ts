import type { MetaType } from "@/types/common";
import type { Transaction } from "@/types/transaction";
import type { IWallet } from "@/types/wallet";
import type {
  IWithdrawRequest,
  IWithdrawRequestStatus,
} from "@/types/withdraw-request";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface FinanceState {
  transaction: {
    data: Transaction[];
    meta: MetaType;
  };
  wallet: IWallet | null;
  withdrawRequests: IWithdrawRequest[];
  withdrawStatus: IWithdrawRequestStatus;
}

const initialState: FinanceState = {
  transaction: {
    data: [],
    meta: {
      page: 1,
      totalPages: 1,
    },
  },
  wallet: null,
  withdrawRequests: [],
  withdrawStatus: "all",
};

const financeSlice = createSlice({
  name: "finance",
  initialState,
  reducers: {
    setTransactions: (
      state,
      action: PayloadAction<{
        data: Transaction[];
        meta: MetaType;
      }>
    ) => {
      state.transaction = action.payload;
    },
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transaction.data = [action.payload, ...state.transaction.data];
    },

    setWallet: (state, action: PayloadAction<IWallet | null>) => {
      state.wallet = action.payload;
    },
    updateWalletBalance: (state, action: PayloadAction<number>) => {
      if (state.wallet) {
        state.wallet.balance = action.payload;
      }
    },

    setWithdrawRequests: (state, action: PayloadAction<IWithdrawRequest[]>) => {
      console.log(action.payload);

      state.withdrawRequests = action.payload;
    },
    addWithdrawRequest: (state, action: PayloadAction<IWithdrawRequest>) => {
      if (
        state.withdrawStatus === "all" ||
        action.payload.status === state.withdrawStatus
      ) {
        state.withdrawRequests.unshift(action.payload);
      }
    },
    updateWithdrawRequestStatus: (
      state,
      action: PayloadAction<{ id: string; status: IWithdrawRequestStatus }>
    ) => {
      const { id, status } = action.payload;
      const request = state.withdrawRequests.find((r) => r.id === id);

      if (request) {
        request.status = status;
      }

      if (state.withdrawStatus !== "all") {
        state.withdrawRequests = state.withdrawRequests.filter(
          (r) => r.status === state.withdrawStatus
        );
      }
    },

    setWithdrawStatus: (
      state,
      action: PayloadAction<IWithdrawRequestStatus>
    ) => {
      state.withdrawStatus = action.payload;
    },

    resetFinance: () => initialState,
  },
});

export const {
  setTransactions,
  addTransaction,
  setWallet,
  updateWalletBalance,
  setWithdrawRequests,
  addWithdrawRequest,
  updateWithdrawRequestStatus,
  setWithdrawStatus,
  resetFinance,
} = financeSlice.actions;

export default financeSlice.reducer;
