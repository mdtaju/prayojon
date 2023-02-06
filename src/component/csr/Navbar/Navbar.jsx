import {
      faBell,
      faCartShopping,
      faHouse, faMessage,
      faStore,
      faTv
} from "@fortawesome/free-solid-svg-icons";
import dynamic from "next/dynamic";
import React from 'react';
import MobileNav from "./MobileNav/MobileNav";
import Styles from './Navbar.module.scss';
// import NavLeftElement from "./NavLeftElement";
import NavMiddleElement from "./NavMiddleElement";
import NavRightSideElement from "./NavRightSideElement";
const NavLeftElement = dynamic(() => import('./NavLeftElement'), {
      ssr: false,
})

const Navbar = () => {
      return (
            // {/* There are three part in header */}
            <header className='w-full h-[90px] md:h-[60px] sticky md:fixed top-0 shadow-md flex items-center bg-white'>
                  {/* Inner container for large screen */}
                  <div className="hidden md:flex container mx-auto items-center justify-between h-full">

                        {/* Part one contain logo and search box */}
                        <div className="flex items-center gap-2 w-[302px]">
                              <p className={Styles.pri_color}>Logo</p>
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
                                          <h1>Notifications</h1>
                                    </NavRightSideElement>
                                    {/* Profile Component */}
                                    <NavRightSideElement
                                          toolTitle={"Profile"}
                                    >
                                          <h1>Profile</h1>
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