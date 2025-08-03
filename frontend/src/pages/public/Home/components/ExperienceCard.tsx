
const ExperienceCard = () => {
  return (
    <div className="w-[100%] px-6 lg:px-28 py-5 ">
            <div className="exp-card bg-[#51aff6dd] flex flex-wrap relative justify-center gap-5 p-5 rounded-lg after:w-[50%] after:h-full after:bg-[#b7d3e9] after:absolute after:top-0 after:blur-3xl overflow-hidden ">
                <div className="px-7 text-center z-10">
                    <p className="text-center p-2 text-[#373667] mr-4" style={{ lineHeight: '1' }}>
                        <span className="font-semibold text-3xl">20+</span> <br />
                        <span className="text-sm font-semibold">EXPERIENCE</span>
                    </p>
                </div>
                <div className="px-7 text-center z-10">
                    <p className="text-center p-2 text-[#373667] mr-4" style={{ lineHeight: '1' }}>
                        <span className="font-semibold text-3xl">95%</span> <br />
                        <span className="text-sm font-semibold">SATISFACTION</span>
                    </p>
                </div>
                <div className="px-7 text-center z-10">
                    <p className="text-center p-2 text-[#373667] mr-4" style={{ lineHeight: '1' }}>
                        <span className="font-semibold text-3xl">5000+</span> <br />
                        <span className="text-sm font-semibold">USERS</span>
                    </p>
                </div>
                <div className="px-7 text-center z-10">
                    <p className="text-center p-2 text-[#373667] mr-4" style={{ lineHeight: '1' }}>
                        <span className="font-semibold text-3xl">10+</span> <br />
                        <span className="text-sm font-semibold">SERVICES</span>
                    </p>
                </div>
                <div className="px-7 text-center z-10">
                    <p className="text-center p-2 text-[#373667] mr-4" style={{ lineHeight: '1' }}>
                        <span className="font-semibold text-3xl">3</span> <br />
                        <span className="text-sm font-semibold">STEPS</span>
                    </p>
                </div>
            </div>
        </div>
  )
}

export default ExperienceCard