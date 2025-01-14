import { Dispatch, SetStateAction, useState } from "react";
import FileUploader from "./FileUploader";

type ContentProps = {
    handleModal: (value: string) => void;
    setLoading: Dispatch<SetStateAction<boolean>>;
};

const ProfileVerificationForm: React.FC<ContentProps> = ({ handleModal, setLoading }) => {
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [identityProofFile, setIdentityProofFile] = useState<File | null>(null);
    const [identityProofPreview, setIdentityProofPreview] = useState<string | null>(null);
    const [medicalRegistrationFile, setMedicalRegistrationFile] = useState<File | null>(null);
    const [medicalRegistrationPreview, setMedicalRegistrationPreview] = useState<string | null>(null);
    const [establishmentProofFile, setEstablishmentProofFile] = useState<File | null>(null);
    const [establishmentProofPreview, setEstablishmentProofPreview] = useState<string | null>(null);

    const goToNextStep = () => {
        if (currentStep < 3) {
            setCurrentStep((prevStep) => prevStep + 1);
        }
    };

    const goToPreviousStep = () => {
        if (currentStep > 1) {
            setCurrentStep((prevStep) => prevStep - 1);
        }
    };

    const updateEstablishmentProof = (file: File | null, preview: string | null) => {
        setEstablishmentProofFile(file);
        setEstablishmentProofPreview(preview);
    };

    const updateMedicalRegistrationProof = (file: File | null, preview: string | null) => {
        setMedicalRegistrationFile(file);
        setMedicalRegistrationPreview(preview);
    };

    const updateIdentityProof = (file: File | null, preview: string | null) => {
        setIdentityProofFile(file);
        setIdentityProofPreview(preview);
    };

    const handleFormSubmit = () => {
        if (!identityProofFile || !medicalRegistrationFile || !establishmentProofFile) {
            alert('Please upload all required documents before submitting.');
            return;
        }
        console.log('Form submitted successfully');
        console.log(identityProofFile,medicalRegistrationFile,establishmentProofFile)
        setLoading(true);
        setTimeout(() => setLoading(false), 2000);  // Simulate form submission
    };

    return (
        <div className="lg:min-w-[500px] lg:min-h-[600px] flex flex-col justify-between">
            <div className='duration-300 transition-all'>
                {currentStep === 1 && (
                    <>
                        <h2 className="text-3xl font-semibold text-[#0c0b3eb5] mb-6">Identity Proof</h2>
                        <FileUploader handleFileChange={updateIdentityProof} imagePreview={identityProofPreview} />
                        <p className="max-w-[500px] text-sm text-gray-500 mb-3">Please upload your identity proof to ensure that the ownership of your profile remains with only you.</p>
                        <p className="max-w-[500px] text-sm text-gray-500">Acceptable documents:</p>
                        <ul className="max-w-[500px] text-sm text-gray-500 list-disc pl-5">
                            <li>Aadhar Card</li>
                            <li>Driving License</li>
                            <li>Voter Card</li>
                            <li>Any other Govt. ID</li>
                        </ul>
                    </>
                )}
                {currentStep === 2 && (
                    <>
                        <h2 className="text-3xl font-semibold text-[#0c0b3eb5] mb-6">Medical Registration Proof</h2>
                        <FileUploader handleFileChange={updateMedicalRegistrationProof} imagePreview={medicalRegistrationPreview} />
                        <p className="max-w-[500px] text-sm text-gray-500 mb-3">Please upload your medical registration proof. Only licensed and genuine doctors are listed on Medicure.</p>
                        <p className="max-w-[500px] text-sm text-gray-500">Acceptable documents:</p>
                        <ul className="max-w-[500px] text-sm text-gray-500 list-disc pl-5">
                            <li>Medical Registration Certification</li>
                            <li>26986 Delhi Medical Council</li>
                        </ul>
                    </>
                )}
                {currentStep === 3 && (
                    <>
                        <h2 className="text-3xl font-semibold text-[#0c0b3eb5] mb-6">Establishment Proof</h2>
                        <FileUploader handleFileChange={updateEstablishmentProof} imagePreview={establishmentProofPreview} />
                        <p className="max-w-[500px] text-sm text-gray-500 mb-3">Please upload your establishment proof. Only licensed and genuine doctors are listed on Medicure.</p>
                        <p className="max-w-[500px] text-sm text-gray-500">Acceptable documents:</p>
                        <ul className="max-w-[500px] text-sm text-gray-500 list-disc pl-5">
                            <li>Establishment proof</li>
                        </ul>
                    </>
                )}
            </div>

            <div className="flex justify-between border-t-2 py-4 px-3">
                <button
                    onClick={goToPreviousStep}
                    className="font-medium cursor-pointer transition duration-300 hover:scale-105 active:scale-95 text-[#0c0b3e58]"
                    disabled={currentStep === 1}
                >
                    Back
                </button>
                <button
                    onClick={currentStep === 3 ? handleFormSubmit : goToNextStep}
                    className={`${currentStep === 3 ? 'font-bold text-[#0c0b3eac]' : 'font-medium text-[#0c0b3e58]'} cursor-pointer transition duration-300 hover:scale-105 active:scale-95`}
                >
                    {currentStep === 3 ? 'Submit' : 'Next'}
                </button>
            </div>
        </div>
    );
};

export default ProfileVerificationForm;
