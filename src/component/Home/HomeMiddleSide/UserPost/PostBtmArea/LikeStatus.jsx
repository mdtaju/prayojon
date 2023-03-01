import { faHeart, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const LikeStatus = () => {
      return (
            <div className='flex place-items-center'>
                  <div className='w-[22px] h-[22px] border border-gray-300 p-[2px] bg-white rounded-full grid place-items-center z-10'>
                        <FontAwesomeIcon
                              icon={faThumbsUp}
                              className="text-primary text-sm"
                        />
                  </div>

                  <div className='w-[22px] h-[22px] border border-gray-300 p-[2px] bg-white rounded-full grid place-items-center -ml-[4px] z-[5]'>
                        <FontAwesomeIcon
                              icon={faThumbsDown}
                              className="text-primary text-sm"
                        />
                  </div>

                  <div className='w-[22px] h-[22px] border border-gray-300 p-[2px] bg-white rounded-full grid place-items-center -ml-[4px]'>
                        <FontAwesomeIcon
                              icon={faHeart}
                              className="text-red-600 text-sm"
                        />
                  </div>

            </div>
      );
};

export default LikeStatus;