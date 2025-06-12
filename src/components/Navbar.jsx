import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Menu, X } from "lucide-react"; // Tailwind + Lucide for icons

const Navbar = () => {
  const { authToken, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo / Title */}
        <NavLink to="/" end className="text-xl font-bold text-blue-600">
          RATEGUARD ANALYTICS
        </NavLink>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 items-center">
          <NavLink to="/" end className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600"}>
            Home
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600"}>
            About
          </NavLink>
          <NavLink to="/" state={{ scrollTo: "services" }} className="text-gray-700 hover:text-blue-600">
            Services
          </NavLink>
          {!authToken ? (
            <>
              <NavLink to="/login" className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600"}>
                Login
              </NavLink>
              <NavLink to="/signup" className="text-gray-700 hover:text-blue-600">
                Signup
              </NavLink>
            </>
          ) : (
            <button onClick={handleLogout} className="text-gray-700 hover:text-red-600">
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-700" onClick={toggleMenu}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md px-4 py-3 space-y-2">
          <NavLink to="/" end onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? "block text-blue-600 font-semibold" : "block text-gray-700 hover:text-blue-600"}>
            Home
          </NavLink>
          <NavLink to="/about" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? "block text-blue-600 font-semibold" : "block text-gray-700 hover:text-blue-600"}>
            About
          </NavLink>
          <NavLink to="/" state={{ scrollTo: "services" }} onClick={() => setMenuOpen(false)} className="block text-gray-700 hover:text-blue-600">
            Services
          </NavLink>
          {!authToken ? (
            <>
              <NavLink to="/login" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? "block text-blue-600 font-semibold" : "block text-gray-700 hover:text-blue-600"}>
                Login
              </NavLink>
              <NavLink to="/signup" onClick={() => setMenuOpen(false)} className="block text-gray-700 hover:text-blue-600">
                Signup
              </NavLink>
            </>
          ) : (
            <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="block text-gray-700 hover:text-red-600">
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
