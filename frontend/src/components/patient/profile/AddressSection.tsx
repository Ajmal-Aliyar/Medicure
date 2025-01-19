import { IPatientProfilePayload } from "../../../types/patient/profileType";

interface IAddressSectionProps {
    patientData: IPatientProfilePayload;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const AddressSection:React.FC<IAddressSectionProps> = ({patientData, handleChange}) => {
    return (
        <div className="flex flex-wrap gap-3">
            <div className="w-[250px]">
                <label
                    htmlFor="houseName"
                    className="block text-sm text-gray-400 "
                >
                   House  No. / Street Name/ Area *
                </label>
                <input
                    type="text"
                    name="houseName"
                    value={patientData.houseName || ''}
                    onChange={(e) => handleChange(e)}
                    className="w-full border-2 border-gray-300 rounded-md p-2 outline-none focus:border-blue-300 bg-transparent transition-all text-gray-500"
                />
            </div>

            <div className="w-[250px]">
                <label
                    htmlFor="street"
                    className="block text-sm text-gray-400 "
                >
                    Colony / Street / Locality*
                </label>
                <input
                    type="text"
                    name="street"
                    value={patientData.street || ''}
                    onChange={(e) => handleChange(e)}
                    className="w-full border-2 border-gray-300 rounded-md p-2 outline-none focus:border-blue-300 bg-transparent transition-all text-gray-500" />
            </div>

            <div className="w-[250px]">
                <label
                    htmlFor="city"
                    className="block text-sm text-gray-400 "
                >
                    City*
                </label>
                <input
                    type="text"
                    name="city"
                    value={patientData.city || ''}
                    onChange={(e) => handleChange(e)}
                    className="w-full border-2 border-gray-300 rounded-md p-2 outline-none focus:border-blue-300 bg-transparent transition-all text-gray-500"
                />
            </div>

            <div className="w-[250px]">
                <label
                    htmlFor="state"
                    className="block text-sm text-gray-400 "
                >
                    State*
                </label>
                <input
                    type="text"
                    name="state"
                    value={patientData.state || ''}
                    onChange={(e) => handleChange(e)}
                    className="w-full border-2 border-gray-300 rounded-md p-2 outline-none focus:border-blue-300 bg-transparent transition-all text-gray-500"
                />
            </div>

            <div className="w-[250px]">
                <label
                    htmlFor="country"
                    className="block text-sm text-gray-400 "
                >
                    Country*
                </label>
                <input
                    type="text"
                    name="country"
                    value={patientData.country || ''}
                    onChange={(e) => handleChange(e)}
                    className="w-full border-2 border-gray-300 rounded-md p-2 outline-none focus:border-blue-300 bg-transparent transition-all text-gray-500"
                />
            </div>

            <div className="w-[250px]">
                <label
                    htmlFor="pincode"
                    className="block text-sm text-gray-400 "
                >
                    Pin Code*
                </label>
                <input
                    type="text"
                    name="pincode"
                    value={patientData.pincode || ''}
                    onChange={(e) => handleChange(e)}
                    className="w-full border-2 border-gray-300 rounded-md p-2 outline-none focus:border-blue-300 bg-transparent transition-all text-gray-500"
                />
            </div>
        </div>
    )
}

export default AddressSection
