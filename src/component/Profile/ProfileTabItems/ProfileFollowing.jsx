import { useSession } from 'next-auth/react';
import React from 'react';
import { useGetFollowingQuery } from '../../../features/userPost/userPostApi';
import FollowerItem from './FollowerItem';

const ProfileFollowing = ({ UID }) => {
      const { data: session } = useSession();
      const { data: followers } = useGetFollowingQuery(UID ? UID : session?.user?.email);
      return (
            <div className='w-full md:w-[80%] max-w-[1536px] mx-auto common_shadow my-5'>
                  <h1 className="mt-4 text-xl font-semibold text-gray-800">Following</h1>
                  <div className='w-full mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 place-content-center'>
                        {
                              followers && followers?.map((f, i) => (
                                    <FollowerItem key={i} follower={f} from="following" />
                              ))
                        }
                  </div>
            </div>
      );
};

export default ProfileFollowing;