import { Avatar } from '@mui/material';
import React from 'react';

const HomeRightContactSrtCutChild = () => {
      return (
            <div className='p-2 flex items-center gap-2 bg-transparent hover:bg-gray-300 rounded-md cursor-pointer transition-all duration-150'>
                  <Avatar
                        alt="Remy Sharp"
                        //   src="/static/images/avatar/1.jpg"
                        sx={{ width: 32, height: 32 }}
                  />
                  <span className='text-base text-gray-900 font-semibold'>Abdullah</span>
            </div>
      );
};

export default HomeRightContactSrtCutChild;