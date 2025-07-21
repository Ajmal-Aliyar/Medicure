import AboutContent from "./AboutContent"
import AboutImg from "./AboutImg"


const AboutSection = () => {
  return (
    <div className="w-full px-6 lg:px-28 py-5 lg:py-20 lg:pt-28  flex flex-col md:flex-row about overflow-hidden">
        <AboutContent />
        <AboutImg />
    </div>
  )
}

export default AboutSection