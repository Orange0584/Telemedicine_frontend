import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'; // Import icons
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios'
import toast from 'react-hot-toast';
import { BiLoaderAlt } from 'react-icons/bi';


const SignUp = () => {
    const [form, setForm] = useState({
        email: '',
        password: '',
        username: '',
        role:"",
        age:'',
        gender:'',
    })
    const [showPassword, setShowPassword] = useState(false);
    const [loading , setLoading] = useState(false)
    const navigate = useNavigate();
    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const handleSignup = async (e) => {
        e.preventDefault();
        console.log("values" , form)
        try {
            if(form?.email && form?.password && form?.username && form?.role){
                setLoading(true);
                const response = await axios.post("http://127.0.0.1:8000/api/signup/", {
                    "username": form?.username,
                    "password": form?.password,
                    "email": form?.email,
                    "role": form?.role,
                    "age":form?.age,
                    "gender":form?.gender,
                })
                if(response?.status === 201){
                    console.log("signup", response)
                    Cookies.set('userToken', response?.data?.access)
                    Cookies.set('userData', JSON.stringify(response?.data?.data))
                    if(response?.data?.data?.role == "doctor"){
                        navigate('/verify-doctor-profile');
                    }else{
                        navigate('/login');
                    }
                    setLoading(false);
                    toast.success("Signup successfull");
                }else{
                    toast.error("Something went wrong");
                    setLoading(false);
                }
                setLoading(false);
            }else{
                console.log("error")
                toast.error("All fields required")
            }
        } catch (error) {
            toast.error(error?.response?.data?.message)
                    setLoading(false);
        }
    }

    const handleRole = (e) => {
        console.log(e.target.value)
        setForm({ ...form, role: e.target.value });
    }

    const handleGender = (e) => {
      console.log(e.target.value);
      setForm({ ...form, gender: e.target.value });
    };

    return (
      <div className="flex justify-center items-center h-screen w-screen bg-purple-200">
        <section className="max-w-[500px]  px-2 py-10 md:px-10   md:shadow-lg rounded-lg md:bg-slate-50">
          <div className="grid justify-center text-2xl font-bold">
            TELEMEDICINE
          </div>
          <form autoComplete="off" onSubmit={handleSignup}>
            <h1 className="text-[44px] font-semibold mt-10">Sign Up</h1>
            <p className="text-[#969696] py-2">
              Please signup to continue to your account.
            </p>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              className="my-3"
              style={{ marginBottom: "15px" }}
              InputProps={{
                classes: {
                  focused: "focus:border-green-500",
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#7360DF",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#7360DF",
                  },
                },
              }}
              autoComplete="off"
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              className="my-3"
              style={{ marginBottom: "15px" }}
              InputProps={{
                classes: {
                  focused: "focus:border-green-500",
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#7360DF",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#7360DF",
                  },
                },
              }}
              autoComplete="off"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              type={showPassword ? "text" : "password"}
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
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#7360DF",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#7360DF",
                  },
                },
                marginBottom: 3,
              }}
              autoComplete="new-password" // Disable autocomplete
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <TextField
              label="Age"
              variant="outlined"
              fullWidth
              className="my-3"
              style={{ marginBottom: "15px" }}
              InputProps={{
                classes: {
                  focused: "focus:border-green-500",
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#7360DF",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#7360DF",
                  },
                },
              }}
              autoComplete="off"
              onChange={(e) => setForm({ ...form, age: e.target.value })}
            />

            <select
              id="countries"
              class="bg-transparent border border-black/40 text-gray-900 text-sm rounded-lg mb-4 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
              value={form?.role}
              onChange={(e) => {
                handleRole(e);
              }}
            >
              <option selected>Select a Role</option>
              <option value="doctor">Doctor</option>
              <option value="user">Patient</option>
            </select>

            <select
              id="countries"
              class="bg-transparent border border-black/40 text-gray-900 text-sm rounded-lg mb-4 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
              value={form?.gender}
              onChange={(e) => {
                handleGender(e);
              }}
            >
              <option selected>Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <button
              className="bg-[#33186B] w-full text-white py-3 rounded text-center"
              type="submit"
            >
              {loading ? (
                <BiLoaderAlt className="animate-spin mx-auto" size={20} />
              ) : (
                <span className="mx-auto">Sign up</span>
              )}
            </button>

            <p className="text-black/60 mt-6 text-center">
              Already have an account?{" "}
              <span
                className="text-black font-semibold cursor-pointer"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </span>
            </p>
          </form>
        </section>
      </div>
    );
};

export default SignUp;
