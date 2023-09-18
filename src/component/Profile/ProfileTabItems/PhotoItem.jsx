import { Card, CardMedia } from '@mui/material';
import React from 'react';

const PhotoItem = ({ setOpen, photo, setPhotoUrl, index }) => {
      const { file_path } = photo;

      const handleOpen = () => {
            setPhotoUrl({
                  photo: file_path,
                  pIndex: index
            });
            setOpen(true)
      }
      return (
            <div onClick={handleOpen} className='w-full h-auto'>
                  {/* <img
                        src={"/images/profile-demo.jpg"}
                        alt='demo-image'
                        className='w-full h-full object-fill'
                  /> */}
                  <Card sx={{ width: "100%" }}>
                        <CardMedia
                              sx={{ height: 140 }}
                              image={file_path}
                              title="green iguana"
                        />
                  </Card>
            </div>
      );
};

export default PhotoItem;