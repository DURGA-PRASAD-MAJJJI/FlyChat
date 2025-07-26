import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, LogOutIcon, MenuIcon, ShipWheelIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";

const Navbar = ({ onMenuClick }) => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");
  const { logoutMutation } = useLogout();

  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
      <div className="container mx-auto px-4 flex items-center justify-between w-full">
        {/* Left: Mobile menu + Logo */}
        <div className="flex items-center gap-3">
          {/* Hamburger menu for mobile */}
          <button className="lg:hidden btn btn-ghost btn-circle" onClick={onMenuClick}>
            <MenuIcon className="h-6 w-6 text-base-content" />
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <ShipWheelIcon className="size-6 text-primary" />
            <span className="text-xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              FlyChat
            </span>
          </Link>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Notifications */}
          <Link to="/notifications">
            <button className="btn btn-ghost btn-circle">
              <BellIcon className="h-6 w-6 text-base-content opacity-70" />
            </button>
          </Link>

          {/* Theme switch */}
          <ThemeSelector />

          {/* Avatar */}
          <div className="avatar">
            <div className="w-9 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={authUser?.profilePic} alt="User Avatar" />
            </div>
          </div>

          {/* Logout */}
          <button className="btn btn-ghost btn-circle" onClick={logoutMutation}>
            <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
