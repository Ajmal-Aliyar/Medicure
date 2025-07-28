import WalletCard from "@/components/domain/Cards/WalletCard";
import WithdrawRequestsList from "@/pages/doctor/Finance/components/WithdrawRequestsList";
import type { IWallet } from "@/types/wallet";
import TransactionDetails from "./components/TransactionDetails";
import { Button } from "@/components/ui/Button";
import BankAccountDetails from "@/pages/doctor/Finance/components/BankAccountDetails";
import { useState } from "react";



const AdminFinancePage = () => {
  const [ wallet, setWallet] = useState<IWallet | null>(null)
  const [requestModal, setRequestModal] = useState<boolean>(false)


  return (
    <div className="w-full flex lg:h-[90vh] overflow-hidden relative bg-surface rounded-md shadow-md">
      <div className="flex-1  flex flex-col">
        <div className="w-full flex bg-surface border-b border-border justify-between z-50">
          <p className="text-secondary-dark font-medium text-md p-3">
            Wallet
          </p>
        </div>
        <WalletCard wallet={wallet} setWallet={setWallet} role={"admin"} className="" />
        <Button className="ml-uto px-3 py-2 ml-6 w-fit" onClick={() => setRequestModal(true)}>Withdraw</Button>

        {requestModal && <BankAccountDetails wallet={wallet?.balance as number} setWithdraw={setRequestModal} /> }

        <div className="w-full flex bg-surface border-b border-border justify-between mb-3 ">
          <p className="text-secondary-dark font-medium text-md p-3 bg-surface z-10 w-full">
            Transaction History
          </p>
        </div>

        <TransactionDetails />

      </div>
      <div className="flex-1 border-l border-border flex flex-col">
        <div className="w-full flex bg-surface border-b border-border justify-between">
          <p className="text-secondary-dark font-medium text-md p-3">
            Withdraw Requests
          </p>
        </div>
        <WithdrawRequestsList />
      </div>
    </div>
  );
};

export default AdminFinancePage;
