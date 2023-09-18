import { faArrowRightFromBracket, faCartShopping, faList, faStore } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar } from '@mui/material';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { memo, useEffect, useState } from 'react';
import { useGetNearPeopleQuery, useGetUserQuery } from '../../../features/profile/profileApi';
import useWindowSize from '../../../hook/useWindowSize';
import HomeLeftOptionChild from './HomeLeftMenuChild';
import HomeLeftSidePeople from './HomeLeftSidePeople';

const HomeLeftMenuPrivate = () => {
      const { data: session } = useSession();
      const { data: getUser } = useGetUserQuery(session?.user?.email);
      const { data: nearPeoples } = useGetNearPeopleQuery(session?.user?.email);
      const [name, setName] = useState("");
      const [photo, setPhoto] = useState("");
      const windowSize = useWindowSize();

      useEffect(() => {
            if (session && getUser) {
                  setName(getUser[0]?.name);
                  setPhoto(getUser[0]?.photo_url);
            }
      }, [session, getUser]);

      const logoutHandler = async () => {
            await signOut()
      }
      return (
            <div>
                  {/* Profile menu */}
                  <div className='p-4 py-2 flex items-center gap-2 bg-white hover:bg-gray-100 rounded-md cursor-pointer transition-all duration-150'>
                        {
                              session ?
                                    <Link className='w-full flex items-center gap-2' href={`/profile`}>
                                          <Avatar
                                                alt="Remy Sharp"
                                                src={photo}
                                                sx={{ width: 32, height: 32 }}
                                          />
                                          <span className='text-base text-gray-900 font-semibold'>{name}</span>
                                    </Link> :
                                    <Link className='w-full' href={`/register`}>
                                          <button className='btn_primary w-full'>Signup</button>
                                    </Link>
                        }
                  </div>
                  {/* Menus components */}
                  {/* <HomeLeftOptionChild
                                    Icon={faUserGroup}
                                    title={"Friends"}
                              /> */}
                  {
                        windowSize.width <= 425 &&
                        <HomeLeftOptionChild
                              Icon={faList}
                              title={"Dashboard"}
                              link={"/dashboard"}
                        />
                  }

                  <HomeLeftOptionChild
                        Icon={faStore}
                        title={"Marketplace"}
                        link={"/marketplace"}
                  />
                  {/* <HomeLeftOptionChild
                                    Icon={faClock}
                                    title={"Most Recent"}
                              />
                              <HomeLeftOptionChild
                                    Icon={faMessage}
                                    title={"Messages"}
                              />
                              <HomeLeftOptionChild
                                    Icon={faTv}
                                    title={"Watch"}
                              /> */}
                  {/* {
                                    menuShowToggle && */}

                  <HomeLeftOptionChild
                        Icon={faCartShopping}
                        title={"Cart"}
                        link={"/cart"}
                  />
                  {
                        windowSize.width <= 425 &&
                        <div onClick={logoutHandler} className='mt-2 p-4 py-3 flex items-center gap-2 bg-white hover:bg-gray-100 rounded-md cursor-pointer transition-all duration-150'>
                              <FontAwesomeIcon
                                    icon={faArrowRightFromBracket}
                                    className="text-[22px] w-6 h-6 text-primary px-[3px]"
                              />
                              <span className='text-base text-gray-900 font-semibold'>Logout</span>
                        </div>
                  }

                  {/* } */}
                  {/* Toggle of show more show less menus */}
                  {/* <ShowToggleBtn
                                    state={menuShowToggle}
                                    setState={setMenuShowToggle}
                              /> */}
                  {/* Menus end line bar */}
                  <div className='h-[1px] w-full bg-gray-300 mt-2'></div>
                  <h1 className="text-gray-800 font-bold text-base my-3">Nearby People</h1>
                  {
                        nearPeoples?.map((people, i) => (
                              <HomeLeftSidePeople
                                    user={people}
                                    key={i}
                              />
                        ))
                  }
            </div>
      );
};

export default memo(HomeLeftMenuPrivate);