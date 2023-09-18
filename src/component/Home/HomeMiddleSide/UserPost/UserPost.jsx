import React from 'react';
import PostBtmArea from './PostBtmArea/PostBtmArea';
import PostImgArea from './PostImgArea/PostImgArea';
import PostTopArea from './PostTopArea/PostTopArea';

const UserPost = ({ post = {} }) => {
      const { id, post_type, post_content, post_audience, user_id, post_file_id, category, product_title, location, product_id, created_at, comments, reacts, files, user } = post;
      return (
            <div className='w-full common_shadow mt-4 px-0'>
                  <PostTopArea
                        postContent={post_content}
                        postAudience={post_audience}
                        createdAt={created_at}
                        name={user[0]?.name}
                        photo={user[0]?.photo_url}
                        uid={user_id}
                  />
                  <PostImgArea
                        files={files}
                  />
                  <PostBtmArea
                        postId={id}
                        postType="General"
                        postUserId={user_id}
                        comments={comments}
                        reacts={reacts}
                  />
            </div>
      );
};

export default UserPost;