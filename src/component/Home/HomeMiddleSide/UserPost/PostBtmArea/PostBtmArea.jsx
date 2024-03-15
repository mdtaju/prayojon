import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import useWindowSize from '../../../../../hook/useWindowSize';
import PostBtmCommentParent from './PostBtmCommentParent';
const PostBtmActionBar = dynamic(() => import('./PostBtmActionBar'), { ssr: false });
const PostBtmWriteComment = dynamic(() => import('./PostBtmWriteComment'), { ssr: false });

const PostBtmArea = ({ postId, postQueryId, postType, postUserId, comments = [], reacts = [], product,
      cartItems }) => {
      const [comment, setComment] = useState("");
      const [commentsShow, setCommentsShow] = useState(false);
      const [showReplyInput, setShowReplyInput] = useState(false);
      const windowSize = useWindowSize();

      return (
            <div className='w-full'>

                  {/* Like Comment Status component */}
                  {/* <PostBtmStatusBar
                        postReacts={reacts}
                        commentsLength={comments.length}
                  /> */}

                  {/* Do Like Comment component */}
                  <PostBtmActionBar
                        id={postId}
                        postQueryId={postQueryId}
                        postReacts={reacts}
                        postUserId={postUserId}
                        postType={postType}
                        reacts={reacts}
                        setCommentsShow={setCommentsShow}
                        product={product}
                        cartItems={cartItems}
                  />

                  {/* Users comments component */}
                  {
                        commentsShow &&
                        <PostBtmCommentParent
                              comments={comments}
                        />
                  }

                  {/* Write comment component */}
                  <PostBtmWriteComment
                        avatarWidth={28}
                        avatarHeight={28}
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