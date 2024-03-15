import { Skeleton } from '@mui/material';
import React from 'react';
import PostBtmArea from './PostBtmArea/PostBtmArea';
import PostImgArea from './PostImgArea/PostImgArea';
import PostTopArea from './PostTopArea/PostTopArea';

const UserPost = ({ post = {} }) => {
      const { id, post_query_id, post_content, post_audience, user_id, post_file_id, category, product_title, location, product_id, created_at, comments, reacts, files, user } = post;

      if (post) {
            return (
                  <div className='w-full common_shadow pt-0 mt-4 px-0'>
                        <PostTopArea
                              postContent={post_content}
                              postAudience={post_audience}
                              createdAt={created_at}
                              name={user?.name}
                              photo={user?.photo_url}
                              uid={user_id}
                              isEPost={false}
                        />
                        <PostImgArea
                              files={files}
                        />
                        <PostBtmArea
                              postId={id}
                              postType="General"
                              postQueryId={post_query_id}
                              postUserId={user_id}
                              comments={comments}
                              reacts={reacts}
                              product={{}}
                              cartItems={[]}
                        />
                  </div>
            );
      } else {
            return (
                  <div className='w-full common_shadow mt-4 px-0'>
                        <div className='w-full px-4 flex items-center gap-4'>
                              <Skeleton variant="circular" width={40} height={40} />
                              <div className='w-[200px]'>
                                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                    <Skeleton variant="text" sx={{ fontSize: '8px', width: "140px" }} />
                              </div>
                        </div>
                        <div className='w-full mt-4'>
                              <Skeleton variant="rectangular" sx={{ width: "100%", height: "250px" }} />
                        </div>
                  </div>
            )
      }
};

export default UserPost;