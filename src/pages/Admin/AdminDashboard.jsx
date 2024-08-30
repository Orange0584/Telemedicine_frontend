import React, { useEffect } from 'react'
import AdminNav from '../../components/AdminComponents/AdminNav'
import { FaArrowRightLong, FaKitMedical, FaUserDoctor } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const options = [
  {
    name: "Medicines",
    icon: <FaKitMedical color='' size={30} className='mr-4' />,
    link: "/admin/medicine",
  },
  {
    name: "Doctors",
    icon: <FaUserDoctor color='' size={30} className='mr-4' />,
    link: "/admin/doctors",
  }
]


const AdminDashboard = () => {
  const navigate = useNavigate()
  const cookieValue2 = Cookies.get("isAdmin");
  const isAdmin = JSON.parse(cookieValue2 ? cookieValue2 : null)
  useEffect(() => {
    if (!isAdmin) {
      navigate('/')
    }
  }, [])
  return (
    <div>
      <AdminNav />
      <div className="w-full min-h-[60vh]">
        <div className="w-full  mt-[100px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14 px-5">
          {
            options?.map((item, i) => {
              return (
                <div className="bg-card p-4 rounded-lg flex items-center shadow-md cursor-pointer "
                  onClick={() => { navigate(item?.link) }}
                >
                  {item?.icon}
                  <div className='flex justify-between items-center w-full' >
                    <h2 className="text-lg font-semibold">{item?.name}</h2>
                    <p className="text-lg font-semibold"><FaArrowRightLong size={30} /></p>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard