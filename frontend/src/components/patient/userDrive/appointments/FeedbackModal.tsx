import { X } from 'lucide-react';
import React, { useState } from 'react'
import StarRating from '../../common/StarRating';
import { useDispatch, useSelector } from 'react-redux';
import { setError, setSuccess } from '../../../../store/slices/commonSlices/notificationSlice';
import { createFeedbackApi } from '../../../../sevices/feedback/feedback';
import { RootState } from '../../../../store/store';

interface FeedbackModalProps {
    feedback: { appointmentId: string, doctorId: string, open: boolean };
    setFeedback: React.Dispatch<React.SetStateAction<{
      appointmentId: string;
      doctorId: string;
      open: boolean;
  }>>
}

const FeedbackModal: React.FC <FeedbackModalProps> = ({ feedback, setFeedback}) => {
    const [rating, setRating] = useState<number>(1)
    const [feedbackText, setFeedbackText] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const clientId = useSelector((state: RootState) => state.auth._id)
    const dispatch = useDispatch()

    const handleFeedbackSubmit = async () => {
      try {
        const message = await createFeedbackApi( feedback.doctorId, feedback.appointmentId, clientId, rating, feedbackText)
        dispatch(setSuccess(message.response))
        setFeedback({appointmentId: '', doctorId: '', open: false})
      } catch (error: unknown) {
        dispatch(setError('Error occured while creating feedback'))
      }
    }

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/20">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 flex flex-col gap-4">
        <div className="flex justify-between pb-2">
          <p className="text-lg font-semibold text-[#2f3c62d8]">Give Feedback</p>
          <button onClick={() => setFeedback({appointmentId: '', doctorId: '', open: false})}> <X className="text-gray-500 hover:text-gray-700" /> </button>
        </div>
        
        <div className="flex flex-col items-center gap-4">
          <StarRating setRating={setRating} rating={rating} />
          <div
            className="w-full p-3 min-h-[60px] text-gray-700 bg-gray-100 rounded-md cursor-text border border-transparent focus-within:border-blue-400 "
            onClick={() => setIsEditing(true)}
          >
            {isEditing ? (
              <textarea
                className="w-full bg-transparent focus:outline-none"
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                onBlur={() => setIsEditing(false)}
                autoFocus
              />
            ) : (
              <p className="text-gray-500">{feedbackText}</p>
            )}
          </div>
        </div>
        
        <div className="flex justify-end">
          <button className="px-4 py-1 bg-blue-300 text-white rounded-md hover:bg-blue-400 active:scale-95 transition"
          onClick={() => handleFeedbackSubmit()}>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default FeedbackModal
