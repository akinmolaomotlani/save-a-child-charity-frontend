import { NavLink, useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FiLogOut, FiUser } from "react-icons/fi";
import Logo from "./Logo";

export default function PageNav() {
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();

  const { user } = useContext(AuthContext);

  // ✅ HIDE AUTH SECTION ON DASHBOARDS
  const hideAuthButtons =
    location.pathname.includes("/admin/dashboard") ||
    location.pathname.includes("/user/dashboard");

  const linkClass = ({ isActive }) =>
    `relative px-2 py-1 transition font-medium ${
      isActive
        ? "text-blue-600 after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-blue-600"
        : "text-gray-700 hover:text-blue-600"
    }`;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/";
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b shadow-sm mb-4">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* LOGO */}
          <NavLink to="/">
            <Logo />
          </NavLink>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-10">
            {/* NAV LINKS */}
            <div className="flex items-center gap-8">
              <NavLink to="/" className={linkClass}>
                Home
              </NavLink>

              <NavLink to="/aboutus" className={linkClass}>
                About
              </NavLink>

              <NavLink to="/getinvolve" className={linkClass}>
                Get Involved
              </NavLink>
            </div>

            {/* DIVIDER */}
            {!hideAuthButtons && (
              <>
                <div className="h-6 w-px bg-gray-300" />

                {/* AUTH / CTA */}
                <div className="flex items-center gap-4">
                  {/* DONATE BUTTON */}
                  <NavLink
                    to="/donate"
                    className="bg-orange-500 text-white px-5 py-2 rounded-full font-medium hover:bg-orange-600 transition shadow-sm"
                  >
                    Donate
                  </NavLink>

                  {/* USER NOT LOGGED IN */}
                  {!user ? (
                    <>
                      <NavLink
                        to="/login"
                        className="text-sm font-medium text-gray-600 hover:text-black transition"
                      >
                        Login
                      </NavLink>

                      <NavLink
                        to="/register"
                        className="border border-gray-300 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-gray-100 transition"
                      >
                        Sign Up
                      </NavLink>
                    </>
                  ) : (
                    /* LOGGED IN USER MENU */
                    <div className="flex items-center gap-3">
                      {/* DASHBOARD */}
                      <NavLink
                        to="/user/dashboard"
                        className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full hover:bg-blue-100 transition font-medium"
                      >
                        <FiUser />
                        Dashboard
                      </NavLink>

                      {/* LOGOUT */}
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 bg-red-50 text-red-500 px-4 py-2 rounded-full hover:bg-red-100 transition font-medium"
                      >
                        <FiLogOut />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* MOBILE TOGGLE */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden fixed inset-0 z-50 transition-all duration-300 ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* OVERLAY */}
        <div
          onClick={() => setIsOpen(false)}
          className={`absolute inset-0 transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* MOBILE CONTENT */}
        <div
          className={`absolute top-16 left-0 w-full bg-white py-6 px-6 space-y-6 shadow-2xl transform transition-all duration-300 ease-out ${
            isOpen ? "translate-y-0 opacity-100" : "-translate-y-5 opacity-0"
          }`}
        >
          <NavLink
            to="/"
            className="block font-medium"
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>

          <NavLink
            to="/aboutus"
            className="block font-medium"
            onClick={() => setIsOpen(false)}
          >
            About
          </NavLink>

          <NavLink
            to="/getinvolve"
            className="block font-medium"
            onClick={() => setIsOpen(false)}
          >
            Get Involved
          </NavLink>

          {!hideAuthButtons && (
            <div className="border-t pt-4 space-y-4">
              {/* DONATE */}
              <NavLink
                to="/donate"
                className="block bg-orange-500 text-white text-center py-2 rounded-lg font-medium"
                onClick={() => setIsOpen(false)}
              >
                Donate
              </NavLink>

              {/* MOBILE AUTH */}
              {!user ? (
                <div className="flex flex-col gap-3">
                  <NavLink
                    to="/login"
                    className="text-center border py-2 rounded-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </NavLink>

                  <NavLink
                    to="/register"
                    className="text-center bg-gray-100 py-2 rounded-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </NavLink>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {/* DASHBOARD */}
                  <NavLink
                    to="/user/dashboard"
                    className="flex items-center justify-center gap-2 bg-blue-50 text-blue-600 py-2 rounded-lg font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    <FiUser />
                    Dashboard
                  </NavLink>

                  {/* LOGOUT */}
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 bg-red-50 text-red-500 py-2 rounded-lg font-medium"
                  >
                    <FiLogOut />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
