import React from 'react';
import './RestaurantCard.css';
import { IMG_URL } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';

function RestaurantCard({items}) {
    const {avgRating, name, cloudinaryImageId, sla, cuisines, areaName, id} = items;
    const navigate = useNavigate();
  return (
    <>
        <div className="res-card w-[175px] lg:w-[240px] h-full flex flex-col bg-[#f0f0f0] p-2 rounded-xl hover:border hover:border-black hover: cursor-pointer" onClick={()=>{navigate(`restaurants/${id}`)}}>
            <img className='res-logo my-1 mx-auto w-[94%] h-[120px] lg:h-[160px] object-cover rounded-xl' src={IMG_URL+cloudinaryImageId} alt="" />
            <div className='res-card-content my-1 mx-auto w-[94%] flex flex-col gap-1'>
              <h3 className='text-lg font-semibold leading-5'>{name}</h3>
              <div className='flex items-center justify-between'>
                  <h4 className='font-semibold text-gray-600'>{avgRating} ⭐</h4>
                  <h4 className='text-red-500'>{sla.slaString}</h4>
              </div>
              <p className='leading-4 text-xs lg:text-sm'>{cuisines.join(", ")}</p>
              <h4 className='text-xs lg:text-sm font-semibold leading-4'>{areaName}</h4>
            </div>
        </div>
    </>
  )
}

//High Order Component
export const AdditionOfferRestaurantCard = (RestaurantCard)=>{
  return ({items})=>{
    return(
      <div className='relative w-[172px] lg:w-auto'>
        <label className='offer absolute top-[116px] lg:top-[144px] left-[15px] text-xs lg:text-lg font-bold lg:font-extrabold text-white z-[80] rounded-xl text-center w-[145px] lg:w-[210px]'>{items?.aggregatedDiscountInfoV3?.header} {items?.aggregatedDiscountInfoV3?.subHeader}</label>
        <RestaurantCard items={items}/>
      </div>
    )
  };
};

export default RestaurantCard