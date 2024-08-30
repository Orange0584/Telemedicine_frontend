import React from 'react'
import { FaPlus } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'

const Appointment = () => {
    const navigate = useNavigate();
    if(window.location.pathname == "/login" || window.location.pathname == "/signup"){
      return;
    }
  return (
    <div className="appointment animate-scaleIn fixed z-50 bottom-[18vh] right-2" 
    onClick={()=>{
        navigate("/select-doctor")
    }}
    >
        <span className='cursor-pointer  bg-purple-800 text-white relative flex flex-col shadow-lg hover:rotate-90 transition-all justify-center items-center h-16 w-16 rounded-full' ><FaPlus className='bg-purple-800 animate-pulse' color='white' size={30}/>
        </span>
        {/* <span className='text-xs text-center bg-purple-800 rounded-xl p-1 text-white font-semibold' >Appointment</span> */}
    </div>
  )
}

export default Appointment