import { Avatar } from '@mui/material';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useAddFollowerMutation, useGetFollowingQuery, useUnfollowMutation } from '../../../features/userPost/userPostApi';
import { useGetUserQuery } from '../../../features/profile/profileApi';
import { useAddNotificationMutation } from '../../../features/notification/notificationApi';

const TopSellerCard = ({ people = {} }) => {
      const { id, name, photo_url, profession, city, rating, sales } = people;
      const [addFollower] = useAddFollowerMutation();
      const { data: session } = useSession();
      const { data: getAuthUser } = useGetUserQuery(session?.user?.email);

      const [addNotification] = useAddNotificationMutation();
      const { data: getFollowing } = useGetFollowingQuery(session?.user?.email);
      const [unfollow] = useUnfollowMutation();
      const [isFollow, setIsFollow] = useState(false);
      const d = new Date();

      // check is follow the user
      useEffect(() => {
            if (getFollowing) {
                  const getFollowingUser = getFollowing.find((u) => u.user_id == id);
                  if (getFollowingUser) {
                        setIsFollow(true)
                  }
            }
      }, [getFollowing, id]);

      // handle addFollower
      const handleFollower = () => {
            if (session && getAuthUser[0]?.name) {
                  addFollower({
                        user_id: id,
                        followerId: session?.user?.email
                  })
                  addNotification({
                        sender_id: session?.user?.email,
                        receiver_id: id,
                        message: "following you",
                        link: `/profile/${session?.user?.email}`,
                        date: d.toUTCString()
                  })
            } else {
                  handleClickOpen()
            }
      }

      // handle unfollow 
      const handleUnFollow = () => {
            if (session && getAuthUser[0]?.name) {
                  unfollow({
                        user_id: id,
                        follower_id: session?.user?.email?.toString()
                  })
                  addNotification({
                        sender_id: session?.user?.email,
                        receiver_id: id,
                        message: "following you",
                        link: `/profile/${session?.user?.email}`,
                        date: d.toUTCString()
                  })
            } else {
                  handleClickOpen()
            }
      }
      return (
            <div className='flex items-start gap-4'>
                  <Avatar
                        alt="Remy Sharp"
                        src={photo_url}
                        sx={{ width: 40, height: 40 }}
                        variant='rounded'
                  />
                  <div className='flex items-start justify-between gap-6 flex-1'>
                        <div className='flex flex-col items-start'>
                              <span className='text-base leading-[20px] font-semibold text-gray-800 mr-1'>{name}</span>
                              <span>{profession}</span>
                        </div>
                        {
                              isFollow ?
                                    <button onClick={handleUnFollow} className='btn_primary px-2 py-1 bg-transparent border border-primary rounded-md text-primary'>Unfollow</button> :
                                    <button onClick={handleFollower} className='btn_primary px-2 py-1 bg-transparent border border-primary rounded-md text-primary'>Follow</button>
                        }
                  </div>
            </div>
      );
};

export default TopSellerCard;