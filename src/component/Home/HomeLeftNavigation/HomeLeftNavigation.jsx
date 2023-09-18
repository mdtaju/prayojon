import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useGetUserQuery } from '../../../features/profile/profileApi';
import HomeLeftMenuPrivate from './HomeLeftMenuPrivate';
import HomeLeftMenuPublic from './HomeLeftMenuPublic';

const HomeLeftNavigation = () => {
      const [menuShowToggle, setMenuShowToggle] = useState(false);
      const [shortcutShowToggle, setShortcutShowToggle] = useState(false);
      const [shortcutsInfo, setShortcutsInfo] = useState([]);
      const { data: session } = useSession();
      const [name, setName] = useState("");
      const [photo, setPhoto] = useState("");
      const { data: getUser } = useGetUserQuery(session?.user?.email);

      useEffect(() => {
            if (session && getUser) {
                  setName(getUser[0]?.name);
                  setPhoto(getUser[0]?.photo_url);
            }
      }, [session, getUser]);

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
                        className={`md:fixed w-[310px] h-full z-20 overflow-y-scroll custom_scrollbar px-0 sm:px-4 py-3 pb-[70px]  rounded-md`}
                  >
                        {/* Menus inner container */}
                        {
                              session ?

                                    <HomeLeftMenuPrivate /> :
                                    <HomeLeftMenuPublic />
                        }
                        {/* Shortcut container */}
                        <div className='my-2'>
                              {/* <div className='ml-4 mb-2'>
                                    <span className='text-lg text-gray-600 font-semibold'>Your Shortcuts</span>
                              </div>
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
                              } */}
                              {/* Toggle of show more show less shortcuts */}
                              {/* <ShowToggleBtn
                                    state={shortcutShowToggle}
                                    setState={setShortcutShowToggle}
                              /> */}
                              {/* Footer */}
                              {/* <div className='ml-4 mt-2'>
                                    <p className='text-sm text-gray-600 font-medium'>
                                          <span className='cursor-pointer hover:underline'>Privacy & Policy</span>
                                          {" . "}
                                          <span className='cursor-pointer hover:underline'>Terms & Condition</span>
                                          {" . "}
                                          <span className='cursor-pointer hover:underline'>Cookies</span>
                                          {" . "}
                                          <span className='cursor-pointer hover:underline'>Copyright Prayojon 2023</span>
                                    </p>
                              </div> */}
                        </div>
                  </div>
            </section>
      );
};

export default HomeLeftNavigation;