import { faArrowRightFromBracket, faCartShopping, faCircleQuestion, faList, faStore } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar } from '@mui/material';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useGetNearPeopleQuery, useGetUserQuery } from '../../../features/profile/profileApi';
import useWindowSize from '../../../hook/useWindowSize';
import HomeLeftOptionChild from './HomeLeftMenuChild';
import HomeLeftSidePeople from './HomeLeftSidePeople';
import HomeIcon from "../../../../public/web-icons/menu_icons/menu_home.svg";
import MarketPlaceIcon from "../../../../public/web-icons/menu_icons/home_marketplace.svg";
import CartIcon from "../../../../public/web-icons/menu_icons/home_cart.svg";
import NotificationIcon from "../../../../public/web-icons/menu_icons/menu_notification.svg";
import FollowingIcon from "../../../../public/web-icons/menu_icons/menu_following.svg";
import FollowIcon from "../../../../public/web-icons/menu_icons/menu_follow.svg";
import HelpIcon from "../../../../public/web-icons/menu_icons/menu_help.svg";
import DashboardIcon from "../../../../public/web-icons/menu_icons/dashboard.png";

const sideMenuItems = [
      {
            path: "/",
            Icon: HomeIcon,
            title: "Home"
      },
      {
            path: "/marketplace",
            Icon: MarketPlaceIcon,
            title: "Marketplace"
      },
      {
            path: "/cart",
            Icon: CartIcon,
            title: "Cart"
      },
      {
            path: "/notification",
            Icon: NotificationIcon,
            title: "Notifications"
      },
      {
            path: "/profile?tab=following",
            Icon: FollowingIcon,
            title: "Following"
      },
      {
            path: "/profile?tab=follower",
            Icon: FollowIcon,
            title: "Follow"
      },
      {
            path: "/dashboard/help",
            Icon: HelpIcon,
            title: "Help"
      },
]


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
            <div className='space-y-8'>
                  <div className='pt-8 pb-4 common_shadow px-0 rounded-sm'>
                        {/* Profile menu */}
                        <div className='flex items-center gap-2 px-8 cursor-pointer transition-all duration-150 mb-4'>
                              {
                                    session ?
                                          <Link className='w-full flex items-center gap-2' href={`/profile`}>
                                                <Avatar
                                                      alt="Remy Sharp"
                                                      src={photo}
                                                      sx={{ width: 32, height: 32 }}
                                                />
                                                <span className='text-base text-gray-800 font-semibold'>{name}</span>
                                          </Link> :
                                          <Link className='w-full' href={`/register`}>
                                                <button className='btn_primary w-full'>Signup</button>
                                          </Link>
                              }
                        </div>

                        {
                              windowSize.width <= 425 &&
                              <HomeLeftOptionChild
                                    Icon={DashboardIcon}
                                    title={"Dashboard"}
                                    link={"/dashboard"}
                              />
                        }
                        {
                              sideMenuItems.map((item, i) => (

                                    <HomeLeftOptionChild
                                          key={i}
                                          Icon={item.Icon}
                                          title={item.title}
                                          link={item.path}
                                    />
                              ))
                        }
                        {
                              windowSize.width <= 425 &&
                              <div onClick={logoutHandler} className='mt-2 p-4 py-3 flex items-center gap-2 bg-white hover:bg-gray-100 rounded-md cursor-pointer transition-all duration-150'>
                                    <FontAwesomeIcon
                                          icon={faArrowRightFromBracket}
                                          className="text-[22px] w-6 h-6 text-primary px-[3px]"
                                    />
                                    <span className='text-base text-gray-800 font-semibold'>Logout</span>
                              </div>
                        }
                  </div>

                  {/* Menus end line bar */}
                  <div className='common_shadow rounded-sm p-0'>
                        <div className='p-4 border-b border-gray-300'>
                              <h1 className="text-gray-800 font-bold text-base">Nearby People</h1>
                        </div>
                        {
                              nearPeoples?.map((people, i) => (
                                    <HomeLeftSidePeople
                                          user={people}
                                          key={i}
                                    />
                              ))
                        }
                  </div>
                  {/* bottom links */}
                  <div className='hidden md:flex items-center justify-between w-full gap-2 text-sm px-4'>
                        <span className='hover:text-primary hover:underline cursor-pointer'>About us</span>
                        <span className='hover:text-primary hover:underline cursor-pointer'>Terms & Condition</span>
                        <span className='hover:text-primary hover:underline cursor-pointer'>Privacy Policy</span>
                  </div>
            </div>
      );
};

export default HomeLeftMenuPrivate