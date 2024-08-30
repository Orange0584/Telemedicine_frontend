import React, { useEffect } from 'react'
import AdminNav from '../../components/AdminComponents/AdminNav'
import axios from 'axios'
import apis from '../../apis'
import { getHeaders } from '../../headers'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'

const DocAppointments = () => {
    const navigate = useNavigate();
    const headers = getHeaders();
    const [meds, setMeds] = React.useState([])
    const cookieValue = Cookies.get('userData');
    const userData = cookieValue ? JSON.parse(cookieValue) : null;
    const goToChat = async(item) => {
        try {
            const res = await axios.get(`${apis.GET_CHATROOM}${item?.user_id}/${item?.doctor_id}`,{headers})
            console.log("res",res)
        if(res?.data?.length == 0){
            const chatRoom = await axios.post(`${apis.CREATE_CHATROOM}`,{
                user1_id: item?.user_id,
                user2_id: userData?.user_id,
            } ,{headers})
            console.log("chatRoom",chatRoom);
            if(chatRoom?.data?.room_id){
                navigate(`/chat/${item?.user_id}/${item?.user_details?.username.replace(" ","+")}/${chatRoom?.data?.room_id}`)
            }
        }else{
            navigate(`/chat/${res?.data?.user1_id}/${item?.user_details?.username.replace(" ","+")}/${res?.data?._id}`)
        }
        } catch (error) {
            toast.error("Something went wrong")
        }
    }

const handleUpdate = (item , stat) =>{
    axios.post(apis.UPDATEAPPOINTMENT , {
        doctor_id:item?.doctor_id,
        appointment_id:item?._id,
        status:stat
    },{headers}).then((res)=>{
        console.log("updated" , res)
        toast.success("Appointment status updated")
        fetchAppointments()
    })
}

const fetchAppointments = ()=>{
    axios.get(`${apis.FETCHAPPONTMENTS}?doctor_id=${userData?.user_id}`, { headers })
    .then((response) => {
        console.log("DocAppointments", response);
        setMeds(response.data?.appointments);
    })
}

    useEffect(() => {
        fetchAppointments()
    }, [])

    return (
        <>
            <div className="w-full h-full flex justify-center mt-28">
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-[90%] ">
                    <h2 className='text-3xl font-bold text-center my-5' >Appointments</h2>
                    {meds?.length > 0 ? <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                            <tr>
                                <th scope="col" class="px-6 py-3 text-lg">
                                 Patient Name
                                </th>
                                <th scope="col" class="px-6 py-3 text-lg">
                                    Patient Email
                                </th>
                                <th scope="col" class="px-6 py-3 text-lg">
                                    Appointment Time
                                </th>
                                <th scope="col" class="px-6 py-3 text-lg">
                                    Status
                                </th>
                                <th scope="col" class="px-6 py-3 text-lg">
                                    
                                </th>
                                <th scope="col" class="px-6 py-3 text-lg">
                                    
                                </th>
                                <th scope="col" class="px-6 py-3 text-lg">
                                    Chat
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {meds.map((med) => {
                                return (
                                    <tr key={med?._id} class="odd:bg-white  even:bg-gray-50  border-b ">
                                        <th scope="row" class="px-6 py-4 font-medium capitalize text-gray-900 whitespace-nowrap ">
                                            {med?.user_details?.username}
                                        </th>
                                        <td class="px-6 py-4">
                                            {med?.user_details?.email}
                                        </td>
                                        <td class="px-6 py-4">
                                            {med?.appointment_time}
                                        </td>
                                        {/* <td class="px-6 py-4">
                                        <Link to={`/admin/update-medicine/${med?._id}`} className=' text-sm text-blue-600 mt-12 underline' >Edit</Link>
                                        </td> */}
                                        {med?.status== "completed" ? <td class="px-6 py-4 ">
                                            <span className='bg-purple-500 rounded-sm px-1 cursor-pointer py-0.5 text-white font-semibold'>Completed</span>
                                        </td>
                                        :
                                        <td class="px-6 py-4 " onClick={()=>{
                                            if(med?.status== "completed" ) return ;
                                            handleUpdate(med , "completed");
                                        }} >
                                            <span className='border border-purple-500 rounded-sm px-1 cursor-pointer py-0.5 text-purple-500 font-semibold'>Complete</span>
                                        </td>
                                    }
                                    {med?.status== "accepted" ? <td class="px-6 py-4 ">
                                            <span className='bg-purple-500 rounded-sm px-1 cursor-pointer py-0.5 text-white font-semibold'>Accepted</span>
                                        </td>
                                        :
                                        <td class="px-6 py-4 " onClick={()=>{
                                            handleUpdate(med , "accepted");
                                        }} >
                                            <span className='border border-purple-500 rounded-sm px-1 cursor-pointer py-0.5 text-purple-500 font-semibold'>Accept</span>
                                        </td>
                                    }
                                    {med?.status== "rejected" ? <td class="px-6 py-4 ">
                                            <span className='bg-purple-500 rounded-sm px-1 cursor-pointer py-0.5 text-white font-semibold'>Rejected</span>
                                        </td>
                                        :
                                        <td class="px-6 py-4 " onClick={()=>{
                                            handleUpdate(med , "rejected");
                                        }} >
                                            <span className='border border-purple-500 rounded-sm px-1 cursor-pointer py-0.5 text-purple-500 font-semibold'>Reject</span>
                                        </td>
                                    }
                                     <td class="px-6 py-4 "  >
                                            <span className='border border-purple-500 rounded-sm px-2 cursor-pointer py-0.5 text-purple-500 font-semibold'
                                            onClick={()=>{
                                                goToChat(med)
                                            }}
                                            >Chat</span>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                        :
                        <div className='text-3xl font-bold text-center h-[50vh] text-purple-800 flex flex-col justify-center items-center'>
                            <span>No Appointments Found</span>
                            {/* <Link to={'/admin/create-medicine'} className=' text-sm text-blue-600 mt-12 underline' > Add Medicine</Link> */}
                        </div>
                    }
                    
                </div>
            </div>
        </>
    )
}

export default DocAppointments