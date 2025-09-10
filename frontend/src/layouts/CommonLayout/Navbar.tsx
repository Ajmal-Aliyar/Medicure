import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import type { RootState } from "@/app/store";
import { env } from "@/lib/env";
import { useModal } from "@/hooks/useModal";
import { logout } from "@/slices/authSlice";
import { authService } from "@/services/api/public/auth";

export const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false);

  const isPatient = isAuthenticated && user?.role === 'patient';
  const handleCTAClick = () => {
    if (isPatient) {
      handleLogoutClick();
    } else {
      navigate('/user/auth/login');
    }
  };

  const showModal = useModal();
  const handleLogoutClick = () => {
    showModal({
      type: 'red',
      title: 'Confirm Logout',
      message: 'Are you sure you want to logout?',
      confirmText: 'Logout',
      cancelText: 'Cancel',
      showCancel: true,
      onConfirm: async () => {
        const { success } = await authService.logout()
        if (success) {
          dispatch(logout());
        }
      },
    });
  };

  return (
    <header className="w-full max-w-[2000px]  sticky top-0 z-40 left-0 right-0 py-2 flex justify-center bg-white/80 backdrop-blur-md shadow-sm">
      <div className="flex justify-between items-center max-w-[1300px] w-full text-secondary px-4">

        <p className="text-[2rem] lg:text-[2.5rem] font-black hidden md:block">
          {env.APP_NAME}
        </p>

        <nav className="flex gap-10 items-center">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `cursor-pointer transition-all duration-300 hover:scale-105 ${isActive ? "font-bold" : ""
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/find"
            end
            className={({ isActive }) =>
              `cursor-pointer transition-all duration-300 hover:scale-105 ${isActive ? "font-bold" : ""
              }`
            }
          >
            Find
          </NavLink>

          {
            isAuthenticated && <NavLink
            to="/chat"
            end
            className={({ isActive }) =>
              `cursor-pointer transition-all duration-300 hover:scale-105 ${isActive ? "font-bold" : ""
              }`
            }>Chat</NavLink>
          }

          {isPatient && <NavLink
            to="/user/profile"
            end
            className={({ isActive }) =>
              `cursor-pointer transition-all duration-300 hover:scale-105 ${isActive ? "font-bold" : ""
              }`
            }
          >
            Drive
          </NavLink>}
        </nav>
        <div className="flex items-center gap-3 relative">
          <button
            onClick={handleCTAClick}
            className="group/button relative overflow-hidden border-2 border-[#0c0b3eb5] rounded-lg px-5 lg:py-1 lg:px-7 font-medium cursor-pointer transition-transform active:scale-95"
          >
            <div
              className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-85%)] opacity-50 
                         group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(85%)]"
            >
              <div className="relative h-full w-10 bg-white/20" />
            </div>
            {isPatient ? 'Logout' : 'Login'}
          </button>


          <button
            aria-label="Toggle navigation menu"
            onClick={() => setIsOpen(!isOpen)}
            className={`fa fa-bars text-[28px] p-2 cursor-pointer transition-transform duration-500 
              ${isPatient ? 'block' : 'lg:hidden'} ${isOpen ? '-rotate-90' : ''}`}
          ></button>
        </div>
      </div>


    </header>
  );
};

