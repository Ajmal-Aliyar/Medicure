

function BooknowCard() {
    return (
        <div className="h-[20vh] md:px-6 lg:px-28 md:p-3 py-3">
        <div className="book-bar h-full bg-gray-50 md:rounded-lg shadow-md md:shadow-xl flex justify-center items-center md:px-10">
            <div className=" w-full flex">
                <div className="w-[25%] flex flex-col md:flex-row items-center gap-2">
                    <div className="flex justify-center items-center bg-gradient-to-b to-[#97cdf6] from-[#51aff6] w-10 h-10 md:w-16 md:h-16 rounded-full">
                        <i className="fa fa-calendar text-white font-semibold md:text-3xl"></i>
                    </div>
                    <p className="md:p-2 text-[#0c0b3eb5] text-center" style={{ lineHeight: '1' }}>
                        <span className="md:font-semibold ">Date</span> <br />
                        <span className="text-sm ">30-07-2005</span>
                    </p>
                </div>
                <div className="w-[25%] flex flex-col md:flex-row items-center gap-2">
                    <div className="flex justify-center items-center bg-gradient-to-b to-[#97cdf6] from-[#51aff6] w-10 h-10 md:w-16 md:h-16 rounded-full">
                        <i className="fa fa-user-plus text-white font-semibold  md:text-3xl"></i>
                    </div>
                    <p className="md:p-2 text-[#0c0b3eb5] text-center " style={{ lineHeight: '1' }}>
                        <span className="md:font-semibold">Slots</span> <br />
                        <span className="text-sm ">30K</span>
                    </p>
                </div>
                <div className="w-[25%] flex flex-col md:flex-row items-center gap-2">
                    <div className="flex justify-center items-center bg-gradient-to-b to-[#97cdf6] from-[#51aff6] w-10 h-10 md:w-16 md:h-16 rounded-full">
                        <i className="fa fa-stethoscope text-white font-semibold text-xl md:text-3xl"></i>
                    </div>
                    <p className="md:p-2 text-[#0c0b3eb5] text-center" style={{ lineHeight: '1' }}>
                        <span className="md:font-semibold">Doctors</span> <br />
                        <span className="text-sm ">950 </span>
                    </p>
                </div>
                <div className="w-[25%] flex items-center text-white">
                    <div className="bg-gradient-to-b to-[#97cdf6] from-[#51aff6] md:w-[15rem] md:h-[3rem] p-2 rounded-full flex items-center justify-center text-sm md:font-bold">
                        Book Now
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default BooknowCard
