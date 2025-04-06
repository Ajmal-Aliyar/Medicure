import TransactionHistory from '../../components/common/TransactionHistory'
import Wallet from '../../components/common/Wallet'
import WithdrawRequestsList from '../../components/admin/Finance/WithdrawRequestsList'

const Finance = () => {
 
  return (
    <div className='h-screen w-full p-4 flex rounded-md gap-3'>
      <div className="grid grid-cols-2 grid-rows-4 gap-2 w-full">
        <Wallet />
        <WithdrawRequestsList />
        <TransactionHistory />
      </div>
    </div>
  )
}

export default Finance
