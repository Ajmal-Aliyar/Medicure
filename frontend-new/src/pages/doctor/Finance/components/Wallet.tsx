import { Button } from "@/components/ui/Button"
import { Wallet } from "lucide-react"

const WalletDetails = () => {
    
    return (
        <div className="bg-surface border-b border-border/80 p-4 m-2 flex flex-col z-0">
            <p className="text-xs font-medium text-muted-dark">Doctor Wallet</p>
            <div className="flex justify-between items-center w-full mt-3">
                <div>
                    <p className="text-secondary font-bold text-xl"><Wallet /> Wallect Balance</p>
                    <p className="text-xs">last updated at</p>
                </div>

                <p className="text-primary font-semibold text-2xl">₹600</p>
            </div>
            <Button className="ml-auto mt-4 px-3 py-2 ">Withdraw</Button>
        </div>
    )
}

export default WalletDetails