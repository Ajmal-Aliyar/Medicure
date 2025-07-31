import { adminWalletService } from "@/services/api/admin/wallet";
import { doctorWalletService } from "@/services/api/doctor/wallet";
import type { IWallet, IWalletService } from "@/types/wallet";
import { Wallet } from "lucide-react"
import { useEffect } from "react";

interface Props {
  className?: string;
  role: 'admin' | 'doctor';
  wallet: IWallet | null;
  setWallet: React.Dispatch<React.SetStateAction<IWallet | null>>;
}
const WalletCard = ({ wallet, setWallet, role, className=''}: Props) => {
    useEffect(() => {
        const fetchWallet = async() => {
          const service: Record< 'admin' | 'doctor', IWalletService> = {
            admin: adminWalletService,
            doctor: doctorWalletService
          }
           const wallet =  await service[role].getWallet()
           setWallet(wallet)
        }
        fetchWallet()
    }, [])

    if (!wallet) return null
    return (
    <div className={`bg-surface  p-4 m-2 flex flex-col z-0 ${className}`}>
      <p className="text-xs font-medium text-muted-dark">{role} Wallet</p>
      <div className="flex justify-between items-center w-full mt-3">
        <div>
          <p className="text-secondary font-bold text-xl"><Wallet /> Wallect Balance</p>
          <p className="text-xs">last updated at</p>
        </div>

        <p className="text-primary font-semibold text-2xl">₹{wallet.balance}</p>
      </div>
    </div>
  )
}

export default WalletCard