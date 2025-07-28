import { Button } from "@/components/ui/Button"
import { Wallet } from "lucide-react"

interface Props {
  className?: string;
}
const AdminWallet = ({className = ''}: Props) => {
  return (
    <div className={`bg-surface p-4 m-2 flex flex-col ${className}`}>
      <p className="text-xs font-medium text-muted-dark">Admin Wallet</p>
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

export default AdminWallet