import { useEffect, useState } from "react"
import { Check, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import { formatTimeTo12Hour } from "@/utils/formatDate";
import type { IWithdrawRequest, IWithdrawRequestService, IWithdrawRequestStatus } from "@/types/withdraw-request";
import { adminWithdrawRequest } from "@/services/api/admin/withdraw-request";
import { doctorWithdrawRequest } from "@/services/api/doctor/withdraw-request";
import { Pagination } from "@/components/ui/Pagination";
import { DEFAULT_IMAGE } from "@/app/constants";
import { Button } from "@/components/ui/Button";
import { useModal } from "@/hooks";
import { statusColor } from "@/utils/statusColor";
import { addTransaction, setWithdrawRequests, setWithdrawStatus, updateWalletBalance, updateWithdrawRequestStatus } from "@/slices/financeSlice";

const WithdrawRequestsList = () => {
  const { withdrawRequests, withdrawStatus, wallet } = useSelector((state: RootState) => state.finance)
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const { user } = useSelector((state: RootState) => state.auth)
  const showModal = useModal();
  const dispatch = useDispatch()
  const handleCancelAction = (id: string) => {
    const service = getService()
    showModal({
      type: 'primary',
      title: `Confirm Cancel`,
      message: `Are you sure you want to ${user?.role == 'admin' ? 'reject' : 'cancel'} withdraw?`,
      confirmText: `yes`,
      cancelText: 'no',
      showCancel: true,
      onConfirm: async () => {
        const response = await service[user?.role as 'admin' | 'doctor'].cancelWithdrawRequests(id, status)
        if (!response) return
        dispatch(updateWithdrawRequestStatus({ id, ...(user?.role == 'admin' ? { status: 'rejected' } : { status: 'cancelled' }) }))
      },
    });
  }

  const handleApproveAction = (id: string) => {
    showModal({
      type: 'primary',
      title: `Confirm Approve`,
      message: `Are you sure you want to approve withdraw?`,
      confirmText: `yes`,
      cancelText: 'no',
      showCancel: true,
      onConfirm: async () => {
        const transaction = await adminWithdrawRequest.approveWithdrawRequests(id)
          dispatch(updateWithdrawRequestStatus({ id, status: 'approved' }))
          dispatch(addTransaction(transaction))
        if (wallet) {
          const walletBallance = user?.role === 'admin' ? wallet?.balance - transaction.amount : wallet?.balance - (transaction.amount + 20)
          dispatch(updateWalletBalance(walletBallance))
        }
      },
    });
  }


  useEffect(() => {
    const fetchWithdrawrequests = async () => {
      const service = getService()
      const { data, meta } = await service[user?.role as 'admin' | 'doctor'].getWithdrawRequests(page, withdrawStatus as IWithdrawRequestStatus)
      dispatch(setWithdrawRequests(data))
      setTotalPage(meta.totalPages)
      setPage(meta.page)
    }

    fetchWithdrawrequests()
  }, [withdrawStatus, page])

  const getService = () => {
    const service: Record<'admin' | 'doctor', IWithdrawRequestService> = {
      admin: adminWithdrawRequest,
      doctor: doctorWithdrawRequest
    }
    return service
  }


  return (<>
    <div className='flex flex-wrap gap-2 justify-between mb-4 items-center'>
      <div className='flex flex-wrap gap-3 text-secondary text-sm p-4 font-normal'>
        <div
          onClick={() => dispatch(setWithdrawStatus('all'))}
          className={`px-2 py-1 cursor-pointer rounded shadow min-w-20 text-center ${withdrawStatus === 'all' ? "bg-primary-light text-white" : ''}`}
        >All</div>
        <div
          onClick={() => dispatch(setWithdrawStatus('approved'))}
          className={`px-2 py-1 cursor-pointer rounded shadow min-w-20 text-center ${withdrawStatus === 'approved' ? "bg-primary-light text-white" : ''}`}

        >Approved</div>
        <div
          onClick={() => dispatch(setWithdrawStatus('cancelled'))}
          className={`px-2 py-1 cursor-pointer rounded shadow min-w-20 text-center ${withdrawStatus === 'cancelled' ? "bg-primary-light text-white" : ''}`}
        >Cancelled</div>
        <div
          onClick={() => dispatch(setWithdrawStatus('rejected'))}
          className={`px-2 py-1 cursor-pointer rounded shadow min-w-20 text-center ${withdrawStatus === 'rejected' ? "bg-primary-light text-white" : ''}`}
        >Rejected</div>
        <div
          onClick={() => dispatch(setWithdrawStatus('pending'))}
          className={`px-2 py-1 cursor-pointer rounded shadow min-w-20 text-center ${withdrawStatus === 'pending' ? "bg-primary-light text-white" : ''}`}
        >Pending</div>
      </div>

      <Pagination currentPage={page} onPageChange={setPage} totalPages={totalPage} />
    </div>

    <div className="flex flex-col p-3 overflow-y-auto">
      {totalPage > 0 ? withdrawRequests.map((rq: IWithdrawRequest) => (
        <div key={rq.id} className="mb-2 outline outline-gray-300 p-2 rounded-md flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <img src={(user?.role === 'doctor' ? user.profileImage : rq?.requester?.profileImage) || DEFAULT_IMAGE} className="w-16 rounded-full overflow-hidden" alt="" />
            <div>
              <p className="text-md text-[#2f3c62d8] font-medium ">{(user?.role === 'doctor' ? user?.fullName : rq.requester?.fullName) || 'Medicure'}</p>
              <p className="text-md font-medium text-primary">{(user?.role === 'doctor' ? '' : rq.requester?.specialization)}</p>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium text-${statusColor(
                rq.status
              )}-700 bg-${statusColor(rq?.status)}-100`}
            >
              {rq.status}
            </span>
          </div>
          <div className='flex flex-wrap justify-end w-[150px] gap-1'>
            <div
              className={`flex items-center gap-1 outline h-fit px-2 rounded-md text-sm  cursor-pointer relative `}>
              {formatTimeTo12Hour(rq?.requestedAt)}
            </div>
            <div className={`flex items-center gap-1 outline h-fit px-2 rounded-md text-sm cursor-pointer relative `}>
              {rq.amount}rs
            </div>

            {rq.status === 'pending' &&
              <Button variant="muted" className="px-3" onClick={() => handleCancelAction(rq.id)}>
                <X size={19} />
              </Button>}
            {user?.role === 'admin' && rq?.status === 'pending' &&
              <Button className="px-3"
                onClick={() => handleApproveAction(rq.id)}>
                <Check size={20} />
              </Button>}
          </div>
        </div>
      )) : <p className="w-full h-16 flex items-center text-gray-500 font-medium">empty !</p>}
    </div>
  </>
  )
}

export default WithdrawRequestsList
