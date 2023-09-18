import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faCaretDown, faUserCheck, faUserMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar } from '@mui/material';
import { useSession } from 'next-auth/react';
import Image from 'next/legacy/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useGetUserQuery } from '../../../features/profile/profileApi';
import { useAddFollowerMutation, useGetFollowingQuery, useUnfollowMutation } from '../../../features/userPost/userPostApi';
import useWindowSize from '../../../hook/useWindowSize';

const ProfileTopArea = ({ activeTab, setActiveTab, UID = "" }) => {
      const windowSize = useWindowSize();
      const router = useRouter();
      const [photo, setPhoto] = useState("");
      const [cover, setCover] = useState("");
      const [name, setName] = useState("");
      const [profession, setProfession] = useState("");
      const { data: authData } = useSession();
      const { data: getAuthUser } = useGetUserQuery(UID ? UID : authData?.user?.email);
      const [addFollower, { data }] = useAddFollowerMutation();
      const { data: getFollowing } = useGetFollowingQuery(authData?.user?.email);
      const [isFollow, setIsFollow] = useState(false);
      const [unfollow, { data: getUnfollow }] = useUnfollowMutation();

      // check is follow the user
      useEffect(() => {
            if (getFollowing) {
                  const getFollowingUser = getFollowing.find((u) => u.user_id == UID);
                  if (getFollowingUser) {
                        setIsFollow(true)
                  }
            }
      }, [getFollowing, UID]);

      // check is follow the user after unfollow action dispatch
      useEffect(() => {
            if (getUnfollow) {
                  setIsFollow(false)
            }
      }, [getUnfollow]);

      // get user's name, photo and cover-photo 
      useEffect(() => {
            console.log(getAuthUser)
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
            }
      }

      // handle unfollow 
      const handleUnFollow = () => {
            if (UID != authData?.user?.email) {
                  if (authData && getAuthUser[0]?.name) {
                        unfollow({
                              user_id: UID,
                              follower_id: authData?.user?.email?.toString()
                        })
                  } else {
                        handleClickOpen()
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
                        <div onClick={() => setActiveTab("post")} className={`profile_tab_link ${activeTab === "post" ? "profile_tab_link_active" : ""}`}>
                              <span>Timeline</span>
                        </div>
                        {
                              windowSize.width > 768 ?
                                    <>
                                          {/* tab list items for large view */}
                                          <div onClick={() => setActiveTab("lists")} className={`profile_tab_link ${activeTab === "lists" ? "profile_tab_link_active" : ""}`}>
                                                <span>Lists</span>
                                          </div>
                                          <div onClick={() => setActiveTab("about")} className={`profile_tab_link ${activeTab === "about" ? "profile_tab_link_active" : ""}`}>
                                                <span>About</span>
                                          </div>
                                          <div onClick={() => setActiveTab("video")} className={`profile_tab_link ${activeTab === "video" ? "profile_tab_link_active" : ""}`}>
                                                <span>Videos</span>
                                          </div>
                                          <div onClick={() => setActiveTab("photo")} className={`profile_tab_link ${activeTab === "photo" ? "profile_tab_link_active" : ""}`}>
                                                <span>Photos</span>
                                          </div>
                                          <div onClick={() => setActiveTab("follower")} className={`profile_tab_link ${activeTab === "follower" ? "profile_tab_link_active" : ""}`}>
                                                <span>Followers</span>
                                          </div>
                                          <div onClick={() => setActiveTab("following")} className={`profile_tab_link ${activeTab === "following" ? "profile_tab_link_active" : ""}`}>
                                                <span>Following</span>
                                          </div>
                                    </> :
                                    // dropdown > More option container > for small view
                                    <div className='group relative'>
                                          {/* dropdown button */}
                                          <div className={`profile_tab_link flex gap-2 items-center ${(activeTab === "lists" || "about" || "video" || "photo" || "follower" || "following") ? "profile_tab_link_active" : ""}`}>
                                                <span>More</span>
                                                <FontAwesomeIcon
                                                      icon={faCaretDown}
                                                />
                                          </div>
                                          {/* dropdown lists */}
                                          <div className="absolute invisible group-hover:visible z-10 common_shadow p-0">
                                                <ul className='py-2 text-base font-medium text-gray-600'>
                                                      <li onClick={() => setActiveTab("lists")} className='profile_tab_link_mobile'>Lists</li>
                                                      <li onClick={() => setActiveTab("about")} className='profile_tab_link_mobile'>About</li>
                                                      <li onClick={() => setActiveTab("video")} className='profile_tab_link_mobile'>Videos</li>
                                                      <li onClick={() => setActiveTab("photo")} className='profile_tab_link_mobile'>Photos</li>
                                                      <li onClick={() => setActiveTab("follower")} className='profile_tab_link_mobile'>Followers</li>
                                                      <li onClick={() => setActiveTab("following")} className='profile_tab_link_mobile'>Following</li>
                                                </ul>
                                          </div>
                                    </div>
                        }
                  </div>
            </div>
      );
};

export default ProfileTopArea;