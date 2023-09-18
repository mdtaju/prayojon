import React, { memo } from 'react';
import PostImgList from './PostImgList';

const PostImgArea = ({ files = [] }) => {

      return (
            <div className='w-full'>
                  <PostImgList
                        images={files}
                  />
            </div>
      );
};

export default memo(PostImgArea);