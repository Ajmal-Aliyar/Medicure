import { IContentProps } from "../../../types/doctor/verifyDetailsType";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import HoneyComb from '../../common/HoneyComb';
import { useState } from 'react';
import "./style.css"
import { submitVerificationApi } from "../../../sevices/doctor/verification";

const Content: React.FC<IContentProps> = ({ handleModal }) => {
  const [isProfileCompleted, setIsProfileCompleted] = useState(false)
  const [loading, setLoading] = useState(false)
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
    {
      title: 'Appointments Setup',
      description: "Location, Timings, Fees, etc.",
    },
  ];

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await submitVerificationApi()
      if (!response.data.status) {
        setError(true);
      } else {
        setIsProfileCompleted(true)
      }
    } catch (error) {
      setError(true);
      console.error("Submission failed:", error);
    } finally {
      setLoading(false);
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
                <FontAwesomeIcon icon={faPlus} className="text-[10px]" />
              </div>
              Add
            </button>
          </div>
        ))}
        {error && <p className='text-sm text-red-400 '>* Please complete all the required fields before submitting.</p>}
        <button className="anime-button-up w-full mt-5 py-3 bg-[#0c0b3eb5] text-white font-bold rounded-full transition-all active:scale-95" onClick={handleSubmit}>
          Submit
        </button>
      {isProfileCompleted && (
        <div className='fixed w-full top-0 left-0 h-full rounded-md bg-gray-200 bg-opacity-90 flex justify-center items-center '>
          <div className="notifications-container">
            <div className="success">
              <div className="flex">
                <div className="flex-shrink-0">

                  <svg className="succes-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <div className="success-prompt-wrap">
                  <p className="success-prompt-heading text-lg">Submited successfully
                  </p><div className="success-prompt-prompt">
                    <p>Your submission was successful. Your data is now under review for approval and verification.</p>
                  </div> 
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>

      {loading && <div className='w-screen h-screen fixed flex justify-center items-center top-0 bg-[#efefefd3]'>
        <HoneyComb />
      </div>}
    </div>
  )
}

export default Content
