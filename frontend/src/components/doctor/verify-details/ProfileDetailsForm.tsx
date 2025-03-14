import { getVerificationDetailsApi, patchVerificationDetailsApi } from '../../../sevices/doctor/verification';
import { IProfileDetailsFormProps } from '../../../types/doctor/verifyDetailsType';
import React, { useEffect, useState } from 'react';


const ProfileDetailsForm: React.FC<IProfileDetailsFormProps> = ({ handleModal, setLoading }) => {
    const [currentSlide, setCurrentSlide] = useState(1);
    const [formData, setFormData] = useState({
        registrationNumber: '',
        registrationCouncil: '',
        registrationYear: '',
        degree: '',
        university: '',
        yearOfCompletion: '',
        yearsOfExperience: ''
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleNextSlide = () => {
        if (validateSlide1()) {
            setCurrentSlide(2);
        }
    };

    const handlePrevSlide = () => {
        setCurrentSlide(1);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const validateSlide1 = () => {
        let valid = true;
        let newErrors: { [key: string]: string } = {};

        if (!formData.registrationNumber) {
            newErrors.registrationNumber = 'Registration Number is required';
            valid = false;
        } else if (!/^\d{12}$/.test(formData.registrationNumber.replace(/\s/g, ''))) {
            newErrors.registrationNumber = 'Registration Number must be exactly 12 digits';
            valid = false;
        }
        
        if (!formData.registrationCouncil) {
            newErrors.registrationCouncil = 'Registration Council is required';
            valid = false;
        } else if (!/^[A-Za-z\s]+$/.test(formData.registrationCouncil)) {
            newErrors.registrationCouncil = 'Registration Council must only contain letters and spaces';
            valid = false;
        }
        
        if (!formData.registrationYear || !/^[0-9]{4}$/.test(formData.registrationYear)) {
            newErrors.registrationYear = 'Enter a valid year';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const validateSlide2 = () => {
        let valid = true;
        const newErrors: { [key: string]: string } = {};
        if (!formData.degree) {
            newErrors.degree = 'degree is required';
            valid = false;
        } else if (!/^[A-Za-z\s]+$/.test(formData.degree)) {
            newErrors.degree = 'Degree must only contain letters and spaces';
            valid = false;
        }

        if (!formData.university) {
            newErrors.university = 'university is required';
            valid = false;
        } else if (!/^[A-Za-z\s]+$/.test(formData.university)) {
            newErrors.university = 'Degree must only contain letters and spaces';
            valid = false;
        }

        if (!formData.yearOfCompletion || !/^[0-9]{4}$/.test(formData.yearOfCompletion)) {
            newErrors.yearOfCompletion = 'Enter a valid year';
            valid = false;
        }
        if (!formData.yearsOfExperience || isNaN(Number(formData.yearsOfExperience))) {
            newErrors.yearsOfExperience = 'Enter a valid number of years';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    useEffect(() => {
        const fetchVerificationDetails = async () => {
            try {
                const response = await getVerificationDetailsApi()
                const data = response.data;
                console.log(data);
                if (data) {
                    setFormData(prevState => ({
                        ...prevState, 
                        ...data      
                    }));
                }
            } catch (error) {
                console.error('Error fetching verification details:', error);
            }
        };
        setLoading(true)
        fetchVerificationDetails();
        setLoading(false)
    }, []); 
    const handleSubmit = async () => {
        if (validateSlide2()) {
            setLoading(true)
            console.log('Submitting:', formData);
            await patchVerificationDetailsApi(formData)
            handleModal('')
            setLoading(false)
        }
    };

    return (
        <div className="lg:min-w-[500px] lg:min-h-[600px] flex flex-col justify-between">
            <div className='slideContent duration-300 transition-all'>
            {currentSlide === 1 && (
                <>
                    <h2 className="text-3xl font-semibold text-[#0c0b3eb5] ">Registration Details</h2>
                    <p className="text-xs text-[#0c0b3eb5] mb-6">Enter your doctor registration details here</p>
                    <div className="mb-6">
                        <label className="text-gray-500 block" htmlFor="registrationNumber">Registration Number</label>
                        <input
                            id="registrationNumber"
                            type="text"
                            placeholder='XXXX XXXX XXXX'
                            className="w-72 p-2 border border-gray-300 outline-none"
                            value={formData.registrationNumber}
                            onChange={handleChange}
                        />
                        {errors.registrationNumber && <p className="text-red-500 text-xs">{errors.registrationNumber}</p>}
                    </div>
                    <div className="mb-6">
                        <label className="text-gray-500 block" htmlFor="registrationCouncil">Registration Council</label>
                        <input
                            id="registrationCouncil"
                            type="text"
                            placeholder='Indian council'
                            className="w-72 p-2 border border-gray-300 outline-none"
                            value={formData.registrationCouncil}
                            onChange={handleChange}
                        />
                        {errors.registrationCouncil && <p className="text-red-500 text-xs">{errors.registrationCouncil}</p>}
                    </div>
                    <div className="mb-6">
                        <label className="text-gray-500 block" htmlFor="registrationYear">Registration Year</label>
                        <input
                            id="registrationYear"
                            type="text"
                            placeholder='YYYY'
                            className="w-72 p-2 border border-gray-300 outline-none"
                            value={formData.registrationYear}
                            onChange={handleChange}
                        />
                        {errors.registrationYear && <p className="text-red-500 text-xs">{errors.registrationYear}</p>}
                    </div>
                </>
            )}

            {currentSlide === 2 && (
                <>
                    <h2 className="text-3xl font-semibold text-[#0c0b3eb5] ">Education Qualification</h2>
                    <p className="text-xs text-[#0c0b3eb5] mb-6">Enter your basic education qualifications here</p>
                    <div className="mb-6">
                        <label className="text-gray-500 block" htmlFor="degree">Degree</label>
                        <input
                            id="degree"
                            type="text"
                            className="w-72 p-2 border border-gray-300"
                            value={formData.degree}
                            onChange={handleChange}
                        />
                        {errors.degree && <p className="text-red-500 text-xs">{errors.degree}</p>}
                    </div>
                    <div className="mb-6">
                        <label className="text-gray-500 block" htmlFor="university">university/Institute</label>
                        <input
                            id="university"
                            type="text"
                            className="w-72 p-2 border border-gray-300"
                            value={formData.university}
                            onChange={handleChange}
                        />
                        {errors.university && <p className="text-red-500 text-xs">{errors.university}</p>}
                    </div>
                    <div className="mb-6">
                        <label className="text-gray-500 block" htmlFor="university">Year of completion</label>
                        <input
                            id="yearOfCompletion"
                            type="text"
                            className="w-72 p-2 border border-gray-300"
                            value={formData.yearOfCompletion}
                            onChange={handleChange}
                        />
                        {errors.yearOfCompletion && <p className="text-red-500 text-xs">{errors.yearOfCompletion}</p>}
                    </div>
                    <div className="mb-6">
                        <label className="text-gray-500 block" htmlFor="university">Years of experience</label>
                        <input
                            id="yearsOfExperience"
                            type="text"
                            className="w-72 p-2 border border-gray-300"
                            value={formData.yearsOfExperience}
                            onChange={handleChange}
                        />
                        {errors.yearsOfExperience && <p className="text-red-500 text-xs">{errors.yearsOfExperience}</p>}
                    </div>
                </>
            )}
            </div>

            <div className="flex justify-between border-t-2 py-4 px-3 text-[#0c0b3e58]">
                <button onClick={handlePrevSlide} className="font-medium cursor-pointer transition duration-300 hover:scale-105 active:scale-95">back</button>
                <button onClick={currentSlide === 2 ? handleSubmit : handleNextSlide} className="font-medium cursor-pointer transition duration-300 hover:scale-105 active:scale-95">
                   {currentSlide === 2 ? 'submit' : 'next'}
                </button>
            </div>
        </div>
    );
};

export default ProfileDetailsForm;
