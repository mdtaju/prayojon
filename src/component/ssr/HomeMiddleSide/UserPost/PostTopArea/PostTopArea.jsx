import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar } from '@mui/material';
import React from 'react';

const PostTopArea = () => {
  return (
    // in this component. there are two part here. one is header and another is post description 
    <div className='w-full px-4'>
      {/* post header */}
      <div className='w-full flex items-center justify-between'>
        <div className='flex gap-3'>
          <Avatar
            alt="Remy Sharp"
            //   src="/static/images/avatar/1.jpg"
            sx={{ width: 40, height: 40 }}
          />
          <div className='flex flex-col'>
            <div><h1 className='text-base text-gray-800 font-semibold'>Korimullah</h1></div>
            <div><p className='text-xs font-semibold text-gray-500'>5h</p></div>
          </div>
        </div>
        <div className='p-1 cursor-pointer'>
          <FontAwesomeIcon
            className='text-2xl text-gray-500'
            icon={faEllipsis}
          />
        </div>
      </div>


      {/* post description */}
      <div className='py-2'>
        <p className='text-[.9375rem] leading-[1.3333] font-normal text-gray-900'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ullam ipsam, temporibus soluta reiciendis, vitae sed, illo tempora voluptate dignissimos nostrum harum dolore labore recusandae. Aliquam corrupti placeat similique doloribus.</p>
      </div>
    </div>
  );
};

export default PostTopArea;