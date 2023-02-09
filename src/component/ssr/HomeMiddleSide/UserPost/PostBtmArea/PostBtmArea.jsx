import dynamic from 'next/dynamic';
import React from 'react';
import PostBtmCommentParent from './PostBtmCommentParent';
import PostBtmStatusBar from './PostBtmStatusBar';
const PostBtmActionBar = dynamic(() => import('./PostBtmActionBar'), { ssr: false });
const PostBtmWriteComment = dynamic(() => import('./PostBtmWriteComment'), { ssr: false });

const PostBtmArea = () => {
      return (
            <div className='w-full px-4 border-t border-gray-300'>

                  {/* Like Comment Status component */}
                  <PostBtmStatusBar />

                  {/* Do Like Comment component */}
                  <PostBtmActionBar />

                  {/* Write comment component */}
                  <PostBtmWriteComment />

                  {/* Users comments component */}
                  <PostBtmCommentParent />

            </div>
      );
};

export default PostBtmArea;