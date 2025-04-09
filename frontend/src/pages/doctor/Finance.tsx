import { FC } from 'react';
import TransactionHistory from '../../components/common/TransactionHistory';
import Wallet from '../../components/common/Wallet';
import WithdrawRequestsList from '../../components/admin/Finance/WithdrawRequestsList';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
const Finance: FC = () => {
    useGSAP(() => {
        const tl = gsap.timeline();

        tl.from(".box", {
            opacity: 0,
            y: 50,
            stagger: 0.1,
            delay: '0.7'
        }, '-=0.8');
    });


    return (
        <div className='h-full w-full px-2 flex rounded-md gap-3 flex-1'>
            <div className="p-4 rounded-md grid grid-cols-2 grid-rows-4 gap-2 w-full">
                <div className='box p-4 rounded-md bg-white shadow-md'>
                    <Wallet />
                </div>
                <WithdrawRequestsList />
                <TransactionHistory />
            </div>
        </div>
    );
};

export default Finance;
