import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import useWindowSize from '../../../../../hook/useWindowSize';
import PostBtmCommentParent from './PostBtmCommentParent';
import PostBtmStatusBar from './PostBtmStatusBar';
const PostBtmActionBar = dynamic(() => import('./PostBtmActionBar'), { ssr: false });
const PostBtmWriteComment = dynamic(() => import('./PostBtmWriteComment'), { ssr: false });

const PostBtmArea = ({ postId, postQueryId, postType, postUserId, comments = [], reacts = [] }) => {
      const [comment, setComment] = useState("");
      const [showReplyInput, setShowReplyInput] = useState(false);
      const windowSize = useWindowSize();

      return (
            <div className='w-full px-1 sm:px-4 border-t border-gray-300'>

                  {/* Like Comment Status component */}
                  <PostBtmStatusBar
                        postReacts={reacts}
                        commentsLength={comments.length}
                  />

                  {/* Do Like Comment component */}
                  <PostBtmActionBar
                        id={postId}
                        postQueryId={postQueryId}
                        postUserId={postUserId}
                        postType={postType}
                        reacts={reacts}
                  />

                  {/* Users comments component */}
                  <PostBtmCommentParent
                        comments={comments}
                  />

                  {/* Write comment component */}
                  <PostBtmWriteComment
                        avatarWidth={windowSize.width > 425 ? 36 : 28}
                        avatarHeight={windowSize.width > 425 ? 36 : 28}
                        comment={comment}
                        setComment={setComment}
                        placeholder={"Write a comment..."}
                        id={postId}
                        postType={postType}
                        postQueryId={postQueryId}
                        postUserId={postUserId}
                  />

            </div>
      );
};

export default PostBtmArea