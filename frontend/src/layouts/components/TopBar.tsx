
const TopBar = ({name, image}: {name: string, image: string}) => {
    return (
        <div className='hidden lg:flex py-2 min-h-[4rem] max-h-[4rem] justify-between items-center bg-surface backdrop-blur-md shadow-md rounded-md sticky top-2 left-0 right-0 p-2 px-4 z-10 overflow-hidden'>
            <div className='w-10 h-[5rem] bg-primary-light absolute rotate-12 -translate-x-6'></div>
            <p className='text-secondary font-bold text-lg z-10'>. {name}</p>
            <div className='flex justify-center items-center gap-3'>
                <div className='bg-gray-300 h-[2.8rem] aspect-square rounded-full overflow-hidden'>
                    <img src={image} alt="" />
                </div>
            </div> 
        </div>  
    )
}

export default TopBar