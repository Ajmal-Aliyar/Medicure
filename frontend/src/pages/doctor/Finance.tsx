import { FC } from 'react';
import TransactionHistory from '../../components/common/TransactionHistory';
import Wallet from '../../components/common/Wallet';
import WithdrawRequestsList from '../../components/admin/Finance/WithdrawRequestsList';
const Finance: FC = () => {


return (
        <div className='h-full w-full px-2 flex rounded-md gap-3 flex-1'>
            <div className="p-4 rounded-md grid grid-cols-2 grid-rows-4 gap-2 w-full">
                <Wallet />
                <WithdrawRequestsList />
                <TransactionHistory />
            </div>
        </div>
    );
};

export default Finance;
