import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/userApiSlice.js";
import { logOut } from "../../redux/features/auth/authSlice.js";
import FavoritesCount from "../Products/FavoritesCount.jsx";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const toggleDropDown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const closeSidebar = () => {
    setShowSidebar(false);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logOut());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      style={{ zIndex: 9999 }}
      className={`${
        showSidebar ? "hidden" : "flex"
      } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-[#000] w-[4%] hover:w-[15%] h-[100vh]  fixed `}
      id="navigation-container"
    >
      <div className="flex flex-col justify-center space-y-4">
        <Link to={"/"} className="relative flex">
          <div className="flex items-center transition-transform transform hover:translate-x-2">
            <AiOutlineHome className="mr-2 mt-[3rem]" size={20} />
            <span className="hidden nav-item-name mt-[3rem]">HOME</span>{" "}
          </div>
        </Link>
        <Link to={"/shop"} className="relative flex">
          <div className="flex items-center transition-transform transform hover:translate-x-2">
            <AiOutlineShopping className="mr-2 mt-[3rem]" size={20} />
            <span className="hidden nav-item-name mt-[3rem]">SHOP</span>{" "}
          </div>
        </Link>
        <Link to={"/cart"} className="relative flex">
          <div className="flex items-center transition-transform transform hover:translate-x-2">
            <AiOutlineShoppingCart className="mr-2 mt-[3rem]" size={20} />
            <span className="hidden nav-item-name mt-[3rem]">CART</span>{" "}
            <div className="absolute top-9">
              {cartItems.length > 0 && (
                <span>
                  <div className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
                    {cartItems.reduce((a, c) => a + c.qty, 0)}
                  </div>
                </span>
              )}
            </div>
          </div>
        </Link>
        <Link to={"/favorite"} className="relative flex">
          <div className="flex items-center transition-transform transform hover:translate-x-2">
            <FaHeart className="mr-2 mt-[3rem]" size={20} />
            <span className="hidden nav-item-name mt-[3rem]">
              FAVORITES
            </span>{" "}
            <FavoritesCount />
          </div>
        </Link>
      </div>

      <div className="relative">
        <button
          className="flex items-center text-gray-800 focus:outline-none"
          onClick={toggleDropDown}
        >
          {userInfo ? (
            <span className="text-white">{userInfo.username}</span>
          ) : (
            <></>
          )}
          {userInfo && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ml-1 ${
                dropdownOpen ? "transform rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
              />
            </svg>
          )}
        </button>

        {dropdownOpen && userInfo && (
          <ul
            className={`absolute right-0 mt-2 mr-14 space-y-2 bg-white text-gray-600 ${
              !userInfo.isAdmin ? "-top-20 " : "-top-80"
            }  `}
          >
            {userInfo.isAdmin && (
              <>
                <li>
                  <Link
                    to={"/admin/dashboard"}
                    className="block px-4 py-2 hover:bg-gray-900 hover:text-white "
                  >
                    DASHBOARD
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/admin/productlist"}
                    className="block px-4 py-2 hover:bg-gray-900 hover:text-white "
                  >
                    PRODUCTS
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/admin/categorylist"}
                    className="block px-4 py-2 hover:bg-gray-900 hover:text-white "
                  >
                    CATEGORY
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/admin/orderlist"}
                    className="block px-4 py-2 hover:bg-gray-900 hover:text-white "
                  >
                    ORDERS
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/admin/userlists"}
                    className="block px-4 py-2 hover:bg-gray-900 hover:text-white "
                  >
                    USERS
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link
                to={"/profile"}
                className="block px-4 py-2 hover:bg-gray-900 hover:text-white "
              >
                PROFILE
              </Link>
            </li>
            <li>
              <Link
                to={"/admin/logout"}
                onClick={logoutHandler}
                className="block px-4 py-2 hover:bg-gray-900 hover:text-white "
              >
                LOGOUT
              </Link>
            </li>
          </ul>
        )}
        {!userInfo && (
          <ul>
            <li>
              <Link
                to={"/login"}
                className="flex items-center transition-transform transform hover:translate-x-2"
              >
                <AiOutlineLogin className="mr-2 mt-[3rem]" size={20} />
                <span className="hidden nav-item-name mt-[3rem]">
                  LOGIN
                </span>{" "}
              </Link>
            </li>
            <li>
              <Link
                to={"/register"}
                className="flex items-center transition-transform transform hover:translate-x-2"
              >
                <AiOutlineUserAdd className="mr-2 mt-[3rem]" size={20} />
                <span className="hidden nav-item-name mt-[3rem]">
                  SIGNIN
                </span>{" "}
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navigation;
