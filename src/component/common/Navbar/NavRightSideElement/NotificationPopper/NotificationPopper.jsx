import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSession } from 'next-auth/react';
import React from 'react';
import { useGetNotificationsQuery } from '../../../../../features/notification/notificationApi';
import NotificationChild from './NotificationChild';

const NotificationPopper = () => {
      const { data: session } = useSession();
      const { data } = useGetNotificationsQuery(session?.user?.email);

      return (
            <div
                  className='w-[340px] px-3 py-2'>
                  {/* Notification head area */}
                  <div className='flex flex-col gap-2'>
                        <div className='flex items-center justify-between'>
                              <div><h1 className='text-lg font-bold text-gray-900'>Notifications</h1></div>
                              <div>
                                    <FontAwesomeIcon
                                          icon={faEllipsis}
                                    />
                              </div>
                        </div>
                        <div className='flex gap-3 items-center'>
                              <div className='py-1 px-3 rounded-full bg-primary bg-opacity-10 text-base font-medium text-primary cursor-pointer'>All</div>
                              <div className='py-1 px-3 rounded-full text-base font-medium hover:bg-gray-100 cursor-pointer'>Unread</div>
                        </div>
                  </div>
                  {/* Notification body area */}
                  <div className='w-full mt-4 flex flex-col gap-4'>
                        {
                              data?.map((n, i) => (
                                    <NotificationChild
                                          key={i}
                                          notification={n}
                                    />
                              ))
                        }
                  </div>
            </div>
      );
};

export default NotificationPopper;