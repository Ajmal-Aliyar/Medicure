import { Outlet } from "react-router-dom"
import Menu from "../../components/patient/Menu"


function UserLayout() {
  return (
    <>
        <Menu />
        <Outlet />
    </>
  )
}

export default UserLayout
