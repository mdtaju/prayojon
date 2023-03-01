import React from 'react';
import PostImgList from './PostImgList';
// import PostImg from '../../../../../public/images/post-image.jpg';
const PostImgArea = () => {
      return (
            <div className='w-full h-auto'>
                  {/* <CardMedia
                        component="img"
                        height="194"
                        image={'/images/post-image.jpg'}
                        alt="Paella dish"
                  /> */}
                  <PostImgList />
            </div>
      );
};

export default PostImgArea;