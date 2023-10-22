import { faImage } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/legacy/image';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const CoverPhoto = ({ coverPhoto, setCoverPhoto, coverUrl }) => {
      const [fileSizeWarning, setFileSizeWarning] = useState([]);

      // file size validation - cover photo
      const onDrop = useCallback(selectedFiles => {
            const acceptedFiles = [];
            selectedFiles.forEach((item) => {
                  // calculation of each selected file size into MB(Mega byte).
                  const getSize = item.size / (1024 ** 2);
                  if (getSize < 25) {
                        acceptedFiles.push(item); // if file size small than 25MB then is accepted
                  } else {
                        setFileSizeWarning((prevState) => [...prevState, `Your selected file "${item.name}" is large than 25MB.`])
                  }
            })
            // after 5 seconds warning messages will remove.
            // console.log("called file fun")
            // setTimeout(() => { setFileSizeWarning([]) }, 5000)
            return setCoverPhoto(acceptedFiles)
      }, [setCoverPhoto])

      // file type validation - cover photo
      const { getRootProps, getInputProps, isDragActive } = useDropzone({
            onDrop,
            multiple: false,
            accept: {
                  'image/png': ['.png'],
                  'image/jpg': ['.jpg'],
                  'image/jpeg': ['.jpeg'],
                  'image/gif': ['.gif']
            }
      });
      return (
            <>
                  <h2 className='mt-6 text-sm font-semibold text-gray-600'>Upload a cover photo</h2>
                  <input {...getInputProps()} />
                  <div {...getRootProps()} className='w-full h-[200px] mt-2 rounded-md border-dashed border-2 border-gray-400 bg-gray-100 grid place-items-center cursor-pointer'>
                        {
                              (coverUrl || coverPhoto?.length > 0) ?
                                    <div className='w-full h-full relative'>
                                          {
                                                coverPhoto?.length === 0 ?
                                                      <Image
                                                            src={coverUrl}
                                                            alt='cover-photo'
                                                            layout='fill'
                                                            className='object-cover object-center'
                                                      /> :
                                                      <Image
                                                            src={URL.createObjectURL(coverPhoto[0])}
                                                            alt='cover-photo'
                                                            layout='fill'
                                                            className='object-cover object-center'
                                                      />
                                          }
                                    </div>
                                    :
                                    <div className='flex items-center gap-2'>
                                          <FontAwesomeIcon
                                                icon={faImage}
                                                className='text-sm font-semibold text-gray-600'
                                          />
                                          <span className='text-sm font-semibold text-gray-600'>Click to Select / Drag and Drop</span>
                                    </div>

                        }
                  </div>
                  <div className='text-center py-6'>
                        <button className='btn_primary' type="submit">Submit Your Data</button>
                  </div>
            </>
      );
};

export default CoverPhoto;