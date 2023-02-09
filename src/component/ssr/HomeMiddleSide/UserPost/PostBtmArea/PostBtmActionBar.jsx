import { faComment, faShareFromSquare, faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const PostBtmActionBar = () => {
      return (
            <div className='flex items-center justify-around sm:gap-2 px-1 py-1 border-y border-gray-300'>
                  <div className='px-2 sm:px-4 py-1 hover:bg-gray-200 rounded-md cursor-pointer'>
                        <FontAwesomeIcon
                              className='post_icon'
                              icon={faThumbsUp}
                        />
                        <span className='text-sm sm:text-base font-bold text-gray-600 ml-2'>Like</span>
                  </div>
                  <div className='px-2 sm:px-4 py-1 hover:bg-gray-200 rounded-md cursor-pointer'>
                        <FontAwesomeIcon
                              className='post_icon'
                              icon={faComment}
                        />
                        <span className='text-sm sm:text-base font-bold text-gray-600 ml-2'>Comment</span>
                  </div>
                  <div className='px-2 sm:px-4 py-1 hover:bg-gray-200 rounded-md cursor-pointer'>
                        <FontAwesomeIcon
                              className='post_icon'
                              icon={faShareFromSquare}
                        />
                        <span className='text-sm sm:text-base font-bold text-gray-600 ml-2'>Share</span>
                  </div>
            </div>
      );
};

export default PostBtmActionBar;