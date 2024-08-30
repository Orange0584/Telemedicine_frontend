import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { medicines } from '../../static'
import ProductCard from './ProductCard'
import { Pagination } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/pagination';

const ProductsSlider = () => {
  const [products, setProducts] = useState([...medicines])
  return (
    <Swiper
      slidesPerView={4}
      spaceBetween={20}
      modules={[]}
      style={{
        width: '100%',
        height: 'max-content',
        backgroundColor: "white"
      }}
    >
      {
        products?.map((item, index) => {
          return (
            <SwiperSlide style={{
              width: '100%',
              height: 'max-content',
            }} key={item?.name} >
              <ProductCard product={item} />
            </SwiperSlide>
          )
        })

      }
    </Swiper>
  )
}

export default ProductsSlider