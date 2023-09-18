import { faArrowRightFromBracket, faList, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const ProfilePopperBody = () => {
      const { data } = useSession();
      const router = useRouter();

      const logoutHandler = async () => {
            // if (data) {
            await signOut()
            // } 
            // else {
            //       router.replace("/login")
            // }
      }

      return (
            <div className='w-fit py-2'>
                  <div className='flex flex-col'>
                        {/* profile link */}
                        <Link href="/profile">
                              <div className='nav_sub_link_btn'>
                                    <FontAwesomeIcon
                                          icon={faUser}
                                    />
                                    <span>Profile</span>
                              </div>
                        </Link>
                        {/* dashboard link */}
                        <Link href="/dashboard">
                              <div className='nav_sub_link_btn'>
                                    <FontAwesomeIcon
                                          icon={faList}
                                    />
                                    <span>Dashboard</span>
                              </div>
                        </Link>
                        {/* logout handler */}
                        <div onClick={logoutHandler} className='nav_sub_link_btn'>
                              <FontAwesomeIcon
                                    icon={faArrowRightFromBracket}
                              />
                              <span>Log Out</span>
                        </div>
                  </div>
            </div>
      );
};

export default ProfilePopperBody;