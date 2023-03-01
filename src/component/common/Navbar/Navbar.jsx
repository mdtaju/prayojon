import {
      faBell,
      faCartShopping,
      faHouse, faMessage,
      faStore,
      faTv
} from "@fortawesome/free-solid-svg-icons";
import { Skeleton } from "@mui/material";
import dynamic from "next/dynamic";
import React from 'react';
// import CustomSkeleton from "../CustomSkeleton";
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
                                          Icon={faHouse}
                                          activeLink={"/"}
                                    />
                                    <NavMiddleElement
                                          toolTitle={"Watch"}
                                          Icon={faTv}
                                          activeLink={"/watch"}
                                    />
                                    <NavMiddleElement
                                          toolTitle={"Marketplace"}
                                          Icon={faStore}
                                          activeLink={"/marketplace"}
                                    />
                                    <NavMiddleElement
                                          toolTitle={"Cart"}
                                          Icon={faCartShopping}
                                          activeLink={"/cart"}
                                    />
                              </ul>
                        </div>

                        {/* Part three contain right nav */}
                        <div className="w-[302px] h-full flex items-center justify-end">
                              <ul className="h-full flex items-center gap-3">
                                    {/* Message Component */}
                                    <NavRightSideElement
                                          toolTitle={"Messages"}
                                          countValue={4}
                                          Icon={faMessage}
                                    >
                                          <h1>Messages</h1>
                                    </NavRightSideElement>
                                    {/* Notification Component */}
                                    <NavRightSideElement
                                          toolTitle={"Notifications"}
                                          countValue={0}
                                          Icon={faBell}
                                    >
                                          <NotificationPopper />
                                    </NavRightSideElement>
                                    {/* Profile Component */}
                                    <NavRightSideElement
                                          toolTitle={"Profile"}
                                    >
                                          <ProfilePopperBody />
                                    </NavRightSideElement>
                              </ul>
                        </div>
                  </div>

                  {/* Mobile nav component */}
                  <MobileNav />
            </header>
      );
};

export default Navbar;