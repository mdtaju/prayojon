import { Skeleton } from '@mui/material';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useGetGeneralPostsQuery, useGetProductPostsQuery } from '../../../features/userPost/userPostApi';
import PostsFilter from './PostsFilter';
import UserE_Post from './UserPost/UserE_Post';
import UserPost from './UserPost/UserPost';
const CreatePost = dynamic(() => import('./CreatePost/CreatePost'), {
      loading: () => <div className='space-y-3 common_shadow'>
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            <div className='flex items-center gap-4'>
                  <Skeleton variant="circular" width={40} height={40} />
                  <Skeleton variant="rounded" className='flex-1 rounded-full' height={40} />
            </div>
      </div>, ssr: false
});

const HomeMiddleSide = ({ UID, userProducts, generalPost }) => {
      const router = useRouter()
      const { data: session } = useSession();
      const [postType, setPostType] = useState("product");
      const { data } = useGetGeneralPostsQuery();
      const { data: productPosts } = useGetProductPostsQuery();
      const [userPosts, setUserPosts] = useState([]);
      const [userEPosts, setUserEPosts] = useState([]);
      // console.log(router)
      useEffect(() => {
            if (data, productPosts) {
                  if (generalPost) {
                        setUserPosts(generalPost);
                  }
                  if (!generalPost && data) {
                        setUserPosts(data);
                  }
                  if (userProducts) {
                        setUserEPosts(userProducts);
                  }
                  if (!userProducts && productPosts) {
                        setUserEPosts(productPosts);
                  }
            }
      }, [data, productPosts, userProducts, generalPost]);

      return (
            <section className='w-full min-h-screen md:w-[740px] mx-auto p-2 sm:py-4 sm:px-8'>

                  {/* Create post and post all width are 500px for large view */}
                  <div className='w-full sm:w-[550px] mx-auto'>
                        {/* Post filtering component */}
                        <PostsFilter
                              postType={postType}
                              setPostType={setPostType}
                        />
                        {/* CreatePost component */}
                        {
                              (session?.user?.email === UID || router?.pathname === "/" || router?.pathname === "/profile") &&
                              <CreatePost />
                        }
                        {/* Post component */}

                        {
                              userPosts?.length ?
                                    <>

                                          {postType === "general" ?
                                                <>
                                                      {

                                                            userPosts?.map((p, i) => (
                                                                  <UserPost
                                                                        post={p}
                                                                        key={i}
                                                                  />
                                                            ))
                                                      }
                                                </> :
                                                <>
                                                      {
                                                            userEPosts?.map((p, i) => (
                                                                  <UserE_Post
                                                                        post={p}
                                                                        key={i}
                                                                  />
                                                            ))
                                                      }
                                                </>}
                                    </> :
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
                        }
                  </div>
            </section>
      );
};

export default HomeMiddleSide