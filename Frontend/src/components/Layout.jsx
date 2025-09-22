import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import dash from '../assets/dash.svg';
import admin from '../assets/admin.svg';
import product from '../assets/Package.svg';
import offer from '../assets/offers.svg';
import Students from '../assets/Students.svg';
import alumni from '../assets/alumni.png'
import settings from '../assets/Settings.svg';
import orders from '../assets/order.svg';
import Logout from './Logout'; 
import Events from  "../assets/Events.svg"
import logoutIcon from '../assets/logout.svg'; // Add an icon for logout

function Layout() {
  const [isExpanded, setIsExpanded] = useState(false);

  const sidebarOpt = [
    { to: "/dashboard", text: "DashBoard", img: dash },
    { to: "/events", text: "Events", img: Events },
    { to: "/profile-management", text: "Mangement", img: orders },
    { to: "/students", text: "Students", img: Students },
    { to: "/alumins", text: "Alumni", img: alumni },
    // { to: "/offers", text: "Offers", img: offer },
    { to: "/admins", text: "Admins", img: admin },
  ];

  return (
    <div className="flex pt-1 w-full h-[93vh] gap-2">
      {/* Sidebar */}
      <div
        className={`bg-gray-200 rounded-[5px] h-auto flex flex-col justify-between py-3 transition-all duration-500 ease-in-out shadow-md
    ${isExpanded ? 'w-[200px]' : 'w-[65px]'}
  `}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <div className="flex flex-col gap-2">
          <div className="w-full flex justify-center py-2">
            {/* Logo or top icon if needed */}
          </div>

          {sidebarOpt.map((link, index) => (
            <NavLink
              key={index}
              to={link.to}
              className={({ isActive }) =>
                `p-3 rounded flex items-center gap-2 mx-2
           transition-colors duration-500 ease-in-out
           hover:bg-white hover:scale-[1.05] hover:shadow-sm
           ${isActive ? "bg-white shadow" : ""}`
              }
            >
              <img
                className="w-[20px] transition-transform duration-500 ease-in-out group-hover:scale-110"
                src={link.img}
                alt={link.text}
              />
              <p
                className={`text-[15px] font-[500] whitespace-nowrap overflow-hidden
            transition-[opacity,width] duration-500 ease-in-out delay-100
            ${isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0"}
          `}
              >
                {link.text}
              </p>
            </NavLink>
          ))}
        </div>

        {/* Bottom section (Logout + Settings) */}
        <div
          className={`flex items-center transition-all duration-500 ease-in-out px-4
      ${isExpanded ? "justify-between" : "flex-col gap-5"}
    `}
        >
          <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-300 ease-in-out">
            <Logout/>
            <span
              className={`text-[15px] font-[500] whitespace-nowrap overflow-hidden 
          transition-[opacity,width] duration-500 ease-in-out delay-100
          ${isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0"}
        `}
            >
              Logout
            </span>
          </div>

          <NavLink
            to="settings"
            className="hover:scale-110 transition-transform duration-300 ease-in-out"
          >
            <img className="w-[30px]" src={settings} alt="Settings" />
          </NavLink>
        </div>
      </div>


      {/* Main Section */}
      <div className="flex-1 bg-gray-200 rounded-[5px] overflow-y-scroll custom-scrollbar">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;