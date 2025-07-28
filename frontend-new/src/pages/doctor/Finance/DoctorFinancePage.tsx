import TransactionDetails from "./components/TransactionDetails";
import WalletDetails from "./components/Wallet";


const DoctorFinancePage = () => {
  

  return (
    <div className="w-full flex lg:h-[90vh] overflow-hidden relative bg-surface rounded-md shadow-md">
      <div className="flex-1  flex flex-col">
        <div className="w-full flex bg-surface border-b border-border justify-between z-50">
          <p className="text-secondary-dark font-medium text-md p-3">
            Wallet
          </p>
        </div>
        <WalletDetails />
        

        <div>
          statistics
        </div>

      </div>
      <div className="flex-1 border-l border-border flex flex-col">
        <div className="w-full flex bg-surface border-b border-border justify-between z-50">
          <p className="text-secondary-dark font-medium text-md p-3">
            Transaction History
          </p>
        </div>

        <TransactionDetails />
      </div>
    </div>
  );
};

export default DoctorFinancePage;
