import { faComment, faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const PostBtmStatusBar = () => {
      return (
            <div className='w-full flex items-center justify-between px-1 py-2'>
                  <div>
                        <FontAwesomeIcon
                              className='post_icon'
                              icon={faThumbsUp}
                        />
                        <span className='text-base font-bold text-gray-600 ml-2'>12</span>
                  </div>
                  <div>
                        <span className='text-base font-bold text-gray-600 mr-2'>5</span>
                        <FontAwesomeIcon
                              className='post_icon'
                              icon={faComment}
                        />
                  </div>
            </div>
      );
};

export default PostBtmStatusBar;