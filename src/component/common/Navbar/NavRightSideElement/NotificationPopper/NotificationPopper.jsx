import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useAddNotificationReadMutation, useGetNotificationsQuery } from '../../../../../features/notification/notificationApi';
import NotificationChild from './NotificationChild';

const NotificationPopper = () => {
      const { data: session } = useSession();
      const { data } = useGetNotificationsQuery(session?.user?.email);
      const [tab, setTab] = useState("all");
      const [notifications, setNotifications] = useState([]);
      const [addNotificationRead] = useAddNotificationReadMutation();

      useEffect(() => {
            if (data) {
                  if (tab === "unread") {
                        const getFilterNotification = data?.filter((item) => item?.read_status === "Unread");
                        setNotifications(getFilterNotification);
                  } else {
                        setNotifications(data);
                  }
            }
      }, [tab, data]);

      const allReadHandler = () => {
            addNotificationRead({
                  id: "",
                  receiver_id: notifications[0]?.receiver_id,
                  read_status: "Read",
                  isAll: true
            })
      }
      return (
            <div
                  className='w-[340px] px-3 py-2'>
                  {/* Notification head area */}
                  <div className='flex flex-col gap-2 pb-4 border-b border-gray-200'>
                        <div className='flex items-center justify-between'>
                              <div><h1 className='text-lg font-bold text-gray-800'>Notifications</h1></div>
                              {/* <div>
                                    <FontAwesomeIcon
                                          icon={faEllipsis}
                                    />
                              </div> */}
                        </div>
                        <div className='flex gap-3 items-center'>
                              <div onClick={() => setTab("all")} className={`py-1 px-3 rounded-full  text-base font-medium  cursor-pointer ${tab === "all" ? "bg-primary bg-opacity-10 text-primary" : "hover:bg-gray-100 border border-gray-200"}`}>All</div>
                              <div onClick={() => setTab("unread")} className={`py-1 px-3 rounded-full  text-base font-medium  cursor-pointer ${tab === "unread" ? "bg-primary bg-opacity-10 text-primary" : "hover:bg-gray-100 border border-gray-200"}`}>Unread</div>
                              <div onClick={allReadHandler} className='py-1 px-3 rounded-full text-base font-medium hover:bg-gray-100 cursor-pointer border border-gray-200'>Mark as all read</div>

                        </div>
                  </div>
                  {/* Notification body area */}
                  <div className='w-full mt-4 flex flex-col gap-4'>
                        {
                              notifications?.map((n, i) => (
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