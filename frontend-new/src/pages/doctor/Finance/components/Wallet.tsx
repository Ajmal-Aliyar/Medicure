import { Button } from "@/components/ui/Button"
import { doctorWalletService } from "@/services/api/doctor/wallet"
import type { IWallet } from "@/types/wallet"
import { Wallet } from "lucide-react"
import { useEffect, useState } from "react"

const WalletDetails = () => {
    const [ wallet, setWallet] = useState<IWallet | null>()
    useEffect(() => {
        const fetchWallet = async() => {
           const wallet =  await doctorWalletService.getWallet()
           setWallet(wallet)
        }
        fetchWallet()
    }, [])

    if (!wallet) return null
    return (
        <div className="bg-surface border-b border-border/80 p-4 m-2 flex flex-col z-0">
            <p className="text-xs font-medium text-muted-dark">Doctor Wallet</p>
            <div className="flex justify-between items-center w-full mt-3">
                <div>
                    <p className="text-secondary font-bold text-xl"><Wallet /> Wallect Balance</p>
                    <p className="text-xs">last updated at</p>
                </div>

                <p className="text-primary font-semibold text-2xl">₹{wallet.balance}</p>
            </div>
            <Button className="ml-auto mt-4 px-3 py-2 ">Withdraw</Button>
        </div>
    )
}

export default WalletDetails