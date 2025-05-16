import { faCalendarAlt} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UserCheck, Users, UserX } from 'lucide-react'
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setError } from '../../../store/slices/commonSlices/notificationSlice';
import { getPatientDashboardApi } from '../../../sevices/dashboardServices';


function HeaderCards() {
  const [ dashboard, setDashboard] = useState({
    totalUsers: 0,
    activePatients: 0,
    blockedPatients: 0,
    appointments: 0,
  })
  const dispatch = useDispatch()

  useEffect(() => {
          const getPatientsDashboard = async () => {
              try {
                  const response = await getPatientDashboardApi();
                  setDashboard(response)
              } catch (error: unknown) {
                  dispatch(setError('Error occured while fetching patients.'));
              }
          };
  
          getPatientsDashboard();
      }, [dispatch]);
  return (
    <div className="flex flex-wrap justify-around md:justify-between gap-2 gap-y-5 p-3 lg:mt-0">
        <div className="lg:w-[270px] md:w-[48%] w-[270px]  rounded-md p-2 bg-[#16423C] shadow-md text-[#E9EFEC] relative">
          <div className="flex items-center">
            <div className="w-[50px] aspect-square rounded-md  bg-[#E9EFEC] flex items-center justify-center">
            <Users size={28} color="#16423c" strokeWidth={3} />
            </div>
            <p className="ml-2 text-md font-medium">Total Users</p>
          </div>
          <p className="text-center font-bold text-xl">{dashboard.totalUsers}</p>
          <div className="right-0 left-0 h-[1px] bg-[#6a9c8967] absolute"></div>
          <p className="text-xs mt-2 pl-1">Total number of patients.</p>
        </div>
        <div className="lg:w-[270px] md:w-[48%] w-[270px] rounded-md p-2 bg-[#fafafa] shadow-lg relative">
          <div className="flex items-center">
            <div className="w-[50px] aspect-square rounded-md  bg-[#C4DAD2] flex justify-center items-center">
            <UserCheck size={28} color="#16423c" strokeWidth={3} />
            </div>
            <p className="ml-2 text-md font-medium">Active Patients</p>
          </div>
          <p className="text-center font-bold text-xl">{dashboard.activePatients}</p>
          <div className="right-0 left-0 h-[1px] bg-neutral-300 absolute"></div>
          <p className="text-xs mt-2 pl-1">Total number active patients.</p>
        </div>
        <div className="lg:w-[270px] md:w-[48%] w-[270px]  rounded-md p-2 bg-[#fafafa] shadow-lg relative">
          <div className="flex items-center">
            <div className="w-[50px] aspect-square rounded-md bg-[#C4DAD2]  flex justify-center items-center">
            <UserX size={28} color="#16423c" strokeWidth={3} />
            </div>
            <p className="ml-2 text-md font-medium">Blocked Patients</p>
          </div>
          <p className="text-center font-bold text-xl">{dashboard.blockedPatients}</p>
          <div className="right-0 left-0 h-[1px] bg-neutral-300 absolute"></div>
          <p className="text-xs mt-2 pl-1">Total number of blocked patinets.</p>
        </div>
        <div className="lg:w-[270px] md:w-[48%] w-[270px] rounded-md p-2 bg-[#fafafa] shadow-lg relative">
          <div className="flex items-center">
            <div className="w-[50px] aspect-square rounded-md  bg-[#C4DAD2] flex justify-center items-center">
              <FontAwesomeIcon icon={faCalendarAlt} className={`text-[30px] duration-300 text-[#16423C]`} />
            </div>
            <p className="ml-2 text-md font-medium">Total Appointments</p>
          </div>
          <p className="text-center font-bold text-xl">{dashboard.appointments}</p>
          <div className="right-0 left-0 h-[1px] bg-neutral-300 absolute"></div>
          <p className="text-xs mt-2 pl-1">Total number of appointments.</p>
        </div>
      </div>
  )
}

export default HeaderCards
