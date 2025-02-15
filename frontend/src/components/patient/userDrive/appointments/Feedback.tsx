import React, { useEffect } from 'react'
import { fetchFeedbacksApi } from '../../../../sevices/feedback/feedback'

const Feedback = () => {

    useEffect(() => {
       const fetchFeedbacks = async () => {
        const  FeedbackData = await fetchFeedbacksApi()
        console.log(FeedbackData)
       } 
       fetchFeedbacks()
    },[])
  return (
    <div>
      feedbackjkladsnf
    </div>
  )
}

export default Feedback
