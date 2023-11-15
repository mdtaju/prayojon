import { Skeleton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useGetSinglePostQuery } from '../../features/userPost/userPostApi'
import UserE_Post from '../Home/HomeMiddleSide/UserPost/UserE_Post'
import UserPost from '../Home/HomeMiddleSide/UserPost/UserPost'

function SinglePostHero({ type, id }) {

      const { data } = useGetSinglePostQuery({ type, id })
      const [post, setPost] = useState({})


      useEffect(() => {
            if (data) {
                  setPost(data);
            }
      }, [data])
      return (
            <div className="w-full min-h-screen sm:w-[550px] mx-auto p-2 sm:py-4 sm:px-8 mt-[20px] sm:mt-[55px]">
                  {
                        data ?
                              <>

                                    {
                                          type === "general" ?
                                                <UserPost post={post} /> :
                                                <UserE_Post post={post} />
                                    }
                              </> :
                              <>
                                    <div className='w-full common_shadow mt-4 px-0'>
                                          <div className='w-full px-4 flex items-center gap-4'>
                                                <Skeleton variant="circular" width={40} height={40} />
                                                <div className='w-[200px]'>
                                                      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                                      <Skeleton variant="text" sx={{ fontSize: '8px', width: "140px" }} />
                                                </div>
                                          </div>
                                          <div className='w-full mt-4'>
                                                <Skeleton variant="rectangular" sx={{ width: "100%", height: "250px" }} />
                                          </div>
                                    </div>
                              </>
                  }
            </div>
      )
}

export default SinglePostHero