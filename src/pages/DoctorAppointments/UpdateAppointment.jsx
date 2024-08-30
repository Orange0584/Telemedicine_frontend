import React, { useEffect, useState } from 'react';
import AdminNav from '../../components/AdminComponents/AdminNav';
import toast from 'react-hot-toast';
import apis from '../../apis';
import axios from 'axios';
import { getHeaders } from "../../headers"
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function convertToISOFormat(dateTimeStr) {
    const datePart = dateTimeStr.slice(0, 10);
    const timePart = dateTimeStr.slice(10, 15);
    
    const formattedStr = `${datePart}T${timePart}:00Z`;
        const date = new Date(formattedStr);
        return date.toISOString();
}

const UpdateAppointment = () => {
    const location = useLocation()
    const cookieValue = Cookies.get('userData');
    const userData = cookieValue ? JSON.parse(cookieValue) : null;
    const navigate = useNavigate()
    const [doctors , setDoctors] = useState([])
    const headers = getHeaders();
    const [formData, setFormData] = useState({
        user_id: userData?.user_id,
        time: "",
        date: "",
        doctor:"",
    });

    useEffect(()=>{
        axios.get(apis.FETCHDOCS,{headers})
        .then((res)=>{
            console.log(res.data)
            setDoctors(res?.data);
        })
    },[])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        axios.post(apis.REQUESTAPPONTMENT, {
            user_id: formData.user_id,
            appointment_time:convertToISOFormat(formData?.date + formData?.time),
            doctor_id:formData.doctor
        }, { headers })
            .then(response => {
                console.log("create", response);
                if (response.status == 401) {
                    toast.error("Token xpired login again")
                    navigate("/login")
                }
                if(response.status == 200){
                    toast.success("Appointment booked successfully")
                    navigate("/")
                }
            })

    };
    const handleDoc = (e) => {
        console.log(e.target.value)
        setFormData({ ...formData, doctor: e.target.value });
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 pt-[80px]">
            <AdminNav />
            <form onSubmit={handleSubmit} className="bg-white sm:pt-0 pt-10 p-6 rounded shadow-md w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-4">Update appointment</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="">Doctor</label>
                    <select disabled id="doctors" className="bg-transparent border border-black/40 text-gray-900 text-sm rounded-lg mb-4 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                        value={location?.state?.doctor_id || "null"}
                    >
                        <option value="null">Select Doctor</option>
                        {
                            doctors?.map((doc,i)=>{
                                return(
                                    <option key={i} value={doc?._id}>{doc?.username}</option>
                                )
                            })
                        }
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="time">Schedule Time</label>
                    <input
                        type="time"
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="date">Schedule Date</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-[#33186B] w-full text-white py-3 rounded text-center"
                >
                    Submit
                </button>
            </form>
        </div>
    );

};

export default UpdateAppointment;
