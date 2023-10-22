import { useSession } from 'next-auth/react';
import React from 'react';
import { useGetNotificationsQuery } from '../../features/notification/notificationApi';
import NotificationChild from '../common/Navbar/NavRightSideElement/NotificationPopper/NotificationChild';

function NotificationHero() {
      const { data: session } = useSession();
      const { data } = useGetNotificationsQuery(session?.user?.email);
      return (
            <div className='w-full min-h-screen common_shadow'>
                  <div className='w-full mt-4 flex flex-col gap-4'>
                        {
                              data?.length ?
                                    <>
                                          {
                                                data?.map((n, i) => (
                                                      <NotificationChild
                                                            key={i}
                                                            notification={n}
                                                      />
                                                ))
                                          }
                                    </> :
                                    <h1>No Notification Available</h1>
                        }
                  </div>
            </div>
      )
}

export default NotificationHero