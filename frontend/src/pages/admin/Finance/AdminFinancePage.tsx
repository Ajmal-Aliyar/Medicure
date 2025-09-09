import WalletCard from "@/components/domain/Cards/WalletCard";
import WithdrawRequestsList from "@/pages/doctor/Finance/components/WithdrawRequestsList";
import TransactionDetails from "./components/TransactionDetails";


const AdminFinancePage = () => {

  return (
    <div className="w-full flex lg:h-[90vh] overflow-hidden relative bg-surface rounded-md shadow-md">
      <div className="flex-1  flex flex-col">
        <div className="w-full flex bg-surface border-b border-border justify-between z-50">
          <p className="text-secondary-dark font-medium text-md p-3">
            Wallet
          </p>
        </div>
        <WalletCard role={"admin"} className="" />


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
