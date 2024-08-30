import React, { useEffect, useState } from 'react'
import AdminNav from '../../components/AdminComponents/AdminNav'
import axios from 'axios'
import apis from '../../apis'
import { getHeaders } from '../../headers'
import { Link, useNavigate } from 'react-router-dom'
import { Box, Button, Modal } from '@mui/material'
import { IoIosMore, IoMdClose } from 'react-icons/io'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 370,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    px: 4,
    py: 2,
};

const AllDoctors = () => {
    const headers = getHeaders();
    const navigate = useNavigate();
    const [selected , setSelected] = useState(null);
    const [docs, setDocs] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const cookieValue2 = Cookies.get("isAdmin");
    const isAdmin = JSON.parse(cookieValue2 ? cookieValue2 : null)
    useEffect(() => {
      if (!isAdmin) {
        navigate('/')
      }
    }, [])

    const handleOpen = () => {
        setOpen(true)
    };
    const [loading , setLoading] = useState(false);
    const handleClose = () => {
        setOpen(false);
        setSelected(null);
    };

    useEffect(() => {
        axios.get(apis.FETCHDOCS, { headers })
            .then((response) => {
                console.log("allmeds", response);
                setDocs(response.data);
            })
    }, [])


    const verifyDoc = (id) => {
        setLoading(true);
     axios.get(`${apis.VERIFY_DOC}${id}` , {headers}).then((res)=>{
         console.log(res);
         axios.get(apis.FETCHDOCS, { headers })
         .then((response) => {
            setLoading(false);
             console.log("allmeds", response);
             setDocs(response.data);
             toast.success("Doctor verified successfully")
             handleClose()
         }).catch((e)=>{
            setLoading(false);
            toast.error(e?.response?.data?.message || "something went wrong");
         })
     })
    }

    const fetchProfile = async(id , item)=>{
        axios.get(`${apis.FETCHDOCS}/${id}` , {headers})
        .then((res)=>{
            console.log("doc",res);
            setSelected(res?.data?.doctor);
            handleOpen();
        })
    }

    return (
        <>
            <AdminNav />
            <div className="w-full h-full min-h-[60vh] flex justify-center mt-28">
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-[90%]">
                    <h2 className='text-3xl font-bold text-center my-5' >Doctors</h2>
                    {docs?.length > 0 ? <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                            <tr>
                                <th scope="col" class="px-6 py-3 text-lg">
                                    Name
                                </th>
                                <th scope="col" class="px-6 py-3 text-lg">
                                    Email
                                </th>
                               
                                <th scope="col" class="px-6 py-3 text-lg">
                                    
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {docs.map((med) => {
                                return (
                                    <tr key={med?._id} class="odd:bg-white  even:bg-gray-50  border-b ">
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                           {med?.username}
                                        </th>
                                        <td class="px-6 py-4">
                                            {med?.email}
                                        </td>
                                        <td class="px-6 py-4">
                                       {med?.verified ?
                                       <span className='bg-purple-500 rounded-sm px-1  py-0.5 text-white font-semibold' >Verified</span>
                                       : <span className='border border-purple-500 rounded-sm px-2 cursor-pointer py-0.5 text-purple-500 font-semibold'
                                       onClick={()=>{
                                        fetchProfile(med?._id , med)
                                       }}
                                       >Verify</span>
                                       }
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                :
                <div className='text-3xl font-bold text-center h-40 flex flex-col justify-center items-center'>
                    <span>No Doctors found</span>
                    <Link to={'/admin'} className=' text-sm text-blue-600 mt-12 underline' > Home</Link>
                </div>
                }
                </div>
            </div>


 <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='flex w-full justify-between items-center' >
                        <h5 className='text-lg font-semibold' >Verify Doctor</h5>
                        <IoMdClose size={20} onClick={handleClose} />
                    </div>
                    <div className='my-4' >
                        <span>Name:</span>
                        <div className='border border-black rounded-md w-full px-2 py-2' >{selected?.name}</div>
                    </div>
                    <div className='my-4' >
                        <span>Age:</span>
                        <div className='border border-black rounded-md w-full px-2 py-2' >{selected?.age}</div>
                    </div>
                   {selected?.experience && <div className='my-4' >
                        <span>Experience:</span>
                        <div className='border border-black rounded-md w-full px-2 py-2' >{selected?.experience}</div>
                    </div>}
                    <div className='my-4' >
                        <span>Education:</span>
                        <div className='border border-black rounded-md w-full px-2 py-2' >{selected?.education}</div>
                    </div>
                    <div className='my-4' >
                        <span>Specialization:</span>
                        <div className='border border-black rounded-md w-full px-2 py-2' >{selected?.field}</div>
                    </div>
                    <div className='my-4' >
                        <span>Issuing Authority:</span>
                        <div className='border border-black rounded-md w-full px-2 py-2' >{selected?.issuing_authority}</div>
                    </div>
                    <div className='my-4' >
                        <span>Medical License Number:</span>
                        <div className='border border-black rounded-md w-full px-2 py-2' >{selected?.medical_license_number}</div>
                    </div>
                    <div className="mt-6 mb-2 text-end">
                        <Button variant="contained"
                            sx={{
                                backgroundColor: "#9333ea"  
                            }}
                            onClick={()=>verifyDoc(selected?.user_id)}
                            disabled={loading}
                        >{loading ? <IoIosMore />:"Verify" }</Button>
                    </div>
                </Box>
            </Modal>


            
        </>
    )
}

export default AllDoctors