import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { medicines } from '../../../static';
import ProductCard from '../../components/ProductCard';
import axios from 'axios';
import apis from '../../apis';
import { getHeaders } from '../../headers';
import toast from 'react-hot-toast';
import { TbError404 } from 'react-icons/tb';

const Category = () => {
    const headers = getHeaders();
    const {cat_name} = useParams();
    const location = useLocation();
    const [products, setProducts] = useState([]);

    const fetchCatProducts = ()=>{
        axios.get(apis.CATEGORYFILTER + cat_name.toLowerCase() , {headers})
        .then((res)=>{
            console.log("cat",res);
            setProducts(res?.data)
        }).catch((err)=>{
            console.warn("error" , err);
            toast.error("Something went wrong")
        })
    }

    useEffect(()=>{
        fetchCatProducts();
    },[])

    return (
        <>
        {/* <div className='mt-[120px] text-center ' >Medecines for</div> */}
        <h2 className='mx-auto text-[40px] font-semibold text-center border-b mt-[120px] ' >{cat_name}</h2>
        <div className="w-full h-full  grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center p-2 mt-8">
            {products?.length > 0 ? products?.map((item, i) => (
                    <ProductCard product={item} key={i} />
                ))
            :
            <div className="w-full col-span-4 h-full flex flex-col justify-center items-center p-4 mt-8">
                <TbError404 size={200} />
                <h2 className="font-semibold text-center text-[30px]">No products found</h2>
                </div>
            }
        </div>
        </>
    )
}

export default Category