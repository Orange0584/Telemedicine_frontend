import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import apis from '../../apis';
import { getHeaders } from '../../headers';
import axios from 'axios';
import { BsCartXFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

function formatDate(dateString) {
    const date = new Date(dateString);

    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;

    const formattedDate = `${month}-${day}-${year} ${hours}:${minutes} ${ampm}`;

    return formattedDate;
}

const Orders = () => {
    const navigate = useNavigate();
    const userData = JSON.parse(Cookies.get('userData')|| "" );
    const headers = getHeaders();
    const [orders, setOrders] = React.useState([]);
    const [total, setTotal] = useState(0);
    const getOrders = () => {
        axios.post(`${apis.FETCHORDERS}`, { user_id: userData?.user_id }, { headers })
            .then((res) => {
                console.log("resssss", res.data);
                if (res?.status == 200) {
                    setOrders(res?.data?.orders);
                    let totalPrice = 0;
                    res?.data?.orders?.forEach(item => {
                        totalPrice += item.item_price;
                    })
                    setTotal(totalPrice)
                } else {
                    toast.error(`You don't have any orders`);
                    setOrders([])
                }
            }).catch(err => {
                toast.error(`You don't have any orders`);
                setOrders([])
            })
    }
    useEffect(() => {
        getOrders();
    }, [])

    return (
        <div className="  min-h-screen  flex flex-col pt-[80px]">
            <div className="  text-primary-foreground py-4 px-6">
             {orders?.length > 0 &&   <h1 className="text-2xl font-semibold">Your Orders</h1>}
            </div>
            <main className="flex-1 p-4">
              {orders?.length ?
                <div className="w-full">
                    {
                        orders?.map((item, index) => {
                            return (
                                <div className="w-full my-3 border-b py-3" key={index}>
                                    <h2 className='font-semibold text-lg' >{formatDate(item?.created_date)}</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {
                                        item?.items?.map((product, productIndex) => {
                                            return (
                                              <div
                                                key={product?.item_id}
                                                className="bg-card p-4 rounded-lg flex items-center shadow-md"
                                                onClick={() => {
                                                  navigate(
                                                    `/singleproduct/${product?.item_id}`
                                                  );
                                                }}
                                                style={{ cursor: "pointer" }}
                                              >
                                                <img
                                                  src={product?.image}
                                                  alt="Product Image"
                                                  className="w-20 h-20 rounded-lg mr-4"
                                                />
                                                <div>
                                                  <h2 className="text-lg font-semibold">
                                                    {product?.item_name}
                                                  </h2>
                                                  <p className="text-sm text-muted">
                                                    {product?.item_description.slice(
                                                      0,
                                                      46
                                                    )}
                                                    ...
                                                  </p>
                                                  <p className="text-sm font-semibold">
                                                    Quantity:{product?.quantity}
                                                  </p>
                                                  <p className="text-sm font-semibold">
                                                    Prize:${product?.item_price}
                                                  </p>
                                                </div>
                                              </div>
                                            );
                                        })
                                    }
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
                :
                <div className="text-center text-lg font-semibold flex flex-col gap-4 justify-center items-center py-4">
                    <BsCartXFill size={200} />
                    <p>There are No Orders</p>
                </div>}
            </main>
        </div>
    )
}

export default Orders