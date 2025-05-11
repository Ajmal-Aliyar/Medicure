import SlideMenu from '../../components/admin/common/SlideMenu';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
    return (
        <div className="w-full h-full flex">
            <SlideMenu />
            <div className="w-full flex-col relative">

                <div className="w-full flex p-2 h-screen overflow-x-hidden overflow-y-auto bg-[#E9EFEC]">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
