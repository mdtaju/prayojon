import React from 'react';
import CommentReplyChild from './CommentReplyChild';

const CommentReplyParent = ({ userReply }) => {
      return (
            <div className='ml-[44px] sm:ml-[48px] flex flex-col gap-2'>
                  {
                        userReply.map((reply, i, arr) => (
                              <CommentReplyChild
                                    key={i}
                                    name={reply.name}
                                    comment={reply.comment}
                                    linear={i + 1 === arr.length ? true : false}
                              />
                        ))
                  }

            </div>
      );
};

export default CommentReplyParent;