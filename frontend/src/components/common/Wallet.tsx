import { CreditCard, IndianRupee } from 'lucide-react'
import { FC, useEffect, useState } from 'react'
import { fetchWalletBalanceApi } from '../../sevices/finance/transaction'
import BankAccountDetails from './BankAccountDetails'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'

const Wallet: FC = () => {
  const [wallet, setWallet] = useState<number>(0)
  const [ withdraw, setWithdraw] = useState<boolean>(false)
  const { role } = useSelector((state: RootState) => state.auth)
  useEffect(() => {
    const fetchWallet = async () => {
      const {walletBalance} = await fetchWalletBalanceApi()
      console.log(walletBalance)
      setWallet(walletBalance)
    }
    fetchWallet()
  },[])

  const handleWithdrawal = async () => {
    role === 'doctor' && setWithdraw(true)
    // await requestWithdrawalApi( _id, 2000)
  }
  return (
    <div className='p-4 rounded-md outline outline-gray-300'>
      <h2 className="text-xl text-[#1b1962cd] font-bold mb-4">My Wallet</h2>
      <div className="flex items-center mb-4 max-w-md gap-3">
        <span className="text-[#0c0b3eb5] font-semibold text-lg">Balance</span>
        <span className="text-2xl font-semibold text-green-600 flex items-center"><IndianRupee size={20} strokeWidth={3}/>{wallet}</span>
      </div>
      {role === 'doctor' && <div className="flex mb-4">
        <button className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white py-1 px-4 rounded-lg active:scale-95 duration-300"
        onClick={handleWithdrawal}>
          <CreditCard size={16} /> Withdraw
        </button>
      </div>}

      {withdraw && <BankAccountDetails setWithdraw={setWithdraw} wallet={wallet}/>}
    </div>
  )
}

export default Wallet
