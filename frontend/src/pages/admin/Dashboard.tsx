import ActivityChart from "../../components/admin/dashboard/ActivityChart";
import Calendar from "../../components/admin/dashboard/Calender";
import HeaderCards from "../../components/admin/dashboard/HeaderCards";

function Dashboard() {
  return (
    <div className="w-full h-full flex flex-col flex-1 py-6 ">
      <HeaderCards />
      <div className="w-full p-3 flex flex-col lg:flex-row gap-4  md:flex-wrap">
        <ActivityChart />
        <div className="w-full lg:min-w-[300px] max-w-[500px] mt-4 lg:mt-0 lg:flex-1 ">
          <div className="w-full h-full">
              <Calendar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
