import { X } from "lucide-react";
import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { clearWarning, setError, setExtra, setLoading, setSuccess, setWarning } from "../../store/slices/commonSlices/notificationSlice";
import { createWithdrawRequestApi, fetchWithdrawRequestsByUserApi } from "../../sevices/withdraw";

interface IBankAccountDetails {
    setWithdraw: React.Dispatch<React.SetStateAction<boolean>>;
    wallet: number
}

const BankAccountDetails: FC<IBankAccountDetails> = ({ setWithdraw, wallet }) => {
    const { _id, role } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        accountName: "",
        accountNumber: "",
        IFSC_Code: "",
        amount: 0
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async () => {
        const request = await fetchWithdrawRequestsByUserApi( 'pending', 0, Infinity)
        const requestedAmount = request.withdrawRequests.reduce((acc, item) => item.amount + acc, 0)
        
        if (requestedAmount > formData.amount - 20) {
            dispatch(setError('You have pending requests. This amount exceeds your available balance.')); 
            return;
          }
          

        if (25 > formData.amount) {
            dispatch(setError('Minimum 20rs should be withdrawn')) 
            return
        } else if ( formData.amount > wallet ) {
            dispatch(setError(`Wallet only contains ${wallet}rs balance`)) 
            return
        }

        dispatch(setWarning(`Trying to withdraw ${formData.amount} from wallet. You will receive ${formData.amount - 20}rs after a 20rs transaction fee deduction.`))
        dispatch(setExtra(withdrawHandler))
    };

    const withdrawHandler = async () =>  {
        try {
            dispatch(setLoading(true))
            dispatch(setExtra(null))
            dispatch(clearWarning())

            let response = null;
            if (role === 'doctor') {
                response = await createWithdrawRequestApi({ recieverId: _id, ...formData, amount: formData.amount - 20, role })
            }
            if (!response?.message) throw new Error("Failed to submit bank details");
            setWithdraw(false)
            dispatch(setSuccess("Withdraw request submitted successfully"));
        } catch (error) {
            console.error("Error submitting bank details:", error);
            dispatch(setError("Error submitting bank details"));
        } finally {
            dispatch(setLoading(false))
        }
    }



    return (
        <div className="z-50 fixed top-0 left-0 w-screen h-screen bg-black/20 flex justify-center items-center">
            <div className="w-full relative max-w-xl p-6 bg-white rounded-lg shadow-lg">
                <div className="p-1 bg-[#e77272] rounded-md m-2 absolute right-0 top-0 text-white"
                     onClick={() => setWithdraw(false)}>
                    <X size={20} />
                </div>
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Bank Account Details</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="accountName" className="text-sm font-medium">Account Holder Name</label>
                        <input id="accountName" type="text" placeholder="Enter name" className="mt-1 border p-2 rounded-md" value={formData.accountName} onChange={handleChange} />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="accountNumber" className="text-sm font-medium">Account Number</label>
                        <input id="accountNumber" type="text" placeholder="Enter account number" className="mt-1 border p-2 rounded-md" value={formData.accountNumber} onChange={handleChange} />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="flex flex-col">
                        <label htmlFor="IFSC_Code" className="text-sm font-medium">IFSC Code</label>
                        <input id="IFSC_Code" type="text" placeholder="Enter IFSC code" className="mt-1 border p-2 rounded-md" value={formData.IFSC_Code} onChange={handleChange} />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="amount" className="text-sm font-medium">Amount</label>
                        <input id="amount" type="text" placeholder="Enter IFSC code" className="mt-1 border p-2 rounded-md" value={formData.amount} onChange={handleChange} />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="country" className="text-sm font-medium">Country</label>
                        <input id="country" type="text" value="IN" disabled className="mt-1 border p-2 rounded-md bg-gray-100" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="currency" className="text-sm font-medium">Currency</label>
                        <input id="currency" type="text" value="INR" disabled className="mt-1 border p-2 rounded-md bg-gray-100" />
                    </div>
                </div>

                <button className={`w-full mt-6 p-2 ${role === 'admin' ? '' : 'bg-[#72b4e7] hover:bg-[#649dc8]'} text-white rounded-md`} onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
};

export default BankAccountDetails;
