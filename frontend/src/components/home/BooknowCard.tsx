

function BooknowCard() {
    return (
        <div className="book-bar h-full bg-gray-50 rounded-lg shadow-xl flex justify-center items-center px-10">
            <div className=" w-full flex">
                <div className="w-[25%] flex items-center gap-2">
                    <div className="flex justify-center items-center bg-gradient-to-b to-[#97cdf6] from-[#51aff6] w-16 h-16 rounded-full">
                        <i className="fa fa-calendar text-white font-semibold text-3xl"></i>
                    </div>
                    <p className="p-2 text-[#0c0b3eb5] " style={{ lineHeight: '1' }}>
                        <span className="font-semibold">Date</span> <br />
                        <span className="text-sm ">30-07-2005</span>
                    </p>
                </div>
                <div className="w-[25%] flex items-center gap-2">
                    <div className="flex justify-center items-center bg-gradient-to-b to-[#97cdf6] from-[#51aff6] w-16 h-16 rounded-full">
                        <i className="fa fa-user-plus text-white font-semibold text-3xl"></i>
                    </div>
                    <p className="p-2 text-[#0c0b3eb5]  " style={{ lineHeight: '1' }}>
                        <span className="font-semibold">Slots</span> <br />
                        <span className="text-sm ">30K</span>
                    </p>
                </div>
                <div className="w-[25%] flex items-center gap-2">
                    <div className="flex justify-center items-center bg-gradient-to-b to-[#97cdf6] from-[#51aff6] w-16 h-16 rounded-full">
                        <i className="fa fa-stethoscope text-white font-semibold text-3xl"></i>
                    </div>
                    <p className="p-2 text-[#0c0b3eb5] " style={{ lineHeight: '1' }}>
                        <span className="font-semibold">Doctors</span> <br />
                        <span className="text-sm ">950 </span>
                    </p>
                </div>
                <div className="w-[25%] flex items-center text-white">
                    <div className="bg-gradient-to-b to-[#97cdf6] from-[#51aff6] w-[15rem] h-[3rem] rounded-full flex items-center justify-center font-bold">
                        Book Now
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BooknowCard
