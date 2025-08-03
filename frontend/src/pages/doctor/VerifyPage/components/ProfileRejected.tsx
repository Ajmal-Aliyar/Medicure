import { ArrowBigRight } from "lucide-react"


export const ProfileRejected = () => {
    const editSubmitReview = () => {
        // dispatch(handleApprove({ status: "pending" }))
    }
    return (
        <div className='w-full h-[80%] flex justify-center items-center '>
            <div className="notifications-container shadow ">
                <div className="bg-red-600/20 p-4 shadow-2xl rounded-md">
                    <div className="flex">
                        <div className="flex flex-col ">
                            <p className="text-xl font-bold text-red-700">Submission Rejected
                            </p><div className="">
                                <p>Your submission was rejected. Check what happened.</p>
                            </div>
                            <div className="flex gap-2 justify-between mt-6 ml-auto">
                                <p className="flex items-center text-white font-medium cursor-pointer active:scale-95"
                            onClick={editSubmitReview}><ArrowBigRight fill="white" size={23}/></p>
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

