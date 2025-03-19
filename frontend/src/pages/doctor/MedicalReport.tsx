
import { useMedicalRecord } from "../../context/MedicalReportProvider";
import { FC } from "react";
import { IMedicalRecord } from "../../types/record/record";

interface MedicalRecordFormProps {
  endCall: boolean; 
  handleMedicalReportUpload: (val: boolean, state: IMedicalRecord) => void
}

export const MedicalRecordForm:FC<MedicalRecordFormProps> = ({ endCall, handleMedicalReportUpload }) => {
  const { state, dispatch } = useMedicalRecord();



  

  
  return (
    <div className="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 pb-10 fixed md:bottom-10 md:right-10 bottom-0 right-0">
      <div className="border-b mb-4">
        <h2 className="text-2xl font-semibold">Medical Record Entry</h2>
        <p className="text-gray-600">Enter patient examination details</p>
      </div>
      <form  className="space-y-4 text-black">
        <div>
          <label className="block text-gray-700 font-medium">Diagnosis</label>
          <textarea
            name="diagnosis"
            placeholder="Enter detailed diagnosis"
            value={state.diagnosis}
            onChange={(e) => dispatch({ type: "SET_FIELD", field: 'diagnosis', value: e.target.value })}
            className="w-full p-2 border rounded min-h-[100px] focus:ring focus:ring-blue-200 "
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Prescription</label>
          <textarea
            name="prescription"
            placeholder="Enter prescription details"
            value={state.prescription}
            onChange={(e) => dispatch({ type: "SET_FIELD", field: 'prescription', value: e.target.value })}
            className="w-full p-2 border rounded min-h-[100px] focus:ring focus:ring-blue-200"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Allergies</label>
          <textarea
            name="allergy"
            placeholder="Enter patient allergies"
            value={state.allergy}
            onChange={(e) => dispatch({ type: "SET_FIELD", field: 'allergy', value: e.target.value })}
            className="w-full p-2 border rounded focus:ring focus:ring-blue-200"
          />
        </div>

        {endCall && <div className="w-full flex justify-center gap-4">
          <div onClick={() => handleMedicalReportUpload(false, state)} className="px-3 py-1 border rounded-md border-gray-300">Update Later</div>
          <div onClick={() => handleMedicalReportUpload(true, state)} className="px-3 py-1 border rounded-md border-gray-300">Confirm</div>
        </div> }

       
      </form>
    </div>
  )
}
