import { FC, useEffect, useState } from "react";
import { fetchTransactionHistoryApi } from "../../sevices/finance/transaction";
import { useDispatch, useSelector } from "react-redux";
import { History } from "lucide-react";
import { setError, setLoading } from "../../store/slices/commonSlices/notificationSlice";
import { RootState } from "../../store/store";
import { convertTo12HourFormat } from "../../utils/timeStructure";

export interface Transaction {
    _id: string;
    senderId: string;
    recieverId: string;
    amount: number;
    status: string;
    transactionDate: string;
}
const TransactionHistory: FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const { _id } = useSelector((state: RootState) => state.auth)
    const [showAll, setShowAll] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                dispatch(setLoading(true));
                const { transactions } = await fetchTransactionHistoryApi();
                
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
        <div className="row-span-3 p-4 rounded-md  outline outline-gray-300">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Recent Transactions</h3>
            <ul className="text-sm text-gray-600 space-y-2 max-h-[300px] overflow-y-auto pr-5">
                {transactions.length <= 0 && <p className="text-gray-500 text-sm">No transation history</p>}
                {(showAll ? transactions : transactions.slice(0, 3)).map((tx, index) => (
                    <li key={index} className="flex justify-between">
                        {tx.status === 'success' ? (
                            <>
                            <span>
                               {tx.recieverId === _id ? `debited at ${convertTo12HourFormat(tx.transactionDate)}` : `credited at ${convertTo12HourFormat(tx.transactionDate)}`}
                            </span>
                            <span className={`${tx.recieverId === _id ? 'text-green-500' : 'text-red-500'}`}>
                                {tx.recieverId === _id ? '+' : '-'} {tx.amount}
                            </span>
                           
                        </>
                        ) : (
                            <>
                                <span>
                                   {tx.senderId !== _id ? `credited at ${convertTo12HourFormat(tx.transactionDate)}` : `debited at ${convertTo12HourFormat(tx.transactionDate)}`}
                                </span>
                                <span className={`${tx.senderId === _id ? 'text-green-500' : 'text-red-500'}`}>
                                    {tx.senderId === _id ? '+' : '-'} {tx.amount}
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
