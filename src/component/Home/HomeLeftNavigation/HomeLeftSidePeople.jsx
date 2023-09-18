import { Avatar } from '@mui/material';
import React from 'react';

const HomeLeftSidePeople = ({ user = {} }) => {
      const { id, name, photo_url, profession, city } = user;

      const openProfileHandler = () => {
            window.open(`/profile/${id}`, "_blank");
      }
      return (
            <div className='flex items-start gap-4 bg-white p-3 rounded-md'>
                  <Avatar
                        alt="Remy Sharp"
                        src={photo_url}
                        sx={{ width: 40, height: 40 }}
                  />
                  <div className='flex flex-col'>
                        <div className='flex items-center justify-between mb-1'>
                              <span className='text-lg leading-3 font-semibold text-gray-900 mr-1'>{name}</span>
                              <span className='text-sm leading-3 text-gray-400 mt-1'>{city}</span>
                        </div>
                        <p className='text-sm font-semibold text-gray-800'>{profession}</p>
                        <div className='flex items-center gap-2 mt-2'>
                              <button onClick={openProfileHandler} className='btn_primary bg-transparent border border-primary text-primary px-2 py-1'>View</button>
                        </div>
                  </div>
            </div>
      );
};

export default HomeLeftSidePeople;