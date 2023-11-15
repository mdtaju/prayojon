import { Avatar } from '@mui/material';
import moment from 'moment/moment';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAddNotificationReadMutation } from '../../../../../features/notification/notificationApi';
import { useGetUserQuery } from '../../../../../features/profile/profileApi';

const NotificationChild = ({ notification = {} }) => {
      const { id, receiver_id, sender_id, message, link, read_status, created_at } = notification;
      const { data } = useGetUserQuery(sender_id);
      const [name, setName] = useState("");
      const [photo, setPhoto] = useState("");
      const router = useRouter();
      const [addNotificationRead] = useAddNotificationReadMutation();

      useEffect(() => {
            if (data) {
                  setName(data[0]?.name);
                  setPhoto(data[0]?.photo_url);
            }
      }, [data]);

      const handleRead = () => {
            addNotificationRead({
                  id,
                  receiver_id,
                  read_status: "Read",
                  isAll: false
            })
      }

      const handleClick = () => {
            handleRead()
            router.push(link)
      }

      return (
            <div onClick={handleClick} className='flex items-start gap-4 p-2 hover:bg-gray-100 rounded-lg cursor-pointer'>
                  <Avatar
                        alt="Remy Sharp"
                        src={photo}
                        sx={{ width: 40, height: 40 }}
                  />
                  <div>
                        <div>
                              <p className='text-base text-gray-400 leading-3'><span className='text-lg font-semibold text-gray-800 mr-1'>{name}</span> {message}</p>
                              <p className='text-sm text-gray-400 mt-1'>{moment(created_at).fromNow()}</p>
                              {/* <p className='text-sm text-gray-400'>26 mutual friends</p> */}
                        </div>
                        {/* <div className='flex items-center gap-2 mt-2'>
                              <button className='btn_primary'>Confirm</button>
                              <button className='btn_primary bg-gray-300 text-gray-800'>Delete</button>
                        </div> */}
                  </div>
                  {
                        read_status !== "Read" &&
                        <div className='p-1'>
                              <div className='w-[10px] h-[10px] rounded-full bg-orange-500'></div>
                        </div>
                  }
            </div>
      );
};

export default NotificationChild;