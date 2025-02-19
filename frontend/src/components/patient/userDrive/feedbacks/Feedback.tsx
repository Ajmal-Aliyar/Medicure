import { useEffect, useState } from 'react'
import { fetchFeedbacksApi } from '../../../../sevices/feedback/feedback'
import { IFetchFeedbacks } from '../../../../types/feedback/feedback'
import StarRating from '../../common/StarRating'
import { useDispatch } from 'react-redux'
import { setLoading } from '../../../../store/slices/commonSlices/notificationSlice'

const Feedback = () => {
  const [feedback, setFeedback] = useState<IFetchFeedbacks[]>([])
  const [page, setPage] = useState(1)
  const [limit] = useState(5) 
  const [hasMore, setHasMore] = useState(true) 
  const dispatch = useDispatch()

  useEffect(() => {
    fetchFeedbacks(page)
  }, [page]) 

  const fetchFeedbacks = async (pageNumber: number) => {
    dispatch(setLoading(true))
    const response = await fetchFeedbacksApi( 'user', pageNumber, limit) 

    if (response.feedbackData.length < limit) {
      setHasMore(false) 
    }

    setFeedback((prevFeedback) => [...prevFeedback, ...response.feedbackData])
    dispatch(setLoading(false))

  }

  return (
    <div className="p-2 w-full flex flex-col gap-4 h-[560px] overflow-auto">
      <div className="pr-2">
        <p className="text-lg text-[#2f3c62d8] font-medium mb-2">Reviews</p>

        {feedback.map((review) => (
          <div key={review._id} className="max-w-[600px] mb-2 shadow-sm bg-[#51aff612] p-2 rounded-md flex gap-2 items-center">
            <img src={review.details.profileImage} className='w-10 rounded-full' alt="" />
            <div className='flex flex-col leading-4 '>
              <div className='flex gap-2 items-center '>
                <p className='font-medium text-md text-[#2f3c62d8] '>{review.details.fullName}</p>
                <StarRating rating={review.rating} />
              </div>
              <p className='text-xs font-semibold text-[#51aff6]'>{review.details.specialization}</p>
              <div className='mt-1'>
                <p className='text-sm text-gray-400'>{review.comments}</p>
              </div>
            </div>
          </div>
        ))}

        {feedback.length === 0 && <p className="text-sm text-gray-400">No pending reviews!</p>}

         
<div className='flex justify-end'>
  {hasMore && (
          <button 
            onClick={() => setPage(page + 1)}
            className="mt-4 px-4 py-2 rounded-md text-gray-400 underline"
          >
            load More
          </button>
        )}
</div>
        
      </div>
    </div>
  )
}

export default Feedback
