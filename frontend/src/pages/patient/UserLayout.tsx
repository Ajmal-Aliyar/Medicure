import Menu from "../../components/patient/common/Menu"
import { Outlet } from "react-router-dom"


function UserLayout() {
  return (
    <div className="max-w-[2000px] relative mx-auto">
        <Menu />
        <Outlet />
    </div>
  )
}

export default UserLayout
