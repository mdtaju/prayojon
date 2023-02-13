import { Avatar } from '@mui/material';
import React from 'react';

const NotificationChild = () => {
      return (
            <div className='flex items-start gap-4'>
                  <Avatar
                        alt="Remy Sharp"
                        //   src="/static/images/avatar/1.jpg"
                        sx={{ width: 40, height: 40 }}
                  />
                  <div >
                        <div>
                              <p className='text-base text-gray-400 leading-3'><span className='text-lg font-semibold text-gray-900 mr-1'>Abdullah</span> sent you a friend request.</p>
                              <p className='text-sm text-gray-400 mt-1'>a day ago</p>
                              <p className='text-sm text-gray-400'>26 mutual friends</p>
                        </div>
                        <div className='flex items-center gap-2 mt-2'>
                              <button className='btn_primary'>Confirm</button>
                              <button className='btn_primary bg-gray-300 text-gray-900'>Delete</button>
                        </div>
                  </div>
            </div>
      );
};

export default NotificationChild;