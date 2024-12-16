import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/hlogo.png';

const Header = () => {
  return (
    <header>
      <div className="navbar bg-base-300">
        {/* Left Section: Dropdown and Logo */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow gap-2"
            >
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about-team">About</Link></li>
              <li><Link to="/api-endpoints">Api Endpoints</Link></li>
              <li><Link to="/admin-section">Admin Section</Link></li>
            </ul>
          </div>
          <button className="hover:scale-90 hover:bg-base-300">
            <img src={logo} className="w-16" alt="Logo" />
          </button>
        </div>

        {/* Center Section: Navbar Items for Large Screens */}
        <div className="navbar-center hidden lg:flex justify-between">
          <ul className="menu menu-horizontal px-1">
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about-team">About</Link></li>
            <li><Link to="/api-endpoints">Api Endpoints</Link></li>
            <li><Link to="/admin-section">Admin Section</Link></li>
          </ul>
        </div>

        {/* Right Section: Register Button */}
        <div className="navbar-end mt-8">
          <Link
            to="/register"
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;