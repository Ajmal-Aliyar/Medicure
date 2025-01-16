import ExperienceCard from "../../components/patient/home/ExperienceCard"
import ReviewSection from "../../components/patient/home/ReviewSection"
import LandingBanner from "../../components/patient/home/LandingBanner"
import HomeAnimation from "../../components/patient/home/HomeAnimation"
import DoctorSlider from "../../components/patient/home/DoctorSlider"
import AboutSection from "../../components/patient/home/AboutSection"
import WhyChooseUs from "../../components/patient/home/WhyChooseUs"
import BooknowCard from "../../components/patient/home/BooknowCard"


function Home() {
    return (
        <>
            <LandingBanner />
            <BooknowCard />
            <AboutSection />
            <WhyChooseUs />
            <ExperienceCard />
            <DoctorSlider />
            <ReviewSection />
            <HomeAnimation />
        </>
    )
}

export default Home


