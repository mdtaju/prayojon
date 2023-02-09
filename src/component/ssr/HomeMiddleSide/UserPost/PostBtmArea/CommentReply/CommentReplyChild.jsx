import { Avatar } from '@mui/material';
import React from 'react';

const CommentReplyChild = ({ name, comment }) => {
      return (
            <div className='flex items-start gap-2 relative'>
                  <div className='absolute top-[-35px] left-[-31px] w-[25px] h-[50px] border-l border-b border-gray-200 rounded-bl-xl z-0'></div>
                  <div>
                        <Avatar
                              alt="Remy Sharp"
                              //   src="/static/images/avatar/1.jpg"
                              sx={{ width: 28, height: 28 }}
                        />
                  </div>
                  <div className='p-3 rounded-lg bg-gray-100 w-fit flex flex-col gap-1'>
                        <p className='font-medium text-base text-gray-800 leading-[1.2222]'>{name}</p>
                        <p className='text-[.9375rem] leading-[1.3333] font-normal text-gray-900'>{comment}</p>
                  </div>
            </div>
      );
};

export default CommentReplyChild;