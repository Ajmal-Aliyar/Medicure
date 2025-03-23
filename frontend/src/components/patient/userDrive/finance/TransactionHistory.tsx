import { FC, useEffect, useState } from "react";
import { fetchTransactionHistoryApi } from "../../../../sevices/finance/transaction";
import { useDispatch } from "react-redux";
import { History } from "lucide-react";
import { setError, setLoading } from "../../../../store/slices/commonSlices/notificationSlice";

export interface Transaction {
    _id: string;
    senderFullName: string;
    recieverFullName: string;
    amount: number;
    status: string;
    transactionDate: string;
}
const TransactionHistory: FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [showAll, setShowAll] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                dispatch(setLoading(true));
                const { transactions } = await fetchTransactionHistoryApi();
                console.log(transactions, 'sdf')
                setTransactions(transactions);
            } catch (error) {
                dispatch(setError("Failed to load transactions."));
            } finally {
                dispatch(setLoading(false));
            }
        };
        fetchTransactions();
    }, [dispatch]);
    return (
        <div className="">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Recent Transactions</h3>
            <ul className="text-sm text-gray-600 space-y-2 max-h-[300px] overflow-y-auto pr-5">
                {transactions.length <= 0 && <p className="text-gray-500 text-sm">No transation history</p>}
                {(showAll ? transactions : transactions.slice(0, 3)).map((tx, index) => (
                    <li key={index} className="flex justify-between">
                        {tx.status === 'success' ? (
                            <>
                                <span>
                                    {tx.senderFullName ? `Received from ${tx.senderFullName}` : `Paid to ${tx.recieverFullName}`}
                                </span>
                                <span className={`${tx.senderFullName ? 'text-green-500' : 'text-red-500'}`}>
                                    {tx.senderFullName ? '+' : '-'} {tx.amount}
                                </span>
                            </>
                        ) : (
                            <>
                                <span>
                                   {tx.recieverFullName ? `refund money from ${tx.recieverFullName}` : `refund money to ${tx.senderFullName}`}
                                </span>
                                <span className={`${tx.recieverFullName ? 'text-green-500' : 'text-red-500'}`}>
                                    {tx.recieverFullName ? '+' : '-'} {tx.amount}
                                </span>
                               
                            </>
                        )}
                    </li>
                ))}

            </ul>
            {!showAll && transactions.length > 3 && (
                <div className="mt-4 text-center">
                    <button onClick={() => setShowAll(true)} className="text-blue-400 hover:underline flex items-center gap-1">
                        <History size={16} /> Show All Transactions
                    </button>
                </div>
            )}
        </div>
    )
}

export default TransactionHistory
