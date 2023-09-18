import React, { useEffect, useState } from 'react';
import PostBtmCommentChild from './PostBtmCommentChild';

const PostBtmCommentParent = ({ comments }) => {
      const [commentCount, setCommentCount] = useState(1);
      const [userComments, setUserComments] = useState([]);

      useEffect(() => {
            const commentsSliceLessAndMore = comments?.slice(0, commentCount);
            setUserComments(commentsSliceLessAndMore);
      }, [commentCount, comments])
      return (
            <div id="#1" className='flex flex-col gap-2 px-1 py-2'>
                  {/* User comment child component. In this component has comment "Reply Parent" component. */}
                  {
                        userComments?.map((comment, i) => (
                              <PostBtmCommentChild
                                    key={i}
                                    reply={comment?.reply ? comment?.reply : []}
                                    userId={comment?.user_id}
                                    comment={comment?.comment}
                                    time={comment?.created_at}
                              />
                        ))
                  }
                  {/* In this part has two button "View more and View less" */}
                  <div className='flex items-center gap-4 w-full'>
                        {
                              userComments?.length >= commentCount &&
                              <span
                                    className='underline text-sm text-gray-600 font-bold cursor-pointer hover:text-gray-500'
                                    onClick={() => setCommentCount((prevCount) => prevCount + 5)}
                              >view more 5+</span>
                        }
                        {
                              commentCount !== 1 &&
                              <a href={'#1'}>
                                    <span
                                          className='underline text-sm text-gray-600 font-bold cursor-pointer hover:text-gray-500'
                                          onClick={() => setCommentCount(1)}
                                    >view less</span>
                              </a>
                        }
                  </div>
            </div>
      );
};

export default PostBtmCommentParent;