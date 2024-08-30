import React from 'react'
import images from '../assets/images/imagesExport'

const Adverts = () => {
    return (
       <div className="w-full flex items-center justify-evenly flex-wrap gap-4">
         <div class="flex flex-col items-center bg-gradient-to-l from-purple-500 via-purple-600 to-purple-700 border border-gray-200 rounded-lg overflow-hidden shadow md:flex-row md:max-w-xl hover:bg-gray-100 h-min">
            <img class="object-cover  w-full md:w-48 h-60  " src={images.advert1} alt="" />
            <div class="flex flex-col justify-between p-4 leading-normal">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-white ">Tested by World's No.1 Lab Techinicians</h5>
                <p class="mb-3 font-normal text-white">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
            </div>
        </div>
         <div class="flex flex-col items-center bg-gradient-to-l from-purple-500 via-purple-600 to-purple-700 border border-gray-200 rounded-lg overflow-hidden shadow md:flex-row md:max-w-xl hover:bg-gray-100 h-min">
            <img class="object-cover w-full md:w-48  h-60  " src={images.slide1} alt="" />
            <div class="flex flex-col justify-between p-4 leading-normal">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-white ">Most Trusted Medication website</h5>
                <p class="mb-3 font-normal text-white">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
            </div>
        </div>
         <div class=" hidden xl:flex flex-col items-center bg-gradient-to-l from-purple-500 via-purple-600 to-purple-700 border border-gray-200 rounded-lg overflow-hidden shadow md:flex-row md:max-w-xl hover:bg-gray-100 h-min">
            <img class="object-cover w-full md:w-48  h-60  " src={images.slide3} alt="" />
            <div class="flex flex-col justify-between p-4 leading-normal">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-white ">Get Medicines at your doorstep</h5>
                <p class="mb-3 font-normal text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque iure ipsam doloremque nisi nam exercitationem autem vitae distinctio quod iusto eos omnis natus recusandae, hic temporibus nulla maiores ipsum facere.</p>
            </div>
        </div>
       </div>
    )
}

export default Adverts