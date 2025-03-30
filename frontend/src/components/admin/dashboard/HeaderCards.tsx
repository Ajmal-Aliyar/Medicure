import { ClockArrowUp, Coins, IndianRupee, PiggyBank } from 'lucide-react';
import { useEffect, useState } from 'react';
import { fetchRevenueDetailsApi } from '../../../sevices/finance/transaction';
import { fetchAppointmentDetailsDashboardApi } from '../../../sevices/appointments/fetchAppointments';


function HeaderCards() {
  const [state, setState] = useState<{
    profit: number;
    revenue: number;
    pending: number;
    refund: number;
  }>({
    profit: 0,
    revenue: 0,
    pending: 0,
    refund: 0
  })

  useEffect(() => {
    const fetchRevenue = async () => {
      const response = await fetchRevenueDetailsApi()
      const app = await fetchAppointmentDetailsDashboardApi()
      
      setState((prev) => ({
        ...prev,
        revenue: response.revenue,
        refund: response.refund,
        profit: app.profit,
        pending: app.pending
      }));
    }
    fetchRevenue()
  },[])
  return (
    <div className="flex flex-wrap justify-around md:justify-between gap-2 gap-y-5 p-3 lg:mt-0">
        <div className="lg:w-[270px] md:w-[48%] w-[270px]  rounded-md p-2 bg-[#16423C] shadow-md text-[#E9EFEC] relative">
          <div className="flex items-center">
            <div className="w-[50px] aspect-square rounded-md  bg-[#E9EFEC] flex items-center justify-center">
               <PiggyBank color="#16423C" strokeWidth={2} size={40}  />
            </div>
            <p className="ml-2 text-md font-medium">Total Profit</p>
          </div>
          <p className="text-center font-bold text-xl">{state.profit}</p>
          <div className="right-0 left-0 h-[1px] bg-[#6a9c8967] absolute"></div>
          <p className="text-xs mt-2 pl-1">Total profit generated this month</p>
        </div>
        <div className="lg:w-[270px] md:w-[48%] w-[270px] rounded-md p-2 bg-[#fafafa] shadow-lg relative">
          <div className="flex items-center">
            <div className="w-[50px] aspect-square rounded-md  bg-[#C4DAD2] flex justify-center items-center">
              <IndianRupee color="#16423C" strokeWidth={3} size={30}/>
            </div>
            <p className="ml-2 text-md font-medium">Total Revenue</p>
          </div>
          <p className="text-center font-bold text-xl">{state.revenue}</p>
          <div className="right-0 left-0 h-[1px] bg-neutral-300 absolute"></div>
          <p className="text-xs mt-2 pl-1">Overall revenue generated so far</p>
        </div>
        <div className="lg:w-[270px] md:w-[48%] w-[270px] rounded-md p-2 bg-[#fafafa] shadow-lg relative">
          <div className="flex items-center">
            <div className="w-[50px] aspect-square rounded-md  bg-[#C4DAD2] flex justify-center items-center">
              <ClockArrowUp color="#16423C" strokeWidth={3} size={30}  />
            </div>
            <p className="ml-2 text-md font-medium">Total Pending</p>
          </div>
          <p className="text-center font-bold text-xl">{state.pending}</p>
          <div className="right-0 left-0 h-[1px] bg-neutral-300 absolute"></div>
          <p className="text-xs mt-2 pl-1">Pending appointments to complete</p>
        </div>
        <div className="lg:w-[270px] md:w-[48%] w-[270px]  rounded-md p-2 bg-[#fafafa] shadow-lg relative">
          <div className="flex items-center">
            <div className="w-[50px] aspect-square rounded-md bg-[#C4DAD2]  flex justify-center items-center">
              <Coins  color="#16423C" strokeWidth={3} size={30}/>
            </div>
            <p className="ml-2 text-md font-medium">Total Refunds</p>
          </div>
          <p className="text-center font-bold text-xl">{state.refund}</p>
          <div className="right-0 left-0 h-[1px] bg-neutral-300 absolute"></div>
          <p className="text-xs mt-2 pl-1">Total refunds incurred to date</p>
        </div>
      </div>
  )
}

export default HeaderCards
