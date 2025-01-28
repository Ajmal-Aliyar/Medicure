import pediatrics from '../../../assets/ology/pngtree-shot-of-cute-baby-girl-looking-at-camera-png-image_14357176.png';
import nephrology from '../../../assets/ology/lungs-nephrologist.png';
import cardiology from '../../../assets/ology/heart-cardiology.png';
import dentistry from '../../../assets/ology/tooth-denstist.png';
import gynecology from '../../../assets/ology/gynecology.png';
import neurology from '../../../assets/ology/neurolory.png';
import orthopedics from '../../../assets/ology/bone.png';
import React from 'react';

const specializationsData = [
    { name: 'cardiology', image: cardiology },
    { name: 'neurology', image: neurology },
    { name: 'pediatrics', image: pediatrics },
    { name: 'dentistry', image: dentistry },
    { name: 'orthopedics', image: orthopedics },
    { name: 'nephrology', image: nephrology },
    { name: 'gynecology', image: gynecology },
];

const Specializations: React.FC = () => {
    return (
        <div className='w-full text-[#0c0b3eb5]'>
            <p className='text-xl font-bold'>Find Your Doctor</p>
            <div className='overflow-x-auto w-full p-8'>
                <div className='flex gap-8 min-w-[600px]'>
                    {specializationsData.map((specialization, index) => (
                        <div
                            key={index}
                            className='cursor-pointer active:scale-90 duration-300 w-[100px]  md:max-w-[120px] aspect-square rounded-full bg-[#51aff6ce] p-2 md:p-3 relative flex justify-center items-center'
                        >
                            <div className='absolute w-[40px] md:w-[90px] h-20 bg-[#c3d6e4] blur-lg rounded-full'></div>
                            <img
                                src={specialization.image}
                                alt={specialization.name}
                                className='z-10 rounded-full hover:scale-110 duration-300'
                            />
                            <p className='absolute -bottom-8 text-sm md:text-lg font-medium'>{specialization.name}</p>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Specializations;
