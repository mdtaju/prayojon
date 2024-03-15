import { Skeleton } from '@mui/material';
import { useSession } from 'next-auth/react';
import React from 'react';
import { useGetCartItemsQuery } from '../../../../features/cart/cartApi';
import PostBtmArea from '../UserPost/PostBtmArea/PostBtmArea';
import E_PostTitleDes from './E_PostTitleDes/E_PostTitleDes';
import PostImgArea from './PostImgArea/PostImgArea';
import PostTopArea from './PostTopArea/PostTopArea';

const UserE_Post = ({ post = {} }) => {
      const { id, post_content, post_audience, user_id, post_file_id, category, product_title, location, product_id, created_at, comments, reacts, files, user } = post;
      const { data: session } = useSession();
      const { data: cartItems } = useGetCartItemsQuery(session?.user?.email);
      if (post) {
            return (
                  <div className='w-full common_shadow pt-0 mt-4 px-0'>
                        {/* E-commerce post top area */}
                        <PostTopArea
                              postAudience={post_audience}
                              createdAt={created_at}
                              name={user?.name}
                              photo={user?.photo_url}
                              uid={user_id}
                              isEPost={true}
                        />
                        {/* title, location, category and description component */}
                        <E_PostTitleDes
                              postContent={post_content}
                              productTitle={product_title}
                              location={location}
                              category={category}
                              id={product_id}
                        />
                        {/* img component */}
                        <PostImgArea
                              files={files}
                        />
                        {/* E-commerce post price, type, status and cart component */}
                        {/* <E_PostBtmArea
                              product={post}
                              cartItems={cartItems}
                        /> */}
                        {/* like, comment and share component */}
                        <PostBtmArea
                              postId={id}
                              postType="Product"
                              postUserId={user_id}
                              postQueryId={product_id}
                              comments={comments}
                              reacts={reacts}
                              product={post}
                              cartItems={cartItems}
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

export default UserE_Post;