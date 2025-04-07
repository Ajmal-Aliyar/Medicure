import { useDispatch } from "react-redux";
import { setError, setLoading } from "../../../store/slices/commonSlices/notificationSlice";
import { useEffect, useState } from "react";
import { IFetchFeedbacks } from "../../../types/feedback/feedback";
import { fetchFeedbacksApi } from "../../../sevices/feedback/feedback";

import StarRating from "../../patient/common/StarRating";
import { convertToDateAndTime } from "../../../utils/timeStructure";
import { History } from "lucide-react";

function Reviews() {
  const [feedback, setFeedback] = useState<IFetchFeedbacks[]>([])
    const [showMore, setShowMore] = useState<number>(0)
    const [total, setTotal] = useState<number>(0)
    const dispatch = useDispatch()
  
    useEffect(() => {
      fetchFeedbacks()
    }, [showMore])
  
    const fetchFeedbacks = async () => {
      try {
        dispatch(setLoading(true));
        const { feedbacks, total } = await fetchFeedbacksApi('doctor', showMore,  3)
  
        console.log(feedbacks, total);
        
        setFeedback((prevFeedback) => [...prevFeedback, ...feedbacks])
        setTotal(total)
      } catch (error) {
        dispatch(setError("Failed to load transactions."));
      } finally {
        dispatch(setLoading(false));
      }
  
    }

  return (
    <div className="firstCard col-span-12 bg-white p-4 rounded-lg shadow-lg ">
      <p className="font-bold text-2xl mb-2 text-[#0c0b3eb5] flex justify-between border-b-[2px] border-gray-100">
        Reviews
      </p>
      <p className="text-xs">
        These stories represent patient opinions and experiences. They do not reflect the doctor's medical capabilities.
      </p>

      <div className="mt-3">
        {
          <div className="space-y-4">
            {feedback.map((review) => (
          <div key={review._id} className="max-w-[600px] mb-2 shadow-sm outline outline-gray-300 p-2 rounded-md flex gap-2 ">
            <img src={review.details.profileImage} className='w-20 h-20 rounded-md' alt="" />
            <div className='flex flex-col leading-4 '>
              <p className='font-semibold text-lg text-[#2f3c62d8] '>{review.details.fullName}</p>
              <p className='text-xs font-normal text-[#51aff6]'>{review.details.specialization}</p>
              <StarRating rating={review.rating} />
              <p className='text-[10px] font-medium text-gray-400 mt-2'>{convertToDateAndTime(review.createdAt)}</p>
              <p className='text-sm text-gray-400'>{review.comments}</p>
            </div>
          </div>
        ))}
        {feedback.length === 0 && <p className="text-sm text-gray-400">No pending reviews!</p>}

          </div>
         }
      </div>

      { total > showMore + 3 &&  (
                <div className="mt-4 text-center">
                    <button onClick={() => setShowMore(p => p + 3)} className="text-blue-400 hover:underline flex items-center gap-1">
                        <History size={16} /> Show More
                    </button>
                </div>
            )}
    </div>
  );
}

export default Reviews;
