import HeaderCards from "../../components/admin/patients/HeaderCards"
import PatientsList from "../../components/admin/patients/PatientsList"


function Patients() {

    return (
        <div className="w-full h-full flex flex-col flex-1 py-6 ">
            <HeaderCards />
            <PatientsList  />
        </div>
    )
}

export default Patients
