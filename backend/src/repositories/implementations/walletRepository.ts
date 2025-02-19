import { WalletModel } from "../../models/wallet/walletModel";
import { IWalletDocument } from "../../models/wallet/walletSchema";
import { IWalletRepository } from "../interfaces/IWalletRepository";

export class WalletRepository implements IWalletRepository {

    async createWallet(ownerId: string, role: string): Promise<IWalletDocument> {
        try {
            const wallet = new WalletModel({
                ownerId,
                role,
                balance: 0,
            });

            return await wallet.save();
        } catch (error) {
            throw error;
        }
    }

    async getWalletBalanceByOwnerId(ownerId: string): Promise<number> {
        try {
            const wallet = await WalletModel.findOne({ ownerId });
            if (!wallet) {
                throw new Error(`Wallet not found for owner ${ownerId}`);
            }

            return wallet.balance;
        } catch (error) {
            console.error("Error retrieving wallet balance:", error.message);
            throw error;
        }
    }

    async increment(ownerId: string, amount: number): Promise<IWalletDocument> {
        try {
            if (amount <= 0) {
                throw new Error("Amount to increment must be greater than zero.");
            }

            const wallet = await WalletModel.findOne({ ownerId });
            if (!wallet) {
                throw new Error(`Wallet not found for owner ${ownerId}`);
            }

            wallet.balance += amount;
            await wallet.save();

            return wallet;
        } catch (error) {
            throw error;
        }
    }

    async decrement(ownerId: string, amount: number): Promise<IWalletDocument> {
        try {
            if (amount <= 0) {
                throw new Error("Amount to decrement must be greater than zero.");
            }

            const wallet = await WalletModel.findOne({ ownerId });
            if (!wallet) {
                throw new Error(`Wallet not found for owner ${ownerId}`);
            }

            if (wallet.balance < amount) {
                throw new Error("Insufficient balance to decrement.");
            }

            wallet.balance -= amount;
            await wallet.save();

            return wallet;
        } catch (error) {
            throw error;
        }
    }
}
