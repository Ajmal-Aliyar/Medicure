import { useState } from "react"
import { PatientListPannel } from "./components/PatientListPannel"
import { PatientDetailsPannel } from "./components/PatientDetailsPannel"

const AdminPatientsPage = () => {
  const [patientID, setPatientID] = useState<string | null>(null)
  return (
    <div className="w-full bg-surfce rounded-md flex flex-col md:flex-row gap-4 relative">
      <PatientListPannel patientID={patientID} setPatientID={setPatientID} />
      <PatientDetailsPannel patientID={patientID} setPatientID={setPatientID} />
    </div>
  )
}

export default AdminPatientsPage