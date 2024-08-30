import React, { useEffect } from 'react'
import { TbLogout2 } from 'react-icons/tb';
import { TiShoppingCart } from "react-icons/ti";
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { ImAidKit } from 'react-icons/im';
import { FaPlus } from 'react-icons/fa6';
import { IoBagCheck } from 'react-icons/io5';
import { RiAdminFill } from "react-icons/ri";
import { FaUserDoctor } from "react-icons/fa6";

const Header = () => {
  const navigate = useNavigate();
  const cookieValue = Cookies.get('userData');
  const userData = cookieValue ? JSON.parse(cookieValue) : null;
  useEffect(() => {
    if (!userData) {
      navigate('/login')
    }
  },[]);
  const cookieValue2 = Cookies.get("isAdmin");
  const isAdmin = JSON.parse(cookieValue2 ? cookieValue2 : null);

  

  return (
    <header
      className={`flex justify-between items-center p-4 bg-transparent w-full fixed top-0 bg-white shadow-lg z-50 ${
        window.location.pathname == "/login" ||
        window.location.pathname == "/signup" ||
        window.location.pathname == "/verify-doctor-profile" ||
        window.location.pathname.includes("/admin") ||
        window.location.pathname.includes("/chat")
          ? "hidden"
          : ""
      }`}
    >
      <div
        className="flex items-center cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        <ImAidKit size={30} className="mr-2" color="#33186B" />
        <span className="md:text-xl font-bold text-zinc-900 hidden sm:inline-block ">
          TELEMEDICINE
        </span>
      </div>
      <div className="flex items-center ">
        <Link to={`/orders`} className="text-sm md:text-lg font-semibold mr-2">
          <IoBagCheck size={26} />{" "}
        </Link>
        <Link
          to={`/select-doctor`}
          className="text-sm md:text-lg font-semibold mr-2"
        >
          <FaUserDoctor size={26} />
        </Link>
        <TiShoppingCart
          size={30}
          className="cursor-pointer"
          onClick={() => {
            navigate("/cart");
          }}
        />

        {isAdmin && (
          <Link to={`/admin`} className="text-sm md:text-lg font-semibold mr-2">
            <RiAdminFill size={26} />
          </Link>
        )}

        <div className="flex items-center ml-2">
          {/* <img src={`https://placehold.co/40x40/33186B/FFFFFF?text=${userData?.username ? userData?.username[0].toUpperCase() : ""}`} alt="" className="rounded-full mr-2" /> */}
          <span className="bg-purple-800 text-white relative flex justify-center items-center h-10 w-10 mr-1 rounded-full">
            {userData?.username ? userData?.username[0].toUpperCase() : ""}
          </span>
          <span className="text-zinc-900 md:inline-block hidden capitalize ">
            {userData?.username}
          </span>
        </div>
        <TbLogout2
          size={30}
          className="ml-2 cursor-pointer"
          onClick={() => {
            Cookies.remove("userToken");
            Cookies.remove("isAdmin");
            window.location.href = "/login";
            toast.success("Logout successfull");
          }}
        />
      </div>
    </header>
  );
}
export default Header
