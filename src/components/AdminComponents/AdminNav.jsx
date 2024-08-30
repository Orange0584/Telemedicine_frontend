import React from 'react'
import { TbLogout2 } from 'react-icons/tb';
import { TiShoppingCart } from "react-icons/ti";
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { ImAidKit } from 'react-icons/im';

const AdminNav = () => {
  const navigate = useNavigate();
  const cookieValue = Cookies.get('userData');
  const userData = cookieValue ? JSON.parse(cookieValue) : null;
  return (
    <header className={`${ window.location.pathname == '/verify-doctor-profile' ? "hidden" : ""} flex justify-between items-center p-4 bg-transparent w-full fixed top-0 bg-white shadow-lg z-50`}>
      <div className="flex items-center" onClick={() => {
        navigate("/")
      }}>
        <ImAidKit size={30} className='mr-2' color='#33186B' />
        <span className="md:text-xl font-bold text-zinc-900 md:inline-block hidden">TELEMEDICINE</span>
      </div>
      <div className="flex items-center gap-1">
        <div className="flex items-center justify-between gap-1 sm:gap-4">
          <Link to={'/admin/medicine'} >Medicines</Link>
          <Link to={'/admin/doctors'} >Doctors</Link>
          {/* <Link to={'/admin/create-category'} >Categories</Link> */}
        </div>

        <div className="flex items-center">
          <span className='bg-purple-800 text-white relative flex justify-center items-center h-10 w-10 mr-1 rounded-full' >{userData?.username ? userData?.username[0].toUpperCase() : ""}
          </span>
          <span className="text-zinc-900 md:inline-block hidden capitalize ">{userData?.username}</span>
        </div>
        <TbLogout2 size={30} className='ml-3'
          onClick={() => {
            Cookies.remove('userToken');
            Cookies.remove('isAdmin');
            window.location.href = "/login";
            toast.success("Logout successfull")
          }}
        />
      </div>
    </header>
  )
}

export default AdminNav