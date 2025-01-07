import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import doctor2 from '../../assets/doctors/slidedoctor3.png'

const data = [
    { name: 'Dr. John Doe', review: 'Expert in Neurology' },
    { name: 'Dr. Jane Smith', review: 'Specialist in Cardiology' },
    { name: 'Dr. William Mehta', review: 'Expert in Orthopedics' },
    { name: 'Dr. Lisa Ray', review: 'Pediatrician with 15+ years' },
    { name: 'Dr. Ajay Kumar', review: 'Renowned Dermatologist' }
];

const CustomSlider = () => {
    const [settings, setSettings] = useState({
        dots: false,
        infinite: true,
        centerMode: true,
        centerPadding: '0',
        slidesToShow: 3, 
        speed: 500,
        focusOnSelect: true,
      });
    
      const updateSettings = () => {
        const width = window.innerWidth;
        
        if (width <= 768) {
          setSettings({
            dots: false,
            infinite: true,
            centerMode: true, 
            centerPadding: '0',
            slidesToShow: 1,
            speed: 500,
            focusOnSelect: true,
          });
        } else if (width <= 1024) {
          setSettings({
            dots: false,
            infinite: true,
            centerMode: true,
            centerPadding: '0',
            slidesToShow: 2, 
            speed: 500,
            focusOnSelect: true,
          });
        } else {
          setSettings({
            dots: false,
            infinite: true,
            centerMode: true,
            centerPadding: '0',
            slidesToShow: 3, 
            speed: 500,
            focusOnSelect: true,
          });
        }
      };
    
      useEffect(() => {
        updateSettings();
        window.addEventListener('resize', updateSettings);
        return () => {
          window.removeEventListener('resize', updateSettings);
        };
      }, []);
    
    return (
        
        <div className="slider-container">
            <Slider {...settings} className='h-[25rem]'>
                {data.map((item, index) => (
                    <div key={index} className="w-[19rem] h-[19rem] relative flex justify-center">
                    <div className='w-full aspect-[1/1] bg-[#74bff8c7] rounded-full'></div>

                    <div className="absolute scale-[1.4] top-10 ">
                        <img src={doctor2} className="w-full h-auto" alt="Doctor" />
                        <div className='absolute -bottom-14 w-[75%] left-1/2 -translate-x-1/2   bg-white p-2 rounded-md shadow-lg'>
                            <p className='text-center font-medium text-sm text-[#0c0b3eb5] mb-4'>{item.name}</p>
                            <p className='text-[#767676] text-[12px]'>Specialization: Cardiologist</p>
                            <p className='text-[#767676] text-[12px]'>Experience: 12+ years</p>
                            <p className='text-[#767676] text-[12px]'>Ratings: ⭐ 4.9/5 (1,200 reviews)</p>
                            <p className='text-[#767676] text-[12px]'>Languages: English, Hindi, Tamil</p>
                        </div>
                    </div>

                </div>
                ))}
            </Slider>
        </div>

    );
};

export default CustomSlider;
