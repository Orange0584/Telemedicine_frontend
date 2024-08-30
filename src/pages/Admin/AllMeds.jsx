import React, { useEffect, useState } from 'react'
import AdminNav from '../../components/AdminComponents/AdminNav'
import axios from 'axios'
import apis from '../../apis'
import { getHeaders } from '../../headers'
import { Link, useNavigate } from 'react-router-dom'
import { Box, Button, Modal, styled } from '@mui/material'
import { IoMdClose, IoMdCloudUpload } from 'react-icons/io'
import { CiImageOff } from 'react-icons/ci'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie'

const VisuallyHiddenInput = styled('input')({
    // clip: 'rect(0 0 0 0)',
    // clipPath: 'inset(100%)',
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    top: 0,
    right: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

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
const AllMeds = () => {
    const headers = getHeaders();
    const navigate = useNavigate();
    const [meds, setMeds] = React.useState([])
    const [selected, setSelected] = useState(null)
    const [form, setForm] = useState({
        name: "",
        description: "",
        category: "",
        quantity: '',
        expiration_date: "",
        amount: '',
        image: ""
    });
    const [open, setOpen] = React.useState(false);
    const cookieValue2 = Cookies.get("isAdmin");
    const isAdmin = JSON.parse(cookieValue2 ? cookieValue2 : null)
    useEffect(() => {
      if (!isAdmin) {
        navigate('/')
      }
    }, [])
    const handleOpen = (item) => {
        setOpen(true)
        setForm(item);
    };
    const [loading, setLoading] = useState(false);
    const handleClose = () => {
        setOpen(false);
        setSelected(null);
        setLoading(false)
    };
    useEffect(() => {
        axios.get(apis.MEDICINES, { headers })
            .then((response) => {
                console.log("allmeds", response);
                setMeds(response.data);
            })
    }, [])

    const handleDelete = (id) => {
        setLoading(true);
        axios.delete(`${apis.MEDICINES}${id}`, { headers })
            .then((response) => {
                console.log("allmeds", response);
                axios.get(apis.MEDICINES, { headers })
                    .then((response) => {
                        console.log("allmeds", response);
                        setMeds(response.data);
                        setLoading(false);
                    })
            }).catch((e)=>{
                setLoading(false);
                toast.error("Failed to delete")
            })
    }
    const handleUpdate = () => {
        setLoading(true)
        if (form?.image.includes('http')) delete form?.image;
        axios.put(`${apis.MEDICINES}${form?._id}/`, form, { headers })
            .then((response) => {
                handleClose();
                setLoading(false);
                // fetch meds again
                axios.get(apis.MEDICINES, { headers })
                    .then((response) => {
                        console.log("allmeds", response);
                        setMeds(response.data);
                    })
            })
            .catch((e) => {
                setLoading(false);
                toast.error(e?.response?.data?.message || "something went wrong")
            })
    }


    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setForm({ ...form, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };
    const handleCategory = (e) => {
        setForm({ ...form, category: e.target.value });
    }

    return (
        <>
            <AdminNav />

            <div className="w-full h-full min-h-[60vh] flex justify-center mt-28">
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-[90%] ">
                    <h2 className='text-3xl font-bold text-center my-5' >Medicines</h2>
                    {meds?.length > 0 ? <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                            <tr>
                                <th scope="col" class="px-6 py-3 text-lg">
                                    Name
                                </th>
                                <th scope="col" class="px-6 py-3 text-lg">
                                    Category
                                </th>
                                <th scope="col" class="px-6 py-3 text-lg">
                                    Expiration
                                </th>
                                <th scope="col" class="px-6 py-3 text-lg">
                                    Price
                                </th>
                                <th scope="col" class="px-6 py-3 text-lg">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {meds.map((med) => {
                                return (
                                    <tr key={med?._id} class="odd:bg-white  even:bg-gray-50  border-b ">
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                            {med?.name}
                                        </th>
                                        <td class="px-6 py-4">
                                            {med?.category}
                                        </td>
                                        <td class="px-6 py-4">
                                            {med?.expiration_date}
                                        </td>
                                        <td class="px-6 py-4">
                                            {med?.amount}
                                        </td>
                                        {/* <td class="px-6 py-4">
                                        <Link to={`/admin/update-medicine/${med?._id}`} className=' text-sm text-blue-600 mt-12 underline' >Edit</Link>
                                        </td> */}
                                        <td class="px-6 py-4"  >
                                            <span className='border border-purple-500 rounded-sm px-2 cursor-pointer py-0.5 text-purple-500 font-semibold' onClick={() => handleOpen(med)} >

                                                Edit
                                            </span>
                                            <span className='border ms-5 border-purple-500 rounded-sm px-2 cursor-pointer py-0.5 text-purple-500 font-semibold'onClick={() => handleDelete(med?._id)} >
                                                Delete
                                            </span>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                        :
                        <div className='text-3xl font-bold text-center h-40 flex flex-col justify-center items-center'>
                            <span>No medicines found</span>
                            <Link to={'/admin/create-medicine'} className=' text-sm text-blue-600 mt-12 underline' > Add Medicine</Link>
                        </div>
                    }
                    <Link className="absolute top-3 right-1 bg-purple-600 text-white font-semibold px-4 py-2 rounded-md"
                        to={`/admin/create-medicine`}
                    >Create</Link>
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
                        <h5 className='text-lg font-semibold' >Update Medicine</h5>
                        <IoMdClose size={20} onClick={handleClose} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={form.name}
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
                            value={form.description}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="category">Category</label>
                        <select id="countries" class="bg-transparent border border-black/40 text-gray-900 text-sm rounded-lg mb-4 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                            value={form?.category}
                            onChange={(e) => {
                                handleCategory(e)
                            }}
                        >
                            <option selected>Select Category</option>
                            <option value="medicine">Medicine</option>
                            <option value="equipment">Equipment</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="quantity">Quantity</label>
                            <input
                                type="number"
                                id="quantity"
                                name="quantity"
                                value={form.quantity}
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
                                value={form.amount}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="expiration_date">Expiration Date</label>
                        <input
                            type="date"
                            id="expiration_date"
                            name="expiration_date"
                            value={form.expiration_date}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className='my-4' >
                        <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<IoMdCloudUpload />}
                            sx={{
                                backgroundColor: "#9333ea"
                            }}
                        >
                            Upload image
                            <VisuallyHiddenInput type="file" id='file' name='file' onChange={handleImageUpload} accept='image/*' />
                        </Button>
                    </div>
                    <div className="my-4">
                        {form?.image ?
                            <div className=" border rounded-md w-full h-28 flex justify-center items-center" >
                                <img src={form?.image} alt="" className='max-w-full max-h-28' />
                            </div>
                            :
                            <div className="bg-neutral-500 border rounded-md w-full h-28 flex justify-center items-center">
                                <CiImageOff size={55} />
                            </div>
                        }
                    </div>
                    <div className="mt-6 mb-2 text-end">
                        <Button variant="contained"
                            sx={{
                                backgroundColor: "#9333ea"
                            }}
                            onClick={handleUpdate}
                            disabled={loading}
                        >Submit</Button>
                    </div>
                </Box>
            </Modal>

        </>
    )
}

export default AllMeds