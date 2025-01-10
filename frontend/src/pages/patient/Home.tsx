
import BooknowCard from "../../components/home/BooknowCard"
import AboutSection from "../../components/home/AboutSection"
import WhyChooseUs from "../../components/home/WhyChooseUs"
import ExperienceCard from "../../components/home/ExperienceCard"
import DoctorSlider from "../../components/home/DoctorSlider"
import ReviewSection from "../../components/home/ReviewSection"
import LandingBanner from "../../components/home/LandingBanner"

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
        </>
    )
}

export default Home


