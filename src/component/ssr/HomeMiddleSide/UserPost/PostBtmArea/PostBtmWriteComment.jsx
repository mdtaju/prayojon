import { Avatar } from '@mui/material';
import React from 'react';

const PostBtmWriteComment = () => {
      return (
            <div className='flex items-center gap-2 px-1 py-2'>
                  <div>
                        <Avatar
                              alt="Remy Sharp"
                              //   src="/static/images/avatar/1.jpg"
                              sx={{ width: 36, height: 36 }}
                        />
                  </div>
                  <input
                        type={"text"}
                        className='py-2 px-3 rounded-full bg-gray-100 w-full outline-none'
                        style={{ resize: 'none' }}
                        placeholder={"Write a comment..."}
                  />

                  {/* <p className='font-bold text-base text-gray-500'></p> */}
            </div>
      );
};

export default PostBtmWriteComment;