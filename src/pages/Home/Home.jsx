import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Carousel from '../../components/Carousel';
import ProductCard from '../../components/ProductCard';
import Adverts from '../../components/Adverts';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import apis from '../../apis';
import axios from 'axios';
import { getHeaders } from "../../headers";
import Footer from '../../components/Footer';
import { TbError404 } from 'react-icons/tb';

let categories = [
  {
    img: "https://placehold.co/50x50/9062ee/FFFFFF?text=M",
    name: "Medicine"
  },
  {
    img: "https://placehold.co/50x50/9062ee/FFFFFF?text=E",
    name: "Equipments"
  },
  {
    img: "https://placehold.co/50x50/9062ee/FFFFFF?text=O",
    name: "Others"
  },
];

const Home = () => {
  const headers = getHeaders();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    axios.get(`${apis.SEARCH_MEDICINES}`, { headers, params: { q: searchQuery } })
      .then(response => {
        console.log(response);
        setProducts(response?.data?.medicines);
      })
      .catch(error => {
        console.error('Error fetching search results:', error);
      });
  };

  useEffect(() => {
   if(searchQuery == ""){
    axios.get(apis.MEDICINES, { headers })
    .then((response) => {
      console.log(response);
      setProducts(response?.data);
    })
    .catch(error => {
      console.error('Error fetching medicines:', error);
    });
   }
  }, [searchQuery]);

  useEffect(() => {
    if (!Cookies.get("userToken")) {
      navigate("/login");
    }
  }, []);

  const catClick = (item) => {
    navigate(`/category/${item.name}`);
  };

  return (
    <>
      <div className='mt-[72px] z-10 relative overflow-x-hidden'>
        <Carousel />
      </div>
      <section className='w-full h-full'>
        <div className="categories w-full flex justify-evenly items-center my-4 overflow-x-scroll gap-8 select-none">
          {categories.map((cat, index) => (
            <div className="flex flex-col justify-between items-center" key={index} onClick={() => {
              catClick(cat);
            }}>
              <img src={cat?.img} alt="" className='rounded-full' />
              <span className='text-xs'>{cat?.name}</span>
            </div>
          ))}
        </div>
        {/* Add filter here */}
        <div className="relative mt-10 mb-5 md:mx-auto w-full md:w-[500px] ">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>

          <input type="text" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 " placeholder="Search Your Medicine"
            value={searchQuery}
            autoComplete='off'
            onChange={(event) => {
              const query = event.target.value.toLowerCase();
              setSearchQuery(query);
            }}
          />
          <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-[#33186B] hover:bg-[#33186B]/60 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
            onClick={handleSearch}
          >Search</button>
        </div>
        <div className="w-full h-full mt-5 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center p-2">
          {products?.length ? products?.map((item, i) => (
            <ProductCard product={item} key={i} />
          )) :
          <div className="w-full col-span-4 h-full flex flex-col justify-center items-center p-4 mt-8">
          <TbError404 size={200} />
          <h2 className="font-semibold text-center text-[30px]">No products found</h2>
          </div>
          }
        </div>
        {/* {!searchQuery && <Adverts />} */}
        {/* <div className="w-full h-full mt-5 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center p-2">
          {products?.slice(4, 8)?.map((item, i) => (
            <ProductCard product={item} key={i} />
          ))}
        </div> */}
      </section>
    </>
  );
};

export default Home;
