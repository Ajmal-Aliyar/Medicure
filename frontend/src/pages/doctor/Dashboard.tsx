import RightBar from '../../components/doctor/dashboard/RightBar'


function Dashboard() {
    
    return (
        <>
            <div className='content h-screen w-full p-4 flex justify-center overflow-y-auto rounded-md mt-20'>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 w-full max-w-5xl  ">

                    <div className='h-[400px] col-span-12 bg-white rounded-md shadow-md'>
                        <div className='p-2 border-b-2'>
                            <p className='font-semibold text-lg text-[#0c0b3eb5]'>Dashboard</p>
                        </div>
                    </div>
                    <div className='h-[600px] col-span-6 bg-white rounded-md'></div>
                    <div className='h-[600px] col-span-6 bg-white rounded-md'></div>
                </div>
            </div>
            <RightBar />
        </>
    )
}

export default Dashboard
