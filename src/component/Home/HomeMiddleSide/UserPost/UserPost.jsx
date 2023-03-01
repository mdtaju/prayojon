import React from 'react';
import PostBtmArea from './PostBtmArea/PostBtmArea';
import PostImgArea from './PostImgArea/PostImgArea';
import PostTopArea from './PostTopArea/PostTopArea';

const UserPost = () => {
      return (
            <div className='w-full common_shadow mt-4 px-0'>
                  <PostTopArea />
                  <PostImgArea />
                  <PostBtmArea />
            </div>
      );
};

export default UserPost;