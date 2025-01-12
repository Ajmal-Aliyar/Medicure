import { Outlet } from 'react-router-dom';
import SlideMenu from '../../components/admin/SlideMenu';

const AdminLayout = () => {
    return (
        <div className='w-full h-full flex'>
            <SlideMenu />
            <div className='bg-[#e5e7e7] w-full flex p-4 mt-[68px] lg:mt-0'>
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;
