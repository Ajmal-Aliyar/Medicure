import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useEffect, useState } from 'react';

const doctorData = [
  {
    name: 'Dr. John Doe',
    img: 'https://res.cloudinary.com/dwyxogyrk/image/upload/v1749753547/slidedoctor1_rfbipf.png',
    specialization: 'Cardiologist',
    experience: '12+ years',
    ratings: '⭐ 4.9/5 (1,200 reviews)',
    languages: 'English, Hindi, Tamil',
  },
  {
    name: 'Dr. William Mehta',
    img: 'https://res.cloudinary.com/dwyxogyrk/image/upload/v1749753541/slidedoctor2_ypsc9c.png',
    specialization: 'Dermatologist',
    experience: '10+ years',
    ratings: '⭐ 4.7/5 (900 reviews)',
    languages: 'English, Hindi',
  },
  {
    name: 'Dr. Jane Smith',
    img: 'https://res.cloudinary.com/dwyxogyrk/image/upload/v1749753547/slidedoctor3_xoxzir.png',
    specialization: 'Pediatrician',
    experience: '8+ years',
    ratings: '⭐ 4.8/5 (1,100 reviews)',
    languages: 'English, Spanish',
  },
  {
    name: 'Dr. Aisha Khan',
    img: 'https://res.cloudinary.com/dwyxogyrk/image/upload/v1749753541/slidedoctor2_ypsc9c.png',
    specialization: 'Neurologist',
    experience: '15+ years',
    ratings: '⭐ 5.0/5 (2,000 reviews)',
    languages: 'English, Urdu',
  },
];

const baseSettings = {
  dots: false,
  infinite: true,
  centerMode: true,
  centerPadding: '0',
  speed: 500,
  focusOnSelect: true,
  autoplay: true,
  autoplaySpeed: 3000,
};

function DoctorSlider() {
  const [settings, setSettings] = useState({
    ...baseSettings,
    slidesToShow: 3,
  });

  const updateSettings = () => {
    const width = window.innerWidth;
    let updated;

    if (width <= 768) {
      updated = { ...baseSettings, slidesToShow: 1 };
    } else if (width <= 1024) {
      updated = { ...baseSettings, slidesToShow: 2 };
    } else {
      updated = { ...baseSettings, slidesToShow: 3 };
    }

    setSettings(prev => {
      return JSON.stringify(prev) !== JSON.stringify(updated) ? updated : prev;
    });
  };

  useEffect(() => {
    updateSettings();
    window.addEventListener('resize', updateSettings);
    return () => window.removeEventListener('resize', updateSettings);
  }, []);

  return (
    <div className="py-16 md:pt-36 mb-[4rem] md:mb-[8rem]">
      <p className="text-center text-[#51aff6ce] font-semibold text-xl">meet our</p>
      <p className="font-semibold text-center text-4xl text-[#0c0b3eb5] mb-10">
        Top Expert Doctors
      </p>

      <div className="slider-container">
        <Slider {...settings} className="h-[25rem]">
          {doctorData.map((doctor, index) => (
            <div key={`${doctor.name}-${index}`} className="w-[19rem] h-[19rem] relative flex justify-center">
              <div className="w-full aspect-[1/1] bg-[#74bff8c7] rounded-full"></div>

              <div className="absolute top-10 scale-[1.2] md:scale-[1.4]">
                <img src={doctor.img} className="w-full h-auto" alt={`Photo of ${doctor.name}`} />
                <div className="absolute -bottom-14 w-[75%] left-1/2 -translate-x-1/2 bg-white p-2 rounded-md shadow-lg">
                  <p className="text-center font-medium text-sm text-[#0c0b3eb5] mb-4">{doctor.name}</p>
                  <p className="text-[#767676] text-[12px]">Specialization: {doctor.specialization}</p>
                  <p className="text-[#767676] text-[12px]">Experience: {doctor.experience}</p>
                  <p className="text-[#767676] text-[12px]">Ratings: {doctor.ratings}</p>
                  <p className="text-[#767676] text-[12px]">Languages: {doctor.languages}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default DoctorSlider;
