import Menu from "../../components/patient/Menu"
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
