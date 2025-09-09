

const AboutImg = () => {
    return (
        <div className="w-[100%] md:w-[50%] max-h-[50vh] relative flex justify-center items-center lg:-translate-y-10 overflow-hidden rounded-b-[100px]">
            <div className='w-full h-full bg-gradient-to-t from-[#3d85bcce] via-[#51aff6ce] absolute bottom-0 rounded-b-[100px] shadow-lg'></div>
            <img className="object-cover h-full z-10 translate-y-10" src="https://res.cloudinary.com/dwyxogyrk/image/upload/v1749730445/aboutDoctorsCroped_tbbky6.png" alt="Doctors" />
        </div>
    )
}

export default AboutImg