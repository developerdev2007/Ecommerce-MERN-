import { useState } from "react";

import { NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const AdminMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <button
        className={`${
          isMenuOpen ? "top-2 right-2" : "top-7 right-5"
        } bg-[#151515] p-2 fixed rounded-full`}
        onClick={toggleMenu}
      >
        {isMenuOpen ? (
          <FaTimes color="white" />
        ) : (
          <>
            <div className="w-6 h-0.5 my-1 bg-white "></div>
            <div className="w-6 h-0.5 my-1 bg-white "></div>
            <div className="w-6 h-0.5 my-1 bg-white "></div>
          </>
        )}
        {isMenuOpen && (
          <section className="bg-[#151515] p-4 fixed right-7 top-5">
            <ul className="mt-2 list-none">
              <li>
                <NavLink
                  className=" px-4 py-3 list-item mb-5 hover:bg-[#2E2D2D] rounded-sm"
                  to={"/admin/dashboard"}
                  style={({ isActive }) => ({
                    color: isActive ? "greenyellow" : "white",
                  })}
                >
                  Admin Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  className=" px-4 py-3 list-item mb-5 hover:bg-[#2E2D2D] rounded-sm"
                  to={"/admin/categorylist"}
                  style={({ isActive }) => ({
                    color: isActive ? "greenyellow" : "white",
                  })}
                >
                  CAtegory List
                </NavLink>
              </li>
              <li>
                <NavLink
                  className=" px-4 py-3 list-item mb-5 hover:bg-[#2E2D2D] rounded-sm"
                  to={"/admin/productlist"}
                  style={({ isActive }) => ({
                    color: isActive ? "greenyellow" : "white",
                  })}
                >
                  Create Product List
                </NavLink>
              </li>
              <li>
                <NavLink
                  className=" px-4 py-3 list-item mb-5 hover:bg-[#2E2D2D] rounded-sm"
                  to={"/admin/allproductslist"}
                  style={({ isActive }) => ({
                    color: isActive ? "greenyellow" : "white",
                  })}
                >
                  All Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  className=" px-4 py-3 list-item mb-5 hover:bg-[#2E2D2D] rounded-sm"
                  to={"/admin/userlists"}
                  style={({ isActive }) => ({
                    color: isActive ? "greenyellow" : "white",
                  })}
                >
                  Users
                </NavLink>
              </li>

              <li>
                <NavLink
                  className=" px-4 py-3 list-item mb-5 hover:bg-[#2E2D2D] rounded-sm"
                  to={"/admin/orderlist"}
                  style={({ isActive }) => ({
                    color: isActive ? "greenyellow" : "white",
                  })}
                >
                  Orders
                </NavLink>
              </li>
            </ul>
          </section>
        )}
      </button>
    </>
  );
};

export default AdminMenu;
