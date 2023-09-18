import { useSession } from 'next-auth/react';
import React from 'react';
import { useGetFollowerQuery } from '../../../features/userPost/userPostApi';
import FollowerItem from './FollowerItem';

const ProfileFollowers = ({ UID }) => {
      const { data: session } = useSession();
      const { data: followers } = useGetFollowerQuery(UID ? UID : session?.user?.email);

      return (
            <div className='w-full md:w-[80%] max-w-[1536px] mx-auto common_shadow my-5'>
                  <h1 className='mt-4 text-xl font-semibold text-gray-900'>Followers</h1>
                  <div className='w-full mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 place-content-center'>
                        {
                              followers && followers?.map((f, i) => (
                                    <FollowerItem key={i} follower={f} from="follower" />
                              ))
                        }
                  </div>
            </div>
      );
};

export default ProfileFollowers;