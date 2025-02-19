import { model } from "mongoose";
import { IWalletSchema } from "./walletInterface";
import { WalletSchema } from "./walletSchema";


export const WalletModel = model<IWalletSchema>('Wallet', WalletSchema);