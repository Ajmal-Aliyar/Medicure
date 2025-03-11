import { FC } from 'react';
import TransactionHistory from '../../components/patient/userDrive/finance/TransactionHistory';
import Wallet from '../../components/patient/userDrive/finance/Wallet';
const Finance: FC = () => {


return (
        <div className='h-full w-full p-4 flex rounded-md gap-3 flex-1'>
            <div className=" h-full w-full bg-white shadow-lg rounded-2xl p-6">
                <Wallet />
                <TransactionHistory />
            </div>
        </div>
    );
};

export default Finance;
