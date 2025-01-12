import { Outlet } from "react-router-dom"
import ContentTab from "../../components/admin/ContentTab"
import LeftMenu from "../../components/admin/LeftMenu"
import TopBar from "../../components/admin/TopBar"


function Dashboard() {
  return (
    <div className="w-full h-screen bg-[#F5F5F5] flex flex-col">
    <TopBar />
    <div className="flex h-full">
      <LeftMenu />
      {/* <ContentTab /> */}
      <div className="w-full h-full p-3">
        <div className="bg-[#dddddd] rounded-xl w-full h-full">
          <Outlet/>
        </div>
  </div>

    </div>
  </div>
  
  )
}

export default Dashboard
