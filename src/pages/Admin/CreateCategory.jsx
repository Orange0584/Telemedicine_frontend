// src/CreateCategory.js
import React, { useEffect, useState } from 'react';
import AdminNav from '../../components/AdminComponents/AdminNav';
import toast from 'react-hot-toast';
import apis from '../../apis';
import axios from 'axios';
import {getHeaders} from "../../headers"
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
const CreateCategory = () => {
  const headers = getHeaders();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    quantity: '',
    expiration_date: "",
    amount: '',
    image: ""
  });
  const cookieValue2 = Cookies.get("isAdmin");
  const isAdmin = JSON.parse(cookieValue2 ? cookieValue2 : null)
  useEffect(() => {
    if (!isAdmin) {
      navigate('/')
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({...formData , image: reader.result});
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    if(!formData?.image){
        toast.error("All fields are required")
        return;
    }
    axios.post(apis.MEDICINES,formData ,{headers})
    .then(response=>{
        console.log("create" , response);
        if(response.status == 401){
            toast.error("Token xpired login again")
        }
    })

  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 pt-[80px]">
        <AdminNav />
      <form onSubmit={handleSubmit} className="bg-white sm:pt-0 pt-10 p-6 rounded shadow-md w-full max-w-lg">
       <span className='text-red-500' > PAGE IN DEVELOPMENT</span>
        <h2 className="text-2xl font-bold mb-4">Add Category</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
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
          <label className="block text-gray-700 mb-2" htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        {/* <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div> */}
       {/* <div className="flex items-center justify-between">
       <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
       </div> */}
        {/* <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="expiration_date">Expiration Date</label>
          <input
            type="date"
            id="expiration_date"
            name="expiration_date"
            value={formData.expiration_date}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div> */}
        
        <div className="mb-4">
        <span className="block text-gray-700 mb-2">Upload Image</span>
        <input
        type="file"
        id="imageUpload"
        name='image'
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
      <label
        htmlFor="imageUpload"
        className="cursor-pointer bg-[#5e2dc1] text-white p-2 rounded w-full"
      >
        Upload Image
      </label>
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

export default CreateCategory;
