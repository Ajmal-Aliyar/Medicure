import type { RootState } from "@/app/store";
import { ConfirmationModal } from "@/components/domain/Modals/ConfirmationModal";
import Loader from "@/components/ui/Loader";
import { adminWithdrawRequest } from "@/services/api/admin/withdraw-request";
import { doctorWithdrawRequest } from "@/services/api/doctor/withdraw-request";
import { addWithdrawRequest } from "@/slices/financeSlice";
import type { IWithdrawRequestService } from "@/types/withdraw-request";
import { BanknoteArrowDown, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import {  useDispatch, useSelector } from "react-redux";

interface IBankAccountDetails {
    setWithdraw: React.Dispatch<React.SetStateAction<boolean>>;
}

const BankAccountDetails = ({ setWithdraw }: IBankAccountDetails) => {
    const {wallet} = useSelector((state: RootState) => state.finance)
    const [openModal, setOpenModal] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const { user } = useSelector((state: RootState) => state.auth);
    const [formData, setFormData] = useState({
        accountName: "",
        accountNumber: "",
        IFSC_Code: "",
        amount: 0
    });
    const dispatch = useDispatch()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    if (!wallet) return null;
    const handleSubmit = async () => {
        setLoading(true)
        // const request = await fetchWithdrawRequestsByUserApi( 'pending', 0, Infinity)
        // const requestedAmount = request.withdrawRequests.reduce((acc, item) => item.amount + acc, 0)

        // if (requestedAmount > formData.amount - 20) {
        //     dispatch(setError('You have pending requests. This amount exceeds your available balance.')); 
        //     return;
        //   }


        if (25 > formData.amount) {
            toast.error('Minimum 20rs should be withdrawn')
            setLoading(false)
            return
        } else if (formData.amount > wallet?.balance) {
            toast.error(`Wallet only contains ${wallet?.balance}rs balance`)
            setLoading(false)
            return
        }
        setOpenModal(`Trying to withdraw ${formData.amount} from wallet. You will receive ${formData.amount - 20}rs after a 20rs transaction fee deduction.`)
        setLoading(false)
    };

    const withdrawHandler = async () => {
        setLoading(true)
        const service: Record<'admin' | 'doctor', IWithdrawRequestService> = {
            admin: adminWithdrawRequest,
            doctor: doctorWithdrawRequest
        }
        const { accountName,
            accountNumber,
            IFSC_Code, } = formData
        const response = await service[user?.role as 'admin' | 'doctor'].requestWithdraw({ accountName, accountNumber, IFSC_Code, amount: Number(formData.amount) , requestedAt: new Date(), status: 'pending' })
        console.log(response, 'new ');
        dispatch(addWithdrawRequest(response))
        
        if (response) {
            toast.success('Withdraw request submitted successfully.')
            setOpenModal(null)
            setWithdraw(false)
        }

        setLoading(true)
    }




    return (
        <div className="z-50 fixed top-0 left-0 w-screen h-screen bg-black/20 flex justify-center items-center">
            {openModal && <ConfirmationModal confirmLabel="request withdraw" description={openModal} onCancel={() => setOpenModal(null)} onConfirm={withdrawHandler} title="" icon={<BanknoteArrowDown className="text-white" />} />}
            <div className="w-full relative max-w-xl p-6 bg-white rounded-lg shadow-lg overflow-hidden">
                {loading && <div className="absolute w-full h-full top-0 right-0 z-40 flex items-center justify-center bg-white/80">
                    <Loader className="text-white" />
                </div>}
                <div className="p-1 bg-[#e77272] rounded-md m-2 absolute right-0 top-0 text-white cursor-pointer"
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

                <button className={`w-full mt-6 p-2 bg-[#72b4e7] hover:bg-[#649dc8] text-white rounded-md`} onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
};

export default BankAccountDetails;
