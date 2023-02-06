import React from 'react';
import PostBtmArea from './PostBtmArea';
import PostImgArea from './PostImgArea';
import PostTopArea from './PostTopArea';

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