import { Avatar } from '@mui/material';
import moment from 'moment/moment';
import React, { useEffect, useState } from 'react';
import { useGetUserQuery } from '../../../../../features/profile/profileApi';

const NotificationChild = ({ notification = {} }) => {
      const { sender_id, message, created_at } = notification;
      const { data } = useGetUserQuery(sender_id);
      const [name, setName] = useState("");
      const [photo, setPhoto] = useState("");

      useEffect(() => {
            if (data) {
                  setName(data[0]?.name);
                  setPhoto(data[0]?.photo_url);
            }
      }, [data]);

      return (
            <div className='flex items-start gap-4'>
                  <Avatar
                        alt="Remy Sharp"
                        src={photo}
                        sx={{ width: 40, height: 40 }}
                  />
                  <div>
                        <div>
                              <p className='text-base text-gray-400 leading-3'><span className='text-lg font-semibold text-gray-900 mr-1'>{name}</span> {message}</p>
                              <p className='text-sm text-gray-400 mt-1'>{moment(created_at).fromNow()}</p>
                              {/* <p className='text-sm text-gray-400'>26 mutual friends</p> */}
                        </div>
                        {/* <div className='flex items-center gap-2 mt-2'>
                              <button className='btn_primary'>Confirm</button>
                              <button className='btn_primary bg-gray-300 text-gray-900'>Delete</button>
                        </div> */}
                  </div>
            </div>
      );
};

export default NotificationChild;