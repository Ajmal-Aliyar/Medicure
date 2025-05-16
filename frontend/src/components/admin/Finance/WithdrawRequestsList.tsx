import { FC, useEffect, useState } from "react"
import { Check, ChevronLeft, ChevronRight, X } from "lucide-react";
import { convertTo12HourFormat } from "../../../utils/timeStructure";
import { clearWarning, setError, setExtra, setLoading, setSuccess, setWarning } from "../../../store/slices/commonSlices/notificationSlice";
import { useDispatch, useSelector } from "react-redux";
import { approveWithdrawRequestApi, cancelWithdrawRequestApi, fetchWithdrawRequestsApi, fetchWithdrawRequestsByUserApi, IWithdrawRequests } from "../../../sevices/withdraw";
import { RootState } from "../../../store/store";


const WithdrawRequestsList: FC = () => {
  const [requests, setRequests] = useState<IWithdrawRequests[]>([])
  const [skip, setSkip] = useState<number>(0);
  const [limit] = useState<number>(5);
  const [total, setTotal] = useState<number>(0);
  const [status, setStatus] = useState<'' | 'pending' | 'approved' | 'rejected'>('')
  const { role } = useSelector((state: RootState) => state.auth)
  const [theme, setTheme] = useState({ dark: '', mid: '', light: '' })
  const dispatch = useDispatch()


  useEffect(() => {
    const newTheme = role === 'doctor' ? { dark: '#51aff6ce', mid: '#51aff666', light: '#51aff630' } : { dark: '#6A9C89', mid: '#a0c0b4', light: '#C4DAD2' }
    setTheme(newTheme)
    const fetchWithdrawrequests = async () => {
      const requestsFunction = role === 'doctor' ? fetchWithdrawRequestsByUserApi : fetchWithdrawRequestsApi
      const { withdrawRequests, total } = await requestsFunction(status, skip, limit)

      setRequests(withdrawRequests)
      setTotal(total)
    }

    fetchWithdrawrequests()
  }, [skip, status])

  const handleNext = () => {
    if (skip + limit < total) {
      setSkip(skip + limit);
    }
  };

  const handlePrev = () => {
    if (skip - limit >= 0) {
      setSkip(skip - limit);
    }
  };

  const ApproveRequestHandler = (id: string, status: string) => {
    dispatch(setExtra(() => ApproveRequest(id, status)))
    dispatch(setWarning(`Do you want to ${status} this request?`))
  }

  const ApproveRequest = async (id: string, status: string) => {
    try {
      dispatch(setLoading(true))
      dispatch(clearWarning())
      dispatch(setExtra(null))

      const response = status === 'approve' ? await approveWithdrawRequestApi(id) : await cancelWithdrawRequestApi(id)
      setStatus(status === 'cancel' ? 'rejected' : 'approved')
      dispatch(setSuccess(response.message))

    } catch (error: unknown) {
      const err = error as any;
      const errorMsg = err.response?.data?.message || `Error occured while ${status} withdraw`
      dispatch(setError(errorMsg))
    } finally {
      dispatch(setLoading(false))
    }
  }


  return (
    <div className='box row-span-4 rounded-md bg-white shadow-md p-4'>
      <h3 className="text-lg font-semibold text-gray-700 mb-2">Withdraw Requests</h3>
      <div className='flex flex-wrap gap-2 justify-between mb-4 items-center'>
        <div className='flex flex-wrap gap-1 text-white text-sm'>
          <div
            onClick={() => setStatus('')}
            className={`px-2 py-1 cursor-pointer rounded`}
            style={{ backgroundColor: status === '' ? theme.dark : theme.mid }}
          >All</div>
          <div
            onClick={() => setStatus('approved')}
            className={`px-2 py-1 cursor-pointer rounded`}
            style={{ backgroundColor: status === 'approved' ? theme.dark : theme.mid }}

          >Approved</div>
          <div
            onClick={() => setStatus('rejected')}
            className={`px-2 py-1 cursor-pointer rounded`}
            style={{ backgroundColor: status === 'rejected' ? theme.dark : theme.mid }}
          >Cancelled</div>
          <div
            onClick={() => setStatus('pending')}
            className={`px-2 py-1 cursor-pointer rounded`}
            style={{ backgroundColor: status === 'pending' ? theme.dark : theme.mid }}
          >Pending</div>
        </div>
        {total > 0 && <div className=" text-white flex gap-1">
          <button onClick={handlePrev} disabled={skip === 0} className="px-2 py-1 bg-[#a0c0b4] h-fit rounded"
            style={{ backgroundColor: theme.mid }}><ChevronLeft size={20} /></button>
          <div className=' max-w-[300px] gap-1 overflow-x-auto flex'>
            {Array.from({ length: Math.ceil(total / limit) }, (_, index) => (
              <button
                key={index}
                onClick={() => setSkip(index * limit)}
                className={`px-3  rounded `}
                style={{ backgroundColor: skip / limit === index ? theme.dark : theme.light, }}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button onClick={handleNext} disabled={skip + limit >= total} className="px-2 py-1 h-fit rounded"
            style={{ backgroundColor: theme.mid }}><ChevronRight size={20} /></button>
        </div>}
      </div>

      {total > 0 ? requests.map((rq: IWithdrawRequests) => (
        <div key={rq._id} className="mb-2 outline outline-gray-300 p-2 rounded-md flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <img src={rq.doctorDetails.profileImage} className="w-16 rounded-full overflow-hidden" alt="" />
            <div>
              <p className="text-md text-[#2f3c62d8] font-medium ">{rq.doctorDetails.fullName}</p>
              <p className="text-md font-medium "
                style={{ color: theme.dark }}>{rq.doctorDetails.specialization}</p>
            </div>
          </div>
          <div className='flex flex-wrap justify-end w-[150px] gap-1'>
            <div
              className={`flex items-center gap-1 outline h-fit px-2 rounded-md text-sm  cursor-pointer relative `}
              style={{ outlineColor: theme.dark, color: theme.dark }}>
              {convertTo12HourFormat(rq.updatedAt)}
            </div>
            <div className={`flex items-center gap-1 outline h-fit px-2 rounded-md text-sm cursor-pointer relative `}
              style={{ outlineColor: theme.dark, color: theme.dark }}>
              {rq.amount}rs
            </div>
            {rq.status === 'pending' &&
              <div className={`flex items-center gap-1 outline bg-gray-700/60 h-fit px-1 rounded-sm text-white cursor-pointer relative `}
                onClick={() => ApproveRequestHandler(rq._id, 'cancel')}>
                <X size={19} />
              </div>}
            {role === 'admin' && rq.status === 'pending' &&
              <div className={`flex items-center gap-1 outline  h-fit px-1 rounded-sm bg-[#6A9C89] text-white cursor-pointer relative `}
                onClick={() => ApproveRequestHandler(rq._id, 'approve')}>
                <Check size={20} />
              </div>}
          </div>
        </div>
      )) : <p className="w-full h-16 flex items-center text-gray-500 font-medium">empty !</p>}


    </div>
  )
}

export default WithdrawRequestsList
