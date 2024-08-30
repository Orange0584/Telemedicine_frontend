import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination , Autoplay } from 'swiper/modules';
import images from '../assets/images/imagesExport';

let data = [
    images.slide1,
    images.slide2,
    images.slide3,
    images.slide4,
    images.slide5,
]
const Carousel = () => {
  return (
    <Swiper pagination={true} modules={[Pagination , Autoplay]} className="mySwiper"  autoplay={{delay: 2000,}} loop >
        {
            data?.map( (item, index) => {
                return(
                    <SwiperSlide key={item} >
                        <img src={item} alt="" />
                    </SwiperSlide>
                )
            })

        }
  </Swiper>
  )
}

export default Carousel