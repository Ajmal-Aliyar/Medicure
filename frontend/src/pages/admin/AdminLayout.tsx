import { Outlet } from 'react-router-dom';
import SlideMenu from '../../components/admin/SlideMenu';

const AdminLayout = () => {
    return (
        <div className='w-full h-full flex'>
            <SlideMenu />
            <div className='bg-[#e5e7e7] w-full '>

            <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;
