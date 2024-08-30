import React from 'react'
import { useNavigate } from 'react-router-dom'

const ProductCard = ({ product }) => {
  const navigate = useNavigate()
  return (
    <div className="w-full max-w-[250px] md:max-w-[340px] xl:max-w-[380px] bg-white border border-gray-200 rounded-lg shadow-md my-3 flex flex-col justify-between  ">
     <div>
     <div className='max-h-[200px] overflow-hidden'>
        <img className="rounded-t-lg w-full" src={product?.image} alt="" loading="lazy" />
      </div>
      <div className=" p-2 sm:p-5">
        <div className="mb-2 flex justify-between items-center text-md sm:text-xl">
          <h5 className="font-bold tracking-tight text-gray-900 truncate">{product?.name}</h5>
          <span className="font-semibold text-purple-500/80">${product?.amount}</span>
        </div>
        <p className="mb-3 font-normal text-gray-700 truncate sm:overflow-visible sm:whitespace-normal">{product?.description?.substr(0, 40)}</p>
      </div>
     </div>
      <div className="w-full flex justify-end items-end px-2 pb-2">
        <div
          onClick={() => {
            navigate(`/singleproduct/${product?._id}`)
          }}
          className="inline-flex items-center px-3 py-1 sm:py-2 text-sm font-medium text-white bg-[#33186B] rounded-lg hover:bg-[#33186B]/70  focus:outline-none text-end cursor-pointer"
        >
          Buy
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default ProductCard