import { faHeart, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const LikeAction = () => {
      return (
            <>
                  <div className='absolute invisible transform transition-all duration-250 -top-[40px] left-[50%] group-hover:visible group-hover:-translate-y-[5px] -translate-x-[50%] bg-gray-50 border border-gray-300 rounded-full py-2 px-6 flex items-center gap-3 cursor-pointer z-20'>
                        <div>
                              <FontAwesomeIcon
                                    className='post_icon text-2xl hover:scale-125 transition-all duration-150 text-primary'
                                    icon={faThumbsUp}
                              />
                        </div>
                        <div>
                              <FontAwesomeIcon
                                    className='post_icon text-2xl hover:scale-125 transition-all duration-150 text-red-600'
                                    icon={faHeart}
                              />
                        </div>
                        <div>
                              <FontAwesomeIcon
                                    className='post_icon text-2xl hover:scale-125 transition-all duration-150 text-primary'
                                    icon={faThumbsDown}
                              />
                        </div>
                  </div>
            </>
      );
};

export default LikeAction;