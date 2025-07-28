
import { useState } from 'react';
import "@/assets/style/index.css"
import { useDispatch } from 'react-redux';
import { Plus } from 'lucide-react';
import { handleApprove } from '@/slices/authSlice';
import { doctorService } from '@/services/api/doctor/doctor';
import { setLoading } from '@/slices/globalSlice';

export const Content: React.FC<{handleModal: (val: string) => void}> = ({ handleModal }) => {
  const dispatch = useDispatch()
  const [error, setError] = useState(false)

  const steps = [
    {
      title: 'Profile Image',
      description: "Doctor’s basic details, medical registration, education qualification, establishment details, etc.",
    },
    {
      title: 'Profile Details',
      description: "Doctor’s basic details, medical registration, education qualification, establishment details, etc.",
    },
    {
      title: 'Professional Details',
      description: "Doctor’s basic details, medical registration, education qualification, establishment details, etc.",
    },
    {
      title: 'Profile Verification',
      description: "Doctor identity proof, registration proof, establishment ownership proof, etc.",
    },
  ];

  const handleSubmit = async () => {
    try {
      dispatch(setLoading(true));
      const response = await doctorService.submitForReview()
      if (!response.data.success) {
        setError(true);
      } else {
        dispatch(handleApprove({status: 'applied'}))
      }
    } catch (error) {
      setError(true);
      console.error("Submission failed:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="md:flex justify-center items-center flex-1 md:p-4">
      <div className="bg-white p-10 md:rounded-lg w-[100%] max-w-2xl relative">
        <h1 className="anime-text text-4xl font-bold text-[#0c0b3eb5] mb-3">Great Progress!</h1>
        <p className="anime-text text-lg text-gray-600 mb-8">You're just a few steps away from going live.</p>

        {steps.map((step, index) => (
          <div key={index} className="mb-8">
            <p className="anime-text text-gray-500 font-semibold text-lg">Step {String.fromCharCode(65 + index)}: {step.title}</p>
            <p className="anime-text text-gray-700 mb-3">{step.description}</p>
            <button
              onClick={() => handleModal(step.title)}
              className="cursor-pointer anime-button flex items-center gap-1 text-[#2ea118c4] font-medium hover:scale-105 transition-transform active:scale-95">
              <div className="w-4 h-4 border-2 border-[#2ea118c4] rounded-full flex justify-center items-center">
                <Plus />
              </div>
              Add
            </button>
          </div>
        ))}
        {error && <p className='text-sm text-red-400 '>* Please complete all the required fields before submitting.</p>}
        <button className="anime-button-up w-full mt-5 py-3 bg-[#0c0b3eb5] text-white font-bold rounded-full transition-all active:scale-95" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  )
}

