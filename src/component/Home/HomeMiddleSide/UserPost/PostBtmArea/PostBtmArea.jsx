import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import useWindowSize from '../../../../../hook/useWindowSize';
import PostBtmCommentParent from './PostBtmCommentParent';
import PostBtmStatusBar from './PostBtmStatusBar';
const PostBtmActionBar = dynamic(() => import('./PostBtmActionBar'), { ssr: false });
const PostBtmWriteComment = dynamic(() => import('./PostBtmWriteComment'), { ssr: false });

const PostBtmArea = () => {
      const [comment, setComment] = useState("");
      const [showReplyInput, setShowReplyInput] = useState(false);
      const windowSize = useWindowSize();
      return (
            <div className='w-full px-1 sm:px-4 border-t border-gray-300'>

                  {/* Like Comment Status component */}
                  <PostBtmStatusBar />

                  {/* Do Like Comment component */}
                  <PostBtmActionBar />

                  {/* Users comments component */}
                  <PostBtmCommentParent />

                  {/* Write comment component */}
                  <PostBtmWriteComment
                        avatarWidth={windowSize.width > 425 ? 36 : 28}
                        avatarHeight={windowSize.width > 425 ? 36 : 28}
                        comment={comment}
                        setComment={setComment}
                        placeholder={"Write a comment..."}
                  />

            </div>
      );
};

export default PostBtmArea;