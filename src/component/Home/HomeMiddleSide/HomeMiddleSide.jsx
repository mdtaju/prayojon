import dynamic from 'next/dynamic';
import React, { memo, useEffect, useState } from 'react';
import { useGetGeneralPostsQuery, useGetProductPostsQuery } from '../../../features/userPost/userPostApi';
import PostsFilter from './PostsFilter';
import UserE_Post from './UserPost/UserE_Post';
import UserPost from './UserPost/UserPost';
const CreatePost = dynamic(() => import('./CreatePost/CreatePost'), { ssr: false });

const HomeMiddleSide = ({ userProducts, getGeneralPost }) => {
      const [postType, setPostType] = useState("product");
      const { data } = useGetGeneralPostsQuery();
      const { data: productPosts } = useGetProductPostsQuery();
      const [userPosts, setUserPosts] = useState([]);
      const [userEPosts, setUserEPosts] = useState([]);
      // console.log(productPosts)
      // console.log("Product ----------------")
      // console.log(data)
      // console.log("General ----------------")

      useEffect(() => {
            if (data, productPosts) {
                  if (getGeneralPost) {
                        setUserPosts(getGeneralPost);
                  } else {
                        setUserPosts(data);
                  }
                  if (userProducts) {
                        setUserEPosts(userProducts);
                  } else {
                        setUserEPosts(productPosts);
                  }
            }
      }, [data, productPosts, userProducts, getGeneralPost]);

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
                        <CreatePost />
                        {/* Post component */}
                        {
                              postType === "general" ?
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
                                    </>
                        }
                  </div>
            </section>
      );
};

export default memo(HomeMiddleSide);