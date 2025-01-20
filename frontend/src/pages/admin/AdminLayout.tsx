import { useState } from 'react';
import SlideMenu from '../../components/admin/SlideMenu';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
    const [miniBar, setMiniBar] = useState(false);

    return (
        <div className="w-full h-full flex">
            <SlideMenu />
            <div className="w-full flex-col relative">
                <div
                    className={`${
                        miniBar ? 'w-[97%] lg:w-[98%]' : 'w-[150px]'
                    } transition-all duration-1000 h-[8vh] z-40 flex justify-between items-center bg-white shadow-lg rounded-md m-2 mx-4 absolute top-0 right-0 p-2 px-4 overflow-hidden`}>
                    <div className='w-2 h-full lg:bg-neutral-800 absolute right-0'></div>
                    <div className="bg-neutral-300 h-full w-80 rounded-full"></div>

                    <div className="flex justify-center items-center gap-3">
                        <div className="px-4 py-1 text-neutral-400 border-2 border-neutral-400 rounded-full font-semibold transition-all active:scale-95" >
                            Mail
                        </div>
                        <div onClick={() => setMiniBar((prev) => !prev)}
                            className="bg-neutral-300 w-10 aspect-square rounded-full cursor-pointer"
                        ></div>
                    </div>
                </div>

                <div className="w-full flex p-2 h-screen overflow-x-hidden overflow-y-auto bg-neutral-200">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
