import { useSession } from 'next-auth/react';
import React from 'react';
import { useGetCartItemsQuery } from '../../../../features/cart/cartApi';
import PostBtmArea from '../UserPost/PostBtmArea/PostBtmArea';
import E_PostBtmArea from './E_PostBtmArea/E_PostBtmArea';
import E_PostTitleDes from './E_PostTitleDes/E_PostTitleDes';
import PostImgArea from './PostImgArea/PostImgArea';
import PostTopArea from './PostTopArea/PostTopArea';

const UserE_Post = ({ post = {} }) => {
      const { id, post_type, post_content, post_audience, user_id, post_file_id, category, product_title, location, product_id, created_at, comments, reacts, files, user } = post;
      const { data: session } = useSession();
      const { data: cartItems } = useGetCartItemsQuery(session?.user?.email);
      return (
            <div className='w-full common_shadow mt-4 px-0'>
                  {/* E-commerce post top area */}
                  <PostTopArea
                        postAudience={post_audience}
                        createdAt={created_at}
                        name={user?.name}
                        photo={user?.photo_url}
                        uid={user_id}
                  />
                  {/* title, location, category and description component */}
                  <E_PostTitleDes
                        postContent={post_content}
                        productTitle={product_title}
                        location={location}
                        category={category}
                  />
                  {/* img component */}
                  <PostImgArea
                        files={files}
                  />
                  {/* E-commerce post price, type, status and cart component */}
                  <E_PostBtmArea
                        product={post}
                        cartItems={cartItems}
                  />
                  {/* like, comment and share component */}
                  <PostBtmArea
                        postId={id}
                        postType="Product"
                        postUserId={user_id}
                        comments={comments}
                        reacts={reacts}
                  />
            </div>
      );
};

export default UserE_Post;