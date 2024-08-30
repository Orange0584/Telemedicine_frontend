import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import apis from '../apis';
import { getHeaders } from '../headers';
import { IoMdAdd } from 'react-icons/io';
import { FiMinus } from 'react-icons/fi';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

const SingleProduct = () => {
    const navigate = useNavigate();
    const userData = JSON.parse(Cookies.get('userData') || "")
    const [quantity , setQuantity] = useState(1)
    const {p_id} = useParams();
    const headers = getHeaders();
    const [product, setProduct] = React.useState({});
    useEffect(()=>{
        axios.get(`${apis.MEDICINES}${p_id}`,{headers})
        .then((res)=>{
            console.log("hola" , res)
            setProduct(res.data);
        })
    },[]);

    const handleQuantity = (e) => {
        if(e){
            setQuantity(quantity + 1)
        }else{
            setQuantity(quantity - 1)
        }
    }
    const addToCart = () => {
        let payload = {
            user_id:userData?.user_id,
            item_ids:[p_id],
            quantity:quantity
        }
        axios.post(`${apis.ADDTOCART}`,payload,{headers})
        .then((resp)=>{
            console.log("added to cart" , resp)
            if (resp?.status == 200) {
                toast.success(resp?.data?.message);
                navigate("/cart")
            } else {
                toast.error(resp?.data?.message);
                
            }
        })
    }


    return (
        <main className="bg-background text-foreground min-h-[60vh] mt-[100px] flex items-center justify-center">
            <div className="max-w-4xl  shadow-xl  w-full mx-6 p-6 bg-card text-card-foreground rounded-lg flex flex-col md:flex-row">
                <div className="md:w-1/2 rounded-tl-lg rounded-bl-lg">
                    <img src={product?.image} alt="Single Product" className="w-full h-auto object-cover rounded-lg" />
                </div>
                <div className="md:w-1/2 md:pl-6 mt-6 md:mt-0 rounded-tr-lg rounded-br-lg ">
                    <h1 className="text-3xl font-bold text-primary mt-2">{product?.name}</h1>
                    <p className="text-lg font-bold text-primary mt-2">${product?.amount}</p>
                    {/* <p className="text-sm text-muted mt-2">Stock Left: 5</p> */}
                    <p className="text-sm mt-4">{product?.description}</p>
                    <div className="w-min mt-3 mb-1 select-none flex justify-center items-center gap-3 shadow-sm border rounded-md">
                    <span onClick={(e)=>{
                           if(quantity > 1) handleQuantity(false)
                            }} id="minus" className='border-r cursor-pointer px-1' ><FiMinus /></span>
                        <span>{quantity}</span>
                        <span onClick={(e)=>{
                           if(quantity < product?.quantity) handleQuantity(true)
                            }} id="add" className='border-l cursor-pointer px-1' ><IoMdAdd /></span>
                        
                    </div>
                    <button className="text-white font-semibold  bg-[#33186B] rounded-lg hover:bg-[#33186B]/70 px-4 py-2  mt-4 focus:outline-none"
                    onClick={addToCart}
                    >Add to Cart</button>
                </div>
            </div>
        </main>
    )
}

export default SingleProduct