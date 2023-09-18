import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { useGetGeneralPostsForPersonalQuery, useGetProductPostsForPersonalQuery } from '../../features/userPost/userPostApi';
import HomeMiddleSide from "../Home/HomeMiddleSide/HomeMiddleSide";
import About from '../Profile/ProfileTabItems/About';
import ProductLists from '../Profile/ProfileTabItems/ProductLists';
import ProfileFollowers from '../Profile/ProfileTabItems/ProfileFollowers';
import ProfileFollowing from '../Profile/ProfileTabItems/ProfileFollowing';
import ProfilePhotos from '../Profile/ProfileTabItems/ProfilePhotos';
import ProfileVideos from '../Profile/ProfileTabItems/ProfileVideos';
import ProfileTopArea from '../Profile/ProfileTopArea/ProfileTopArea';

const ProfileHero = ({ UID }) => {
      const [activeTab, setActiveTab] = useState("post");
      const { data: session } = useSession();
      const { data: getProducts } = useGetProductPostsForPersonalQuery(
            session?.user?.email
      );
      const { data: getGeneralPost } = useGetGeneralPostsForPersonalQuery(
            session?.user?.email
      );

      // what to render
      let content;
      if (activeTab === "post") {
            content = <HomeMiddleSide UID={UID} userProducts={getProducts} generalPost={getGeneralPost} />
      } else if (activeTab === "lists") {
            content = <ProductLists UID={UID} />
      } else if (activeTab === "about") {
            content = <About UID={UID} />
      } else if (activeTab === "video") {
            content = <ProfileVideos UID={UID} />
      } else if (activeTab === "photo") {
            content = <ProfilePhotos UID={UID} />
      } else if (activeTab === "follower") {
            content = <ProfileFollowers UID={UID} />
      } else {
            content = <ProfileFollowing UID={UID} />
      }
      return (
            <>
                  <div className='w-full md:w-[80%] max-w-[1536px] mx-auto flex flex-col items-center justify-between mt-[20px] sm:mt-[55px] common_shadow pb-0'>
                        <ProfileTopArea
                              UID={UID}
                              activeTab={activeTab}
                              setActiveTab={setActiveTab}
                        />
                  </div>
                  {content}
            </>
      );
};

export default ProfileHero;