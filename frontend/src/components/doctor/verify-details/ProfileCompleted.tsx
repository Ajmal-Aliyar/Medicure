import { Edit } from "lucide-react"
import { useDispatch } from "react-redux"
import { handleApprove } from "../../../store/slices/commonSlices/AuthSlice"

const ProfileCompleted = () => {
    const dispatch = useDispatch()
    const editSubmitReview = () => {
        dispatch(handleApprove({ status: "pending" }))
    }
    return (
        <div className='w-full h-[80%] flex justify-center items-center '>
            <div className="notifications-container shadow ">
                <div className="success">
                    <div className="flex">
                        <div className="flex-shrink-0">

                            <svg className="succes-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                            </svg>
                        </div>
                        <div className="success-prompt-wrap flex flex-col">
                            <p className="success-prompt-heading text-lg">Submited successfully
                            </p><div className="success-prompt-prompt">
                                <p>Your submission was successful. Your data is now under review for approval and verification.</p>
                            </div>
                            <div className="flex gap-2 justify-between mt-6 ml-auto">
                                {/* <p className="flex items-center text-red-700 font-medium cursor-pointer active:scale-95 underline"
                                onClick={editSubmitReview}>cancel request review</p> */}
                                <p className="flex items-center text-green-800 font-medium cursor-pointer active:scale-95"
                            onClick={editSubmitReview}><Edit size={15}/> edit</p>
                            </div>
                            
                        </div>
                        <div className="success-prompt-wrap">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileCompleted
