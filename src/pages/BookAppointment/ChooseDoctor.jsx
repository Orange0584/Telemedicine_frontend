import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { getHeaders } from '../../headers';
import apis from '../../apis';
import { FaArrowRightLong, FaUserDoctor } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


const ChooseDoctor = () => {
    const cookieValue = Cookies.get('userData');
    const userData = cookieValue ? JSON.parse(cookieValue) : null;
    const navigate = useNavigate();
    const [docs , setDocs] = useState([]);
    const headers = getHeaders();
    useEffect(()=>{
        axios.get(apis.FETCHDOCS,{headers})
        .then((res)=>{
            console.log("doctorslist",res?.data)
            setDocs(res?.data)
        })
    },[])
    if (userData?.role == "user") {
        return (
          <div className="  min-h-screen  flex flex-col pt-[80px]">
                  <div className="  text-primary-foreground py-4 px-6 flex justify-between items-center">
                      {docs?.length > 0 && <h1 className="text-2xl font-semibold">Doctors</h1>}
                      <button   className='bg-[#33186B] w-max px-2 text-white py-2 rounded'
                        onClick={()=>{
                            navigate('/my-appointments')
                        }}
                    ><span className='mx-auto' >My Appointments</span></button>
                  </div>
                  <main className="flex-1 p-4">
                      {docs?.length > 0 ?
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14 px-5">
                          {
                              docs?.map((item, index) => {
                                  return (
                                    <div
                                      key={item?._id}
                                      onClick={() => {
                                        navigate(
                                          `/book-appointment/${item?._id}`
                                        );
                                      }}
                                      className="bg-card p-4 w-full min-w-max rounded-lg flex justify-between items-center shadow-md"
                                    >
                                      <div className="flex">
                                        <FaUserDoctor
                                          size={40}
                                          className=" mr-4"
                                        />
                                        <div>
                                          <h2 className="text-lg font-semibold">
                                            {item?.profile?.name
                                              ? item?.profile?.name
                                              : item?.username}
                                          </h2>
                                          <p className="text-sm font-semibold">
                                            {item?.email}
                                          </p>
                                          <p className="text-sm font-semibold">
                                            Experience:{" "}
                                            {item?.profile?.experience}
                                          </p>
                                          <p className="text-sm font-semibold">
                                            Field: {item?.profile?.field}
                                          </p>
                                        </div>
                                      </div>
                                      <p className="text-lg font-semibold">
                                        <FaArrowRightLong size={30} />
                                      </p>
                                    </div>
                                  );
                              })
                          }
                      </div>
                      :
                      <div className="text-center text-lg font-semibold flex flex-col gap-4 justify-center items-center py-4">
                          {/* <BsCartXFill size={200} /> */}
                          <p>There are No Doctors available</p>
                      </div>
                      }
                  </main>
              </div>
        )
    }else {
        navigate("/appointments")
    }
}

export default ChooseDoctor