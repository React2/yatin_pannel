/** @format */

import React from "react";
import { RiCloseLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { BsFillCartFill } from "react-icons/bs";
import { BiLogOutCircle, BiCategory } from "react-icons/bi";
import { MdDashboardCustomize } from "react-icons/md";
import { BsFillChatDotsFill } from "react-icons/bs";
import { TbDiscount } from "react-icons/tb";
import { AiFillMessage } from "react-icons/ai";
import { FiImage } from "react-icons/fi";
import { FaProductHunt, FaUserCircle } from "react-icons/fa";
import { GrUserManager } from "react-icons/gr";

const Sidebar = ({ hamb, setHamb }) => {
  const navigate = useNavigate();

  const nav = [
    {
      icon: <MdDashboardCustomize className="text-xl mr-3 rounded-full " />,
      link: "/vendorDashboard",
      name: "Dashboard",
    },
    {
      icon: <GrUserManager className="text-xl mr-3" />,
      link: "/vehicle_type",
      name: "Vehicle Type",
    },
    {
      icon: <GrUserManager className="text-xl mr-3" />,
      link: "/vehicle",
      name: "Vehicle ",
    },
    {
      icon: <GrUserManager className="text-xl mr-3" />,
      link: "/driver",
      name: "Driver ",
    },
    {
      icon: <TbDiscount className="text-xl mr-3" />,
      link: "/dis",
      name: "Coupon",
    },
    {
      icon: <FaUserCircle className="text-xl mr-3" />,
      link: "/users",
      name: "Users",
    },
    {
      icon: <FiImage className="text-xl mr-3" />,
      link: "/ban",
      name: "Banner",
    },
    // {
    //   icon: <GrUserManager className="text-xl mr-3" />,
    //   link: "/ven",
    //   name: "Vendors",
    // },

    // {
    //   icon: <FiImage className="text-xl mr-3" />,
    //   link: "/subAdmin",
    //   name: "Sub-Admin",
    // },
    {
      icon: <BiCategory className="text-xl mr-3" />,
      link: "/category",
      name: "Categories",
    },
    // {
    //   icon: <FaProductHunt className="text-xl mr-3 rounded-full " />,
    //   link: "/product",
    //   name: "Products",
    // },
    {
      icon: <AiFillMessage className="text-xl mr-3 rounded-full " />,
      link: "/notifications",
      name: "Notification",
    },

    // {
    //   icon: <BsFillChatDotsFill className="text-xl mr-3" />,
    //   link: "/complaint",
    //   name: "Help&Support",
    // },
    // {
    //   icon: <BsFillCartFill className="text-xl mr-3" />,
    //   link: "/order",
    //   name: "Orders",
    // },
    // {
    //   icon: <BsFillCartFill className="text-xl mr-3" />,
    //   link: "/deliveryPartner",
    //   name: "Delivery Partner",
    // },
    // {
    //   icon: <BsFillCartFill className="text-xl mr-3" />,
    //   link: "/privacy",
    //   name: "Privacy Policy",
    // },
    // {
    //   icon: <BsFillCartFill className="text-xl mr-3" />,
    //   link: "/term",
    //   name: "Terms&COndition",
    // },
  ];

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/vendorLogin");
  };

  return (
    <>
      <aside className="p-4 h-auto">
        {/* Top */}
        <div className="w-full md:hidden relative  p-2 mb-4">
          <RiCloseLine
            onClick={() => setHamb(!hamb)}
            className="text-3xl  absolute top-2 sm:hover:rotate-[228deg] transition-transform font-bold right-2 sm:hover:text-[22px] text-[rgb(241,146,46)] cursor-pointer"
          />
        </div>
        {/* Logo */}
        <figure className="flex  flex-col items-center">
          <span className="font-bold text-[rgb(241,146,46)]">Admin Panel</span>
        </figure>
        {/* Nav-menu */}
        <nav className="py-6">
          {nav.map((nav) => {
            return (
              <Link to={nav.link} key={nav.name} className="">
                <span className="flex my-3 items-center cursor-pointer text-gray-900    tracking-wider p-2 rounded-sm">
                  {nav.icon} {nav.name}
                </span>
              </Link>
            );
          })}
          <span
            className="flex my-3 items-center cursor-pointer text-gray-900    tracking-wider p-2 rounded-sm"
            onClick={() => logOut()}
          >
            <BiLogOutCircle className="text-xl mr-3 rounded-full " /> LogOut
          </span>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
