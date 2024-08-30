// src/CreateDocProfile.js
import React, { useState } from 'react';
import AdminNav from '../../components/AdminComponents/AdminNav';
import toast from 'react-hot-toast';
import apis from '../../apis';
import axios from 'axios';
import {getHeaders} from "../../headers"
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const CreateDocProfile = () => {
  const headers = getHeaders();
  const cookieValue = Cookies.get('userData');
    const userData = cookieValue ? JSON.parse(cookieValue) : null;
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user_id: userData?.user_id,
    name: "",
    age: "",
    experience: "",
    medical_license_number: "",
    education: "",
    issuing_authority: "",
    field: "",
  });

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
   
    axios.post(apis.CREATE_DOC,formData ,{headers})
    .then(response=>{
        if(response.status == 401){
            toast.error("Token expired login again")
        }else{
            Cookies.remove("userToken");
            navigate("/login");
            toast.success("Doctor profile created successfully");
        }
    }).catch((error)=>{
        toast.error("Failed to create doctor profile");
    })
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 pt-[80px]">
      <AdminNav />
      <form
        onSubmit={handleSubmit}
        className="bg-white sm:pt-0 pt-10 p-6 rounded shadow-md w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold my-4">Add Profile Information</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">
            Age
          </label>
          <input
            type="text"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">
            Experience
          </label>
          <input
            type="text"
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">
            Education
          </label>
          <input
            type="text"
            id="education"
            name="education"
            value={formData.education}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">
            Specialization
          </label>
          <input
            type="text"
            id="field"
            name="field"
            value={formData.field}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">
            Issuing Authority
          </label>
          <input
            type="text"
            id="issuing_authority"
            name="issuing_authority"
            value={formData.issuing_authority}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">
            Medical license number
          </label>
          <input
            type="text"
            id="medical_license_number"
            name="medical_license_number"
            value={formData.medical_license_number}
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

export default CreateDocProfile;
