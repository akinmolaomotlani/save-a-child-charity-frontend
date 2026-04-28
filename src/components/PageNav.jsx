import { NavLink } from "react-router-dom";
import { useState } from "react";
import Logo from "./Logo";

export default function PageNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const linkClass = ({ isActive }) =>
    `relative px-2 py-1 transition font-medium ${
      isActive
        ? "text-blue-600 after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-blue-600"
        : "text-gray-700 hover:text-blue-600"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b shadow-sm mb-4">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/">
            <Logo />
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10">
            {/* Nav Links */}
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

            {/* Divider */}
            <div className="h-6 w-px bg-gray-300" />

            {/* CTA + Auth */}
            <div className="flex items-center gap-4">
              <NavLink
                to="/donate"
                className="bg-orange-500 text-white px-5 py-2 rounded-full font-medium hover:bg-orange-600 transition shadow-sm"
              >
                Donate
              </NavLink>

              {!isLoggedIn ? (
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
                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="text-sm text-red-500 font-medium"
                >
                  Logout
                </button>
              )}
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu + Overlay */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu */}
          <div className="md:hidden fixed top-16 left-0 w-full bg-white z-50 py-6 px-6 space-y-6 shadow-xl">
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

            <div className="border-t pt-4 space-y-4">
              <NavLink
                to="/donate"
                className="block bg-orange-500 text-white text-center py-2 rounded-lg font-medium"
                onClick={() => setIsOpen(false)}
              >
                Donate
              </NavLink>

              {!isLoggedIn ? (
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
                <button
                  onClick={() => {
                    setIsLoggedIn(false);
                    setIsOpen(false);
                  }}
                  className="block text-left text-red-500 font-medium"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
