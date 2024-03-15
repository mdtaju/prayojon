import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useGetGeneralPostsForPersonalQuery, useGetProductPostsForPersonalQuery, useGetSellerReviewsQuery } from '../../features/userPost/userPostApi';
import HomeMiddleSide from "../Home/HomeMiddleSide/HomeMiddleSide";
import About from '../Profile/ProfileTabItems/About';
import ProductLists from '../Profile/ProfileTabItems/ProductLists';
import ProfileFollowers from '../Profile/ProfileTabItems/ProfileFollowers';
import ProfileFollowing from '../Profile/ProfileTabItems/ProfileFollowing';
import ProfilePhotos from '../Profile/ProfileTabItems/ProfilePhotos';
import ProfileVideos from '../Profile/ProfileTabItems/ProfileVideos';
import ProfileTopArea from '../Profile/ProfileTopArea/ProfileTopArea';
import Reviews from "../productDetails/MiddleContainer/Reviews";

const ProfileHero = ({ UID }) => {
      const router = useRouter();
      const { data: sellerReviews } = useGetSellerReviewsQuery(UID);
      const { data: getProducts } = useGetProductPostsForPersonalQuery(
            UID
      );
      const { data: getGeneralPost } = useGetGeneralPostsForPersonalQuery(
            UID
      );
      const [agvRating, setAvgRating] = useState(0);

      useEffect(() => {
            if (sellerReviews?.length) {
                  let avg = 0;
                  sellerReviews.forEach((rating) => {
                        avg += rating.total_avg_rating
                  });
                  setAvgRating(avg / sellerReviews.length);
            }
      }, [sellerReviews])

      // what to render
      let content;
      if (router?.query?.tab === "post") {
            content = <HomeMiddleSide UID={UID} userProducts={getProducts} generalPost={getGeneralPost} />
      } else if (router?.query?.tab === "lists") {
            content = <ProductLists UID={UID} />
      } else if (router?.query?.tab === "about") {
            content = <About UID={UID} />
      } else if (router?.query?.tab === "video") {
            content = <ProfileVideos UID={UID} />
      } else if (router?.query?.tab === "photo") {
            content = <ProfilePhotos UID={UID} />
      } else if (router?.query?.tab === "follower") {
            content = <ProfileFollowers UID={UID} />
      } else if (router?.query?.tab === "following") {
            content = <ProfileFollowing UID={UID} />
      } else if (router?.query?.tab === "reviews") {
            content = <div className='w-full md:w-[80%] max-w-[1536px] mx-auto common_shadow my-5'>
                  <Reviews type={"seller"} reviews={sellerReviews} />
            </div>
      } else {
            content = <HomeMiddleSide UID={UID} userProducts={getProducts} generalPost={getGeneralPost} />
      }
      return (
            <>
                  <div className='w-full md:w-[80%] max-w-[1536px] mx-auto flex flex-col items-center justify-between mt-[20px] sm:mt-[55px] common_shadow pb-0'>
                        <ProfileTopArea
                              UID={UID}
                              agvRating={agvRating}
                              totalRating={sellerReviews?.length || 0}
                        />
                  </div>
                  {content}
            </>
      );
};

export default ProfileHero;