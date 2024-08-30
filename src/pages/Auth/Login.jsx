import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'; // Import icons
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import toast from 'react-hot-toast';
import { BiLoaderAlt } from 'react-icons/bi';

const Login = () => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const [showPassword, setShowPassword] = useState(false);
    const [loading , setLoading] = useState(false);

    const navigate = useNavigate();
    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const handleSignup = async (e) => {
        e.preventDefault();
        console.log("values", form)
        if (form?.email && form?.password) {
            setLoading(true);
            try {
                const response = await axios.post("http://127.0.0.1:8000/api/login/", {
                    "password": form?.password,
                    "email": form?.email,
                })
                if (response?.status === 200) {
                    if(form?.email == "admin@gmail.com"){
                        Cookies.set("isAdmin" , true)
                        console.log("admin logged in")
                    }else{
                        Cookies.set("isAdmin" , false)
                    }
                    console.log("login", response)
                    Cookies.set('userToken', response?.data?.access)
                    Cookies.set('userData', JSON.stringify(response?.data?.user))
                    // console.log('Login');
                    setLoading(false);
                    navigate('/')
                    toast.success("Login successfull");
                } else {
                    toast.error("Something went wrong");
                    setLoading(false);
                }
            } catch (error) {
                console.log(error);
                toast.error(error?.response?.data?.message)
                setLoading(false);
            }

        } else {
            console.log("error")
        }

    }

    return (
        <div className='flex justify-center items-center h-screen w-screen bg-purple-200'>
            <section className='max-w-[500px] px-2 py-10 md:px-10 md:shadow-lg rounded-lg md:bg-slate-50'>
                <div className='grid justify-center text-2xl font-bold'>TELEMEDICINE</div>
                <form autoComplete="off" onSubmit={handleSignup} >
                    <h1 className='text-[44px] font-semibold mt-10'>Login</h1>
                    <p className='text-[#969696] py-2'>Please login to continue to your account.</p>
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        className='my-3'
                        style={{ marginBottom: '15px' }}
                        InputProps={{
                            classes: {
                                focused: 'focus:border-green-500',
                            },
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '&:hover fieldset': {
                                    borderColor: '#7360DF',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#7360DF',
                                },
                                '&.Mui-focused label': {
                                    color: '#7360DF',
                                },
                            },
                        }}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}

                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        fullWidth
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleTogglePasswordVisibility}
                                        edge="end"
                                    >
                                        {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '&:hover fieldset': {
                                    borderColor: '#7360DF',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#7360DF',
                                },
                            },
                            marginBottom: 3,
                        }}
                        autoComplete="new-password"
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />

                    {/* <div className='py-4 flex'>
                        <input type="checkbox" className='w-4 h-6 accent-[#000000] cursor-pointer' />
                        <span className='ml-2'>Keep me logged in</span>
                    </div> */}

                    <button   className='bg-[#33186B] w-full text-white py-3 rounded'
                        type='submit'
                    >{loading? <BiLoaderAlt className="animate-spin mx-auto" size={20} /> : <span className='mx-auto' >Login</span>}</button>
                    <p className='text-black/60 mt-6 text-center' >Don't have an account? <span className='text-black font-semibold cursor-pointer'
                        onClick={() => {
                            navigate("/signup")
                        }}
                    >Signup</span></p>
                </form>
            </section>
        </div>
    );
};

export default Login;
