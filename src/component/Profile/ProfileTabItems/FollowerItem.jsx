import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import Image from 'next/legacy/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useGetUserQuery } from '../../../features/profile/profileApi';

const FollowerItem = ({ follower = {}, from }) => {
      const { user_id, follower_id, started_at } = follower;
      const { data = [] } = useGetUserQuery(from === "follower" ? follower_id : user_id);
      const [photo, setPhoto] = useState("");
      const [name, setName] = useState("");
      const [id, setId] = useState("");

      useEffect(() => {
            if (data?.length !== 0) {
                  setPhoto(data[0].photo_url);
                  setName(data[0].name);
                  setId(data[0].id)
            }
      }, [data]);

      return (
            <div className='w-full flex items-center gap-3 p-2 border border-gray-300 rounded-md'>
                  {/* user image */}
                  <div className='grow-0 w-[80px] h-[80px] cursor-pointer relative'>
                        <Image
                              src={photo}
                              alt='profile'
                              layout='fill'
                              className='w-full h-full object-cover object-center rounded-md'
                        />
                  </div>
                  {/* user name */}
                  <div className='grow flex items-center justify-between'>
                        <div>
                              <Link href={`/profile/${id}`}>

                                    <h2 className='text-lg font-semibold leading-[12px] cursor-pointer hover:underline'>{name}</h2>
                              </Link>
                              <span className='text-sm text-gray-600'>From {moment(started_at).fromNow()}</span>
                        </div>
                        <div className='p-2 cursor-pointer'>
                              <FontAwesomeIcon
                                    icon={faEllipsis}
                              />
                        </div>
                  </div>
            </div>
      );
};

export default FollowerItem;