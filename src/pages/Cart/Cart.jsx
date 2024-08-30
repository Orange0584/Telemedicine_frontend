import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import apis from '../../apis';
import { getHeaders } from '../../headers';
import axios from 'axios';
import { BsCartXFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import { Box, Button, styled } from '@mui/material';
import { IoMdClose, IoMdCloudUpload } from 'react-icons/io';
import { CiImageOff } from 'react-icons/ci';


const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
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
const Cart = () => {
    const navigate = useNavigate();
    const userData = JSON.parse(Cookies.get('userData') || "");
    const headers = getHeaders();
    const [cart, setCart] = React.useState([]);
    const [total, setTotal] = useState(0);
    const [imageBase64, setImageBase64] = useState('');
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        if(cart?.length == 0) return toast.error("Cart is empty");
        setOpen(true)
    };
    const [loading , setLoading] = useState(false);
    const handleClose = () => {
        setOpen(false);
        setImageBase64('');
    };


    const getCart = () => {
        axios.post(apis.GETCART, { user_id: userData?.user_id }, { headers })
            .then((res) => {
                console.log(res.data);
                if (res?.status == 200) {
                    setCart(res?.data?.cart?.items);
                    let totalPrice = 0;
                    res?.data?.cart?.items?.forEach(item => {
                        totalPrice += (item.item_price * item.quantity);
                    })
                    setTotal(totalPrice)
                } else {
                    // toast.error('Your Cart is Empty');
                    setCart([])
                }
            }).catch(err => {
                // toast.error('Your Cart is Empty');
                setCart([])
            })
    }
    useEffect(() => {
        getCart();
    }, [])

    const handleCheckout = () => {
       if(cart?.length == 0) return toast.error("Cart is empty");
        axios.post(apis.CHECKOUT, { user_id: userData?.user_id }, { headers })
            .then((res) => {
                console.log("checkout", res)
                if (res?.status == 200) {
                    toast.success("Checkout Success");
                    navigate('/orders')
                    getCart();
                } else {
                    toast.error("Something went wrong");
                }
            })
    }

    const uploadBill = () => {
       if(cart?.length == 0) return toast.error("Cart is empty");
       if(!imageBase64) return toast.error("Please upload prescription first");
        setLoading(true)
        axios.post(apis.UPLOAD_BILL, {
            patient_id: userData?.user_id,
            bill: imageBase64,
        }, { headers }).then((res) => {
            console.log(res.data);
            setOpen(false);
            toast.success("Prescription uploaded successfully")
            setLoading(false);
        }).catch((e)=>{
            setLoading(false);
            toast.error('Failed to upload bill');
        })
    }

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageBase64(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="  min-h-screen  flex flex-col pt-[80px]">
            <div className="  text-primary-foreground py-4 px-6">
                {cart?.length > 0 && <h1 className="text-2xl font-semibold">Your Cart</h1>}
            </div>
            <main className="flex-1 p-4">
                {cart?.length > 0 ?
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {
                            cart?.map((item, index) => {
                                return (
                                    <div key={item?.item_id} className="bg-card p-4 rounded-lg flex items-center shadow-md" onClick={()=>{navigate(`/singleproduct/${item?.item_id}`)}} style={{cursor:'pointer'}}>
                                        <img src={item?.image} alt="Product Image" className="w-20 h-20 rounded-lg mr-4" />
                                        <div>
                                            <h2 className="text-lg font-semibold">{item?.item_name}</h2>
                                            <p className="text-sm text-muted">{item?.item_description.slice(0, 50)}...</p>
                                            <p className="text-sm font-semibold">Qunatity:{item?.quantity}</p>
                                            <p className="text-sm font-semibold">Prize:${item?.item_price}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    :
                    <div className="text-center text-lg font-semibold flex flex-col gap-4 justify-center items-center py-4">
                        <BsCartXFill size={200} />
                        <p>Your Cart is Empty</p>
                    </div>
                }
            </main>
          {cart?.length > 0 &&  <footer className="bg-purple-600 text-white 0-foreground py-4 px-6">
                <div className="flex justify-between items-center">
                    <p className="text-lg">Total: ${total}</p>
                    {
                        imageBase64 ?
                            <button className="bg-white text-black font-semibold px-4 py-2 rounded-md"
                                onClick={handleCheckout}
                            >Checkout</button>
                            :
                            <button className="bg-white text-black font-semibold px-4 py-2 rounded-md"
                                onClick={handleOpen}
                            >Checkout</button>
                    }
                </div>
            </footer>}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='flex w-full justify-between items-center' >
                        <h5 className='text-lg font-semibold' >Upload Prescription</h5>
                        <IoMdClose size={20} onClick={handleClose} />
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
                            <VisuallyHiddenInput type="file" onChange={handleImageUpload} accept='image/*' />
                        </Button>
                    </div>
                    <div className="my-4">
                        {imageBase64 ?
                            <div className=" border rounded-md w-full h-28 flex justify-center items-center" >
                                <img src={imageBase64} alt="" className='max-w-full max-h-28' />
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
                            onClick={uploadBill}
                            disabled={loading}
                        >Submit</Button>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}



export default Cart