import {
      faBell
} from "@fortawesome/free-solid-svg-icons";
import { Skeleton } from "@mui/material";
import dynamic from "next/dynamic";
import React from 'react';
// import CustomSkeleton from "../CustomSkeleton";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
// import cartIcon from "../../../../public/images/home_cart.svg";
// import homeIcon from "../../../../public/images/home_home.svg";
// import marketPlaceIcon from "../../../../public/images/home_marketplace.svg";
import { useGetNotificationsQuery } from "../../../features/notification/notificationApi";
import MobileNav from "./MobileNav/MobileNav";
import NavMiddleElement from "./NavMiddleElement";
import NavRightSideElement from "./NavRightSideElement/NavRightSideElement";
import NotificationPopper from "./NavRightSideElement/NotificationPopper/NotificationPopper";
import ProfilePopperBody from "./NavRightSideElement/ProfilePopperBody";
const NavLeftElement = dynamic(() => import('./NavLeftElement/NavLeftElement'), {
      loading: () => <Skeleton variant="rounded" width={110} height={20} />,
      ssr: false,
})

const Navbar = () => {
      const { data } = useSession();
      const { data: notifications = [] } = useGetNotificationsQuery(data?.user?.email);
      const [unreadNotifications, setUnreadNotifications] = useState(0);

      useEffect(() => {
            if (notifications.length) {
                  const getUnreadItems = notifications.filter((notification) => notification.read_status === "Unread");
                  setUnreadNotifications(getUnreadItems.length)
            }
      }, [notifications]);
      return (
            // {/* There are three part in header */}
            <header className='w-full h-[90px] md:h-[60px] sticky md:fixed top-0 shadow-md flex items-center bg-white z-50'>
                  {/* Inner container for large screen */}
                  <div className="hidden md:flex container mx-auto items-center justify-between h-full">

                        {/* Part one contain logo and search box */}
                        <div className="flex items-center gap-2 w-[302px]">
                              {/* SearchBar Component */}
                              <NavLeftElement />
                        </div>

                        {/* Part two contain middle nav */}
                        <div className="w-[790px] h-full grid place-items-center">
                              <ul className="flex w-fit h-full mx-auto items-center gap-2">
                                    <NavMiddleElement
                                          toolTitle={"Home"}
                                          Icon={""}
                                          activeLink={"/"}
                                    />
                                    {/* <NavMiddleElement
                                          toolTitle={"Watch"}
                                          Icon={faTv}
                                          activeLink={"/watch"}
                                    /> */}
                                    <NavMiddleElement
                                          toolTitle={"Marketplace"}
                                          Icon={""}
                                          activeLink={"/marketplace"}
                                    />
                                    <NavMiddleElement
                                          toolTitle={"Cart"}
                                          Icon={""}
                                          activeLink={"/cart"}
                                    />
                              </ul>
                        </div>

                        {/* Part three contain right nav */}
                        <div className="w-[302px] h-full flex items-center justify-end">
                              <ul className="h-full flex items-center gap-3">
                                    {/* Profile Component */}
                                    {
                                          data ?
                                                <>
                                                      {/* Notification Component */}
                                                      <NavRightSideElement
                                                            toolTitle={"Notifications"}
                                                            countValue={unreadNotifications}
                                                            Icon={faBell}
                                                      >
                                                            <NotificationPopper />
                                                      </NavRightSideElement>
                                                      <NavRightSideElement
                                                            toolTitle={"Profile"}
                                                      >
                                                            <ProfilePopperBody />
                                                      </NavRightSideElement>
                                                </>
                                                :
                                                <div className="flex items-center gap-4">
                                                      <Link href={"/login"}>
                                                            <button className="btn_primary">
                                                                  LOGIN
                                                            </button>
                                                      </Link>
                                                      <Link href={"/login"}>
                                                            <button className="btn_primary bg-white border border-primary text-primary hover:bg-primary hover:text-white">
                                                                  SIGN UP
                                                            </button>
                                                      </Link>
                                                </div>
                                    }
                              </ul>
                        </div>
                  </div>

                  {/* Mobile nav component */}
                  <MobileNav
                        countValue={unreadNotifications}
                  />
            </header>
      );
};

export default Navbar;