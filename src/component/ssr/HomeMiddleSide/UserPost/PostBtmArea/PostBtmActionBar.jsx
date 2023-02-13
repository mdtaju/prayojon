import { faComment, faShareFromSquare, faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const PostBtmActionBar = () => {
      return (
            <div className='grid grid-cols-3 items-center sm:gap-2 py-1 border-y border-gray-300'>
                  <div className=' sm:px-4 py-1 hover:bg-gray-200 rounded-md cursor-pointer select-none'>
                        <div className='w-fit mx-auto'>
                              <FontAwesomeIcon
                                    className='post_icon'
                                    icon={faThumbsUp}
                              />
                              <span className='text-sm sm:text-base font-bold text-gray-600 ml-2'>Like</span>
                        </div>
                  </div>
                  <div className=' sm:px-4 py-1 hover:bg-gray-200 rounded-md cursor-pointer select-none'>
                        <div className='w-fit mx-auto'>
                              <FontAwesomeIcon
                                    className='post_icon'
                                    icon={faComment}
                              />
                              <span className='text-sm sm:text-base font-bold text-gray-600 ml-2'>Comment</span>
                        </div>
                  </div>
                  <div className=' sm:px-4 py-1 hover:bg-gray-200 rounded-md cursor-pointer select-none'>
                        <div className='w-fit mx-auto'>
                              <FontAwesomeIcon
                                    className='post_icon'
                                    icon={faShareFromSquare}
                              />
                              <span className='text-sm sm:text-base font-bold text-gray-600 ml-2'>Share</span>
                        </div>
                  </div>
            </div>
      );
};

export default PostBtmActionBar;