import dynamic from 'next/dynamic';
import React from 'react';
import UserPost from './UserPost/UserPost';
const CreatePost = dynamic(() => import('./CreatePost/CreatePost'), { ssr: false });
const HomeMiddleSide = () => {
      return (
            <section className='w-full min-h-screen md:w-[740px] mx-auto p-2 sm:py-4 sm:px-8'>

                  {/* Create post and post all width are 500px for large view */}
                  <div className='w-full sm:w-[500px] mx-auto'>
                        {/* CreatePost component */}
                        <CreatePost />
                        {/* Post component */}
                        <UserPost />
                        <UserPost />
                        <UserPost />
                  </div>
            </section>
      );
};

export default HomeMiddleSide;