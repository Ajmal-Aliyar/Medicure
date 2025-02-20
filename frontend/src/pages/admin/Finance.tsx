
import TransactionHistory from '../../components/patient/userDrive/finance/TransactionHistory'
import Wallet from '../../components/patient/userDrive/finance/Wallet'

const Finance = () => {
  return (
    <div className='h-screen w-full p-4 flex rounded-md gap-3'>
            <div className="w-full bg-white shadow-lg rounded-2xl p-6">
        <Wallet />
        <TransactionHistory />
      
    </div>
    </div>
  )
}

export default Finance
