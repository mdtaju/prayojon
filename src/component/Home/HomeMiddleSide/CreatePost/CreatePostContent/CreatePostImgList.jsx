import { faCirclePlay } from '@fortawesome/free-regular-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ImageList, ImageListItem } from '@mui/material';
import React from 'react';

const CreatePostImgList = ({ storeFiles, setStoreFiles }) => {

      return (
            <div
                  className='bg-gray-100 rounded-md p-2 grid place-items-center cursor-pointer'>
                  <ImageList
                        sx={{ width: '100%', height: 'auto', cursor: 'auto' }}
                        variant="quilted"
                        cols={1}
                        rowHeight={'auto'}
                  >
                        {storeFiles.map((item, i) => (
                              // each image container
                              <div key={i} className='relative'>
                                    {/* button to remove a selected image or videos */}
                                    <div
                                          onClick={() => {
                                                const dueItems = storeFiles.filter((file) => file.name !== item.name)
                                                setStoreFiles(dueItems);
                                          }}
                                          className='bg-white hover:bg-gray-100 active:scale-95 duration-150 border border-gray-400 py-1 px-2 rounded-md cursor-pointer absolute bottom-2 right-2 z-10 invisible group-hover:visible'>
                                          <FontAwesomeIcon
                                                icon={faTrash}
                                                className='text-sm'
                                          />
                                          <span className='text-sm font-semibold select-none'> Remove</span>
                                    </div>
                                    <ImageListItem rows={1}>
                                          {
                                                item.type.slice(0, 5) === 'image' ?
                                                      <img
                                                            src={URL.createObjectURL(item)}
                                                            alt={'selected-img'}
                                                            loading="lazy"
                                                      /> :
                                                      <div className='relative'>
                                                            <FontAwesomeIcon
                                                                  icon={faCirclePlay}
                                                                  className='absolute top-1/2 left-1/2 text-white text-[50px] transform -translate-x-1/2 -translate-y-1/2'
                                                            />
                                                            <video>
                                                                  <source src={URL.createObjectURL(item)} type="video/mp4"></source>
                                                            </video>
                                                      </div>
                                          }
                                    </ImageListItem>
                              </div>
                        ))}
                  </ImageList>
            </div>
      );
};

export default CreatePostImgList;