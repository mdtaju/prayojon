import { CardMedia } from '@mui/material';
import React from 'react';
// import PostImg from '../../../../../public/images/post-image.jpg';
const PostImgArea = () => {
      return (
            <div className=''>
                  <CardMedia
                        component="img"
                        height="194"
                        image={'/images/post-image.jpg'}
                        alt="Paella dish"
                  />
            </div>
      );
};

export default PostImgArea;