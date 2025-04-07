import { useEffect, useState } from 'react'
import { fetchFeedbacksApi } from '../../../../sevices/feedback/feedback'
import { IFetchFeedbacks } from '../../../../types/feedback/feedback'
import StarRating from '../../common/StarRating'
import { useDispatch } from 'react-redux'
import { setError, setLoading } from '../../../../store/slices/commonSlices/notificationSlice'
import { convertToDateAndTime } from '../../../../utils/timeStructure'
import { History } from 'lucide-react'

const Feedback = () => {
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
      const { feedbacks, total } = await fetchFeedbacksApi('user', showMore,  5)

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
    <div className="p-2 w-full flex flex-col gap-4 h-[560px] overflow-auto">
      <div className="pr-2">
        <p className="text-lg text-[#2f3c62d8] font-medium mb-2">Reviews</p>

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


        <div className='flex justify-end'>
        { total > showMore + 5 &&  (
                <div className="mt-4 text-center">
                    <button onClick={() => setShowMore(p => p + 5)} className="text-blue-400 hover:underline flex items-center gap-1">
                        <History size={16} /> Show More
                    </button>
                </div>
            )}
        </div>

      </div>
    </div>
  )
}

export default Feedback
