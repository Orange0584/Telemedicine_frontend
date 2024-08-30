import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import SingleProduct from './pages/SingleProduct'
import Header from './components/Header'
import Category from './pages/category/Category'
import { Toaster } from 'react-hot-toast'
import AdminDashboard from './pages/Admin/AdminDashboard'
import CreateMed from './pages/Admin/CreateMed'
import CreateCategory from './pages/Admin/CreateCategory'
import AllMeds from './pages/Admin/AllMeds'
import AllDoctors from './pages/Admin/AllDoctors'
import Orders from './pages/Orders/Orders'
import Footer from './components/Footer'
import Appointment from './components/Appointment'
import BookAppointment from './pages/BookAppointment/BookAppointment'
import DocAppointments from './pages/DoctorAppointments/DocAppointments'
import UpdateAppointment from './pages/DoctorAppointments/UpdateAppointment'
import ChooseDoctor from './pages/BookAppointment/ChooseDoctor'
import Cookies from 'js-cookie'
import Riderect from './components/Riderect'
import PatientAppointments from './pages/BookAppointment/PatientAppointments'
import Chat from './pages/Chat/Chat'
import CreateDocProfile from './pages/Auth/CreateDocProfile'
function App() {
  const cookieValue = Cookies.get("isAdmin");
  const isAdmin = JSON.parse(cookieValue ? cookieValue : null)

  return (
    <>
    <BrowserRouter>
     <Header />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<Riderect />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/singleproduct/:p_id' element={<SingleProduct />} />
        <Route path='/category/:cat_name' element={<Category />} />
        <Route path='/select-doctor' element={<ChooseDoctor />} />
        <Route path='/verify-doctor-profile' element={<CreateDocProfile />} />
        <Route path='/book-appointment/:doc_id' element={<BookAppointment />} />
        <Route path='/appointments' element={<DocAppointments />} />
        <Route path='/update-appointment/:a_id' element={<UpdateAppointment />} />
        <Route path='/my-appointments' element={<PatientAppointments />} />
        <Route path='/chat/:receiver_id/:receiver_name/:room_id' element={<Chat />} />
        {/* ADMIN PAGES */}
   
       <>
        <Route path='/admin' element={<AdminDashboard />} />
        <Route path='/admin/doctors' element={<AllDoctors />} />
        <Route path='/admin/medicine' element={<AllMeds />} />
        <Route path='/admin/create-medicine' element={<CreateMed />} />
        <Route path='/admin/create-category' element={<CreateCategory />} />
       </>
        
      </Routes>
      {/* <Appointment /> */}
      <Footer />
      <Toaster position="top-center" reverseOrder={false} />
    </BrowserRouter>
    </>
  )
}

export default App
