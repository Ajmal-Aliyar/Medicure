import ContentTab from "../../components/admin/ContentTab"
import LeftMenu from "../../components/admin/LeftMenu"
import TopBar from "../../components/admin/TopBar"


function Dashboard() {
  return (
    <div className="w-full h-screen bg-[#F5F5F5] flex flex-col">
    <TopBar />
    <div className="flex h-full">
      <LeftMenu />
      <ContentTab />
    </div>
  </div>
  
  )
}

export default Dashboard
