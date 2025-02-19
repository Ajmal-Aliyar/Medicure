import { CreditCard, IndianRupee } from 'lucide-react'
import { FC, useEffect, useState } from 'react'
import { fetchWalletBalanceApi } from '../../../../sevices/finance/transaction'

const Wallet: FC = () => {
  const [wallet, setWallet] = useState<number>(0)
  useEffect(() => {
    const fetchWallet = async () => {
      const {walletBalance} = await fetchWalletBalanceApi()
      console.log(walletBalance)
      setWallet(walletBalance)
    }
    fetchWallet()
  },[])
  return (
    <div>
      <h2 className="text-xl text-[#1b1962cd] font-bold mb-4">My Wallet</h2>
      <div className="flex items-center mb-4 max-w-md gap-3">
        <span className="text-[#0c0b3eb5] font-semibold text-lg">Balance</span>
        <span className="text-2xl font-semibold text-green-600 flex items-center"><IndianRupee size={20} strokeWidth={3}/>{wallet}</span>
      </div>
      <div className="flex mb-4">
        <button className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white py-1 px-4 rounded-lg active:scale-95 duration-300">
          <CreditCard size={16} /> Withdraw
        </button>
      </div>
    </div>
  )
}

export default Wallet
