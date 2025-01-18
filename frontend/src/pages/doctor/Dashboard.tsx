import RightBar from '../../components/doctor/dashboard/RightBar'


function Dashboard() {
    
    return (
        <>
            <div className='content h-screen w-full p-4 flex justify-center overflow-y-auto rounded-md'>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 w-full max-w-5xl pt-20 ">

                    <div className='h-[400px] col-span-12 bg-white rounded-lg'>

                    </div>
                    <div className='h-[600px] col-span-6 bg-white rounded-lg'></div>
                    <div className='h-[600px] col-span-6 bg-white rounded-lg'></div>
                </div>
            </div>
            <RightBar />
        </>
    )
}

export default Dashboard
