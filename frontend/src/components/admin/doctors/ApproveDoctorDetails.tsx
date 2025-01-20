import { useState } from "react"
import Animation from "./Animation";


const colors = ["bg-green-500", "bg-red-500", "bg-blue-500"];
function ApproveDoctorDetails() {

    const [currentPage, setCurrentPage] = useState(0);
    
    return (
        <div className="card w-[50%] h-[700px] bg-white rounded-md shadow-md absolute -right-1/2 flex flex-1 flex-col">
            <div className=" border-b-2 border-neutral-100 flex justify-between p-2 relative">
                <p className='font-semibold p-2'>Shruti Kumar</p>
            </div>
            <div className="w-full h-full flex flex-col items-center justify-between">
                <div className={`w-full h-64 ${colors[currentPage]} flex items-center justify-center`}>
                    <h1 className="text-4xl font-bold">Page {currentPage + 1}</h1>
                </div>

                <div className="mt-4 flex justify-between w-full p-2 border-t-2">
                    <div className="flex items-center space-x-2 ">
                    {colors.map((_, index) => (
                        <button
                            key={index}
                            className={`px-3 py-1 rounded-md ${index === currentPage ? "bg-neutral-800 text-white" : "bg-gray-300 text-gray-700"
                                }`}
                            onClick={() => setCurrentPage(index)}
                        >
                            {index + 1}
                        </button>
                    ))}
                    </div>
                    <div className="flex gap-4">
                        <button className="px-2 py-1 bg-red-700 w-[100px] opacity-85 rounded-sm active:scale-95 text-neutral-100">reject</button>
                        <button className="px-2 py-1 bg-green-700 w-[100px] opacity-85 rounded-sm active:scale-95 text-neutral-100">approve</button>
                    </div>
                </div>
            </div>
            <Animation />
        </div>
    )
}

export default ApproveDoctorDetails
