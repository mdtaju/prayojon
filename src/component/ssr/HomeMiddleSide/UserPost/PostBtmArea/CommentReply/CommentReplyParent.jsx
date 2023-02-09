import React from 'react';
import CommentReplyChild from './CommentReplyChild';

const CommentReplyParent = ({ userReply }) => {
      return (
            <div className='ml-[48px] flex flex-col gap-2'>
                  {
                        userReply.map((reply, i) => (
                              <CommentReplyChild
                                    key={i}
                                    name={reply.name}
                                    comment={reply.comment}
                              />
                        ))
                  }
            </div>
      );
};

export default CommentReplyParent;