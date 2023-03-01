import { faCartShopping, faClock, faMessage, faStore, faTv, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import HomeLeftOptionChild from './HomeLeftMenuChild';
import HomeLeftShortcutChild from './HomeLeftShortcutChild';
import ShowToggleBtn from './ShowToggleBtn';

const HomeLeftNavigation = () => {
      const [menuShowToggle, setMenuShowToggle] = useState(false);
      const [shortcutShowToggle, setShortcutShowToggle] = useState(false);
      const [shortcutsInfo, setShortcutsInfo] = useState([]);

      useEffect(() => {
            const arr = [
                  {
                        img: 'img',
                        title: "Abdur Rahman"
                  },
                  {
                        img: 'img',
                        title: "Ms. Hasina"
                  },
                  {
                        img: 'img',
                        title: "Mohammad Tajuddin"
                  },
                  {
                        img: 'img',
                        title: "Korimullah"
                  },
                  {
                        img: 'img',
                        title: "Ahmadullah"
                  },
            ]
            setShortcutsInfo(arr)
      }, [])

      return (
            <section
                  className={`w-[310px] h-screen overflow-hidden`}
            >
                  {/* Menus outer container position fixed */}
                  <div
                        style={{ overscrollBehaviorY: 'contain' }}
                        className={`md:fixed w-[310px] h-full z-20 overflow-y-scroll custom_scrollbar px-0 sm:px-4 py-3 pb-[70px]`}
                  >
                        {/* Menus inner container */}
                        <div>
                              {/* Profile menu */}
                              <div className='p-4 py-2 flex items-center gap-2 bg-transparent hover:bg-gray-300 rounded-md cursor-pointer transition-all duration-150'>
                                    <Avatar
                                          alt="Remy Sharp"
                                          //   src="/static/images/avatar/1.jpg"
                                          sx={{ width: 32, height: 32 }}
                                    />
                                    <span className='text-base text-gray-900 font-semibold'>Abdullah</span>
                              </div>
                              {/* Menus components */}
                              <HomeLeftOptionChild
                                    Icon={faUserGroup}
                                    title={"Friends"}
                              />
                              <HomeLeftOptionChild
                                    Icon={faStore}
                                    title={"Marketplace"}
                              />
                              <HomeLeftOptionChild
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
                              />
                              {
                                    menuShowToggle &&
                                    <HomeLeftOptionChild
                                          Icon={faCartShopping}
                                          title={"Cart"}
                                    />
                              }
                              {/* Toggle of show more show less menus */}
                              <ShowToggleBtn
                                    state={menuShowToggle}
                                    setState={setMenuShowToggle}
                              />
                              {/* Menus end line bar */}
                              <div className='h-[1px] w-full bg-gray-300 mt-2'></div>
                        </div>
                        {/* Shortcut container */}
                        <div className='my-2'>
                              <div className='ml-4 mb-2'>
                                    <span className='text-lg text-gray-600 font-semibold'>Your Shortcuts</span>
                              </div>
                              {/* shortcut menu components */}
                              {
                                    shortcutShowToggle ?
                                          shortcutsInfo.map((info, i) => (
                                                <HomeLeftShortcutChild
                                                      key={i}
                                                      Img={info.img}
                                                      title={info.title}
                                                />
                                          )) :
                                          shortcutsInfo.slice(0, 4).map((info, i) => (
                                                <HomeLeftShortcutChild
                                                      key={i}
                                                      Img={info.img}
                                                      title={info.title}
                                                />
                                          ))
                              }
                              {/* Toggle of show more show less shortcuts */}
                              <ShowToggleBtn
                                    state={shortcutShowToggle}
                                    setState={setShortcutShowToggle}
                              />
                              {/* Footer */}
                              <div className='ml-4 mt-2'>
                                    <p className='text-sm text-gray-600 font-medium'>
                                          <span className='cursor-pointer hover:underline'>Privacy & Policy</span>
                                          {" . "}
                                          <span className='cursor-pointer hover:underline'>Terms & Condition</span>
                                          {" . "}
                                          <span className='cursor-pointer hover:underline'>Cookies</span>
                                          {" . "}
                                          <span className='cursor-pointer hover:underline'>Copyright Prayojon 2023</span>
                                    </p>
                              </div>
                        </div>
                  </div>
            </section>
      );
};

export default HomeLeftNavigation;