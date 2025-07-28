import { Outlet } from "react-router-dom"
import { Navbar } from "./Navbar"

export const PublicLayout = () => {
    return (
        <div className="w-screen h-full flex flex-col justify-center items-center">
            <Navbar />
            <Outlet />
        </div>
    )
}

