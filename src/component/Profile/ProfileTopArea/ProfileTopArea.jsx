import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faCaretDown, faUserCheck, faUserMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Rating } from '@mui/material';
import { useSession } from 'next-auth/react';
import Image from 'next/legacy/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAddNotificationMutation } from '../../../features/notification/notificationApi';
import { useGetUserQuery } from '../../../features/profile/profileApi';
import { useAddFollowerMutation, useGetFollowerQuery, useUnfollowMutation } from '../../../features/userPost/userPostApi';
import useWindowSize from '../../../hook/useWindowSize';

const ProfileTopArea = ({ UID = "", agvRating,
      totalRating }) => {
      const windowSize = useWindowSize();
      const router = useRouter();
      const [photo, setPhoto] = useState("");
      const [cover, setCover] = useState("");
      const [name, setName] = useState("");
      const [profession, setProfession] = useState("");
      const { data: authData } = useSession();
      const { data: getAuthUser } = useGetUserQuery(UID);
      const [addFollower, { data }] = useAddFollowerMutation();
      const { data: followers } = useGetFollowerQuery(UID);
      const [isFollow, setIsFollow] = useState(false);
      const [unfollow, { data: getUnfollow }] = useUnfollowMutation();
      const [addNotification] = useAddNotificationMutation();
      const d = new Date();

      // check is follow the user
      useEffect(() => {
            if (followers) {
                  const getFollowingUser = followers.find((u) => u.follower_id === authData?.user?.email);
                  if (getFollowingUser) {
                        setIsFollow(true)
                  }
            }
      }, [followers, authData?.user?.email]);

      // check is follow the user after unfollow action dispatch
      useEffect(() => {
            if (getUnfollow) {
                  setIsFollow(false)
            }
      }, [getUnfollow]);

      // get user's name, photo and cover-photo 
      useEffect(() => {

            if (getAuthUser?.length === 0) {
                  router.push("/")
            }
            if (getAuthUser && getAuthUser[0]?.name) {
                  setName(getAuthUser[0].name);
            }
            if (getAuthUser && getAuthUser[0]?.profession) {
                  setProfession(getAuthUser[0].profession);
            }
            if (getAuthUser && getAuthUser[0]?.photo_url) {
                  setPhoto(getAuthUser[0]?.photo_url);
            }
            if (getAuthUser && getAuthUser[0]?.cover_photo_url) {
                  setCover(getAuthUser[0]?.cover_photo_url);
            }
      }, [getAuthUser, router]);

      // handle addFollower
      const handleFollower = () => {
            if (getAuthUser[0]?.name) {
                  addFollower({
                        user_id: UID,
                        followerId: authData?.user?.email
                  })
                  addNotification({
                        sender_id: authData?.user?.email,
                        receiver_id: UID,
                        message: "following you",
                        link: `/profile/${authData?.user?.email}`,
                        date: d.toUTCString()
                  })
            }
      }

      // handle unfollow 
      const handleUnFollow = () => {
            if (UID !== authData?.user?.email) {
                  if (authData && getAuthUser[0]?.name) {
                        unfollow({
                              user_id: UID,
                              follower_id: authData?.user?.email?.toString()
                        })
                        addNotification({
                              sender_id: authData?.user?.email,
                              receiver_id: UID,
                              message: "unfollowing you",
                              link: `/profile/${authData?.user?.email}`,
                              date: d.toUTCString()
                        })
                  }
            }
      }

      return (
            <div className='w-full'>
                  {/* cover photo container */}
                  <div className='w-full h-[300px] relative'>
                        <Image
                              src={cover ? cover : "/images/cover-photo-demo.jpg"}
                              alt='cover-photo'
                              layout='fill'
                              priority
                              className='object-cover rounded-b-md'
                        />
                  </div>
                  {/* profile container */}
                  <div className='mt-[-10px] md:mt-[-40px] px-6 w-full flex flex-col sm:flex-row gap-3 sm:justify-between sm:items-center'>
                        <div className='flex gap-4 items-center'>
                              {/* profile photo */}
                              <div>
                                    <Avatar
                                          alt="Profile Photo"
                                          src={photo}
                                          sx={windowSize.width > 768 ? { width: 168, height: 168 } : { width: 100, height: 100 }}
                                    />
                              </div>
                              {/* profile name and info container */}
                              <div>
                                    <h2 className='text-2xl font-bold'>{name}</h2>
                                    {
                                          agvRating > 0 &&
                                          <div className="flex items-center gap-1">
                                                <Rating
                                                      name="read-only"
                                                      precision={0.5}
                                                      value={agvRating}
                                                      readOnly
                                                      size="small"
                                                />
                                                <span className='text-sm font-medium'>{totalRating}</span>
                                          </div>
                                    }
                                    <p className='text-base font-bold text-gray-500'>{profession}</p>
                              </div>
                        </div>
                        {/* profile edit button */}
                        {
                              UID ?
                                    <>
                                          {
                                                UID == authData?.user?.email ?
                                                      <button onClick={() => {
                                                            router.replace("/profile/edit")
                                                      }} className='px-4 py-2 rounded-md bg-primary text-white active:scale-95 duration-150'>Edit Profile <FontAwesomeIcon
                                                                  icon={faEdit}
                                                            />
                                                      </button> :
                                                      <>

                                                            {
                                                                  data || isFollow ?

                                                                        <button onClick={handleUnFollow} className='px-4 py-2 rounded-md bg-primary text-white active:scale-95 duration-150'>Unfollow <FontAwesomeIcon
                                                                              icon={faUserMinus}
                                                                        />
                                                                        </button> :
                                                                        <button onClick={handleFollower} className='px-4 py-2 rounded-md bg-primary text-white active:scale-95 duration-150'>Follow <FontAwesomeIcon
                                                                              icon={faUserCheck}
                                                                        />
                                                                        </button>
                                                            }
                                                      </>
                                          }
                                    </>
                                    :
                                    <button onClick={() => {
                                          router.replace("/profile/edit")
                                    }} className='px-4 py-2 rounded-md bg-primary text-white active:scale-95 duration-150'>Edit Profile <FontAwesomeIcon
                                                icon={faEdit}
                                          />
                                    </button>
                        }
                  </div>

                  {/* tab list */}
                  <div className='w-full px-4 flex gap-4 mt-6 border-t border-gray-300'>
                        <Link href={`${router?.query?.id ? `/profile/${router.query.id}?tab=post` : "/profile?tab=post"}`}>
                              <div className={`profile_tab_link ${router.query.tab === "post" ? "profile_tab_link_active" : ""}`}>
                                    <span>Timeline</span>
                              </div>
                        </Link>
                        {
                              windowSize.width > 768 ?
                                    <>
                                          {/* tab list items for large view */}
                                          <Link href={`${router?.query?.id ? `/profile/${router.query.id}?tab=lists` : "/profile?tab=lists"}`}>
                                                <div className={`profile_tab_link ${router.query.tab === "lists" ? "profile_tab_link_active" : ""}`}>
                                                      <span>Lists</span>
                                                </div>
                                          </Link>
                                          <Link href={`${router?.query?.id ? `/profile/${router.query.id}?tab=about` : "/profile?tab=about"}`}>
                                                <div className={`profile_tab_link ${router.query.tab === "about" ? "profile_tab_link_active" : ""}`}>
                                                      <span>About</span>
                                                </div>
                                          </Link>
                                          <Link href={`${router?.query?.id ? `/profile/${router.query.id}?tab=video` : "/profile?tab=video"}`}>
                                                <div className={`profile_tab_link ${router.query.tab === "video" ? "profile_tab_link_active" : ""}`}>
                                                      <span>Videos</span>
                                                </div>
                                          </Link>
                                          <Link href={`${router?.query?.id ? `/profile/${router.query.id}?tab=photo` : "/profile?tab=photo"}`}>
                                                <div className={`profile_tab_link ${router.query.tab === "photo" ? "profile_tab_link_active" : ""}`}>
                                                      <span>Photos</span>
                                                </div>
                                          </Link>
                                          <Link href={`${router?.query?.id ? `/profile/${router.query.id}?tab=follower` : "/profile?tab=follower"}`}>
                                                <div className={`profile_tab_link ${router.query.tab === "follower" ? "profile_tab_link_active" : ""}`}>
                                                      <span>Followers</span>
                                                </div>
                                          </Link>
                                          <Link href={`${router?.query?.id ? `/profile/${router.query.id}?tab=following` : "/profile?tab=following"}`}>
                                                <div className={`profile_tab_link ${router.query.tab === "following" ? "profile_tab_link_active" : ""}`}>
                                                      <span>Following</span>
                                                </div>
                                          </Link>
                                          <Link href={`${router?.query?.id ? `/profile/${router.query.id}?tab=reviews` : "/profile?tab=reviews"}`}>
                                                <div className={`profile_tab_link ${router.query.tab === "reviews" ? "profile_tab_link_active" : ""}`}>
                                                      <span>Reviews</span>
                                                </div>
                                          </Link>
                                    </> :
                                    // dropdown > More option container > for small view
                                    <div className='group relative'>
                                          {/* dropdown button */}
                                          <div className={`profile_tab_link flex gap-2 items-center ${(router.query.tab === "lists" || "about" || "video" || "photo" || "follower" || "following") ? "profile_tab_link_active" : ""}`}>
                                                <span>More</span>
                                                <FontAwesomeIcon
                                                      icon={faCaretDown}
                                                />
                                          </div>
                                          {/* dropdown lists */}
                                          <div className="absolute invisible group-hover:visible z-10 common_shadow p-0">
                                                <ul className='py-2 text-base font-medium text-gray-600'>
                                                      <Link href={`${router?.query?.id ? `/profile/${router.query.id}?tab=lists` : "/profile?tab=lists"}`}>
                                                            <li className='profile_tab_link_mobile'>Lists</li>
                                                      </Link>
                                                      <Link href={`${router?.query?.id ? `/profile/${router.query.id}?tab=about` : "/profile?tab=about"}`}>
                                                            <li className='profile_tab_link_mobile'>About</li>
                                                      </Link>
                                                      <Link href={`${router?.query?.id ? `/profile/${router.query.id}?tab=video` : "/profile?tab=video"}`}>
                                                            <li className='profile_tab_link_mobile'>Videos</li>
                                                      </Link>
                                                      <Link href={`${router?.query?.id ? `/profile/${router.query.id}?tab=photo` : "/profile?tab=photo"}`}>
                                                            <li className='profile_tab_link_mobile'>Photos</li>
                                                      </Link>
                                                      <Link href={`${router?.query?.id ? `/profile/${router.query.id}?tab=follower` : "/profile?tab=follower"}`}>
                                                            <li className='profile_tab_link_mobile'>Followers</li>
                                                      </Link>
                                                      <Link href={`${router?.query?.id ? `/profile/${router.query.id}?tab=following` : "/profile?tab=following"}`}>
                                                            <li className='profile_tab_link_mobile'>Following</li>
                                                      </Link>
                                                      <Link href={`${router?.query?.id ? `/profile/${router.query.id}?tab=reviews` : "/profile?tab=reviews"}`}>
                                                            <li className='profile_tab_link_mobile'>Reviews</li>
                                                      </Link>
                                                </ul>
                                          </div>
                                    </div>
                        }
                  </div>
            </div>
      );
};

export default ProfileTopArea;