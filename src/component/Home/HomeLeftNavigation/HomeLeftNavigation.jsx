import { Skeleton } from '@mui/material';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useGetUserQuery } from '../../../features/profile/profileApi';
import HomeLeftMenuPrivate from './HomeLeftMenuPrivate';
import HomeLeftMenuPublic from './HomeLeftMenuPublic';

const HomeLeftNavigation = () => {
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

      if (session === undefined) {
            return (
                  <session className='w-[310px] md:w-[380px] h-screen overflow-hidden'>
                        <div
                              style={{ overscrollBehaviorY: 'contain' }}
                              className={`fixed w-[310px] md:w-[380px] h-full z-20 overflow-y-scroll custom_scrollbar px-4 py-3 pb-[70px] rounded-md`}
                        >
                              <div className='space-y-3'>
                                    {
                                          Array.from(Array(8)).map((_, i) => (
                                                <div key={i} className='common_shadow flex gap-4 items-center'>
                                                      <Skeleton variant="circular" width={40} height={40} />
                                                      <Skeleton variant="rounded" className='flex-1 rounded-lg' height={40} />
                                                </div>
                                          ))
                                    }
                              </div>
                        </div>
                  </session>
            )
      }

      return (
            <section
                  className={` w-[310px] md:w-[380px] h-screen overflow-hidden`}
            >
                  {/* Menus outer container position fixed */}
                  <div
                        style={{ overscrollBehaviorY: 'contain' }}
                        className={`md:fixed w-[310px] md:w-[380px]  h-full z-20 overflow-y-scroll custom_scrollbar px-0 sm:px-4 py-6 pb-[70px]  rounded-md`}
                  >
                        {/* Menus inner container */}
                        {
                              session ?

                                    <HomeLeftMenuPrivate /> :
                                    <HomeLeftMenuPublic />
                        }
                        {/* Shortcut container */}
                        <div className='my-2'>

                        </div>
                  </div>
            </section>
      );
};

export default HomeLeftNavigation;