import { FC } from 'react';
import TransactionHistory from '../../components/patient/userDrive/finance/TransactionHistory';
import Wallet from '../../components/patient/userDrive/finance/Wallet';
const Finance: FC = () => {


    return (
        <div className='h-screen w-full p-4 flex overflow-y-auto rounded-md pt-20 gap-3'>
            <div className="w-full bg-white shadow-lg rounded-2xl p-6">
                <Wallet />

                <TransactionHistory />
            </div>
        </div>
    );
};

export default Finance;
