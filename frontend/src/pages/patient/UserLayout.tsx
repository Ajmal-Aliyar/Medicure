import Menu from "../../components/patient/common/Menu"
import { Outlet } from "react-router-dom"


function UserLayout() {
  return (
    <>
        <Menu />
        <Outlet />
    </>
  )
}

export default UserLayout
