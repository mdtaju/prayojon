import { Avatar, Rating } from '@mui/material';
import React from 'react';

const HomeLeftSidePeople = ({ user = {} }) => {
      const { id, name, photo_url, profession, city, rating, sales } = user;

      const openProfileHandler = () => {
            window.open(`/profile/${id}`, "_blank");
      }
      return (
            <div className='flex items-start gap-4 common_shadow py-4 rounded-md'>
                  <Avatar
                        alt="Remy Sharp"
                        src={photo_url}
                        sx={{ width: 40, height: 40 }}
                  />
                  <div className='flex flex-col'>
                        <div className='flex items-start justify-between mb-1 w-full'>
                              <span className='text-lg leading-[20px] font-semibold text-gray-800 mr-1'>{name}</span>
                              <span className='text-sm text-gray-400 mt-1'>{city}</span>
                        </div>
                        <p className='text-sm font-semibold text-gray-800'>{profession}</p>
                        <div className='flex items-center gap-1'>
                              <Rating name="half-rating-read" value={rating} precision={0.5} readOnly size='small' />
                              <span className='text-xs font-semibold'>{`${sales} sales`}</span>
                        </div>
                        <div className='flex items-center gap-2 mt-2'>
                              <button onClick={openProfileHandler} className='btn_primary px-2 py-1'>View</button>
                        </div>
                  </div>
            </div>
      );
};

export default HomeLeftSidePeople;