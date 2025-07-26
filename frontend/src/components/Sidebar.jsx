import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, HomeIcon, UsersIcon, XIcon } from "lucide-react";

const Sidebar = ({ isOpen, onClose }) => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;

  // Common nav links
  const navLinks = (
    <>
      <Link
        to="/"
        className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
          currentPath === "/" ? "btn-active" : ""
        }`}
        onClick={onClose}
      >
        <HomeIcon className="size-5 text-base-content opacity-70" />
        <span>Home</span>
      </Link>

      <Link
        to="/friends"
        className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
          currentPath === "/friends" ? "btn-active" : ""
        }`}
        onClick={onClose}
      >
        <UsersIcon className="size-5 text-base-content opacity-70" />
        <span>Friends</span>
      </Link>

      <Link
        to="/notifications"
        className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
          currentPath === "/notifications" ? "btn-active" : ""
        }`}
        onClick={onClose}
      >
        <BellIcon className="size-5 text-base-content opacity-70" />
        <span>Notifications</span>
      </Link>
    </>
  );

  // Common footer
const footer = (
  <div className="p-4 border-t border-base-300 mt-auto">
    <div className="flex items-center gap-3">
      <div className="avatar">
        <div className="w-10 rounded-full">
          <img src={authUser?.profilePic} alt="User Avatar" />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm truncate">{authUser?.fullName}</p>
        <p className="text-xs text-success flex items-center gap-1">
          <span className="size-2 rounded-full bg-success inline-block" />
          Online
        </p>
      </div>
    </div>
  </div>
);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-base-200 border-r border-base-300 hidden lg:flex flex-col h-screen sticky top-0 z-40">
        <nav className="flex-1 p-4 space-y-1">{navLinks}</nav>
        {footer}
      </aside>

      {/* Mobile Drawer Sidebar */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Sidebar */}
          <div className="relative bg-base-200 w-64 h-full shadow-lg z-50 flex flex-col">
            {/* Close button */}
            <button
              className="absolute top-4 right-4 btn btn-sm btn-circle btn-ghost"
              onClick={onClose}
            >
              <XIcon className="w-5 h-5" />
            </button>

            {/* Content */}
            <nav className="flex-1 p-4 space-y-1 pt-12">{navLinks}</nav>
            {footer}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
