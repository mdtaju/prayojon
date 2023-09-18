import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useGetUserQuery } from '../../../features/profile/profileApi';

const EditSecurityInfo = () => {
      const [phone, setPhone] = useState("");
      const [password, setPassword] = useState("");
      const [see, setSee] = useState(false);
      const { data: authData } = useSession();
      const { data: getAuthUser } = useGetUserQuery(authData?.user?.email);

      // get auth users id and password 
      useEffect(() => {
            if (getAuthUser && getAuthUser[0]?.auth_user_id) {
                  setPhone(getAuthUser[0].auth_user_id);
            }
            if (getAuthUser && getAuthUser[0]?.password) {
                  setPassword(getAuthUser[0]?.password);
            }
      }, [getAuthUser]);

      const handleSubmit = (e) => {
            e.preventDefault();
      }
      return (
            <div className='w-full'>
                  <div className='w-full pb-2 border-b border-gray-300'>
                        <h1 className='text-lg font-semibold text-gray-800'>Security Info</h1>
                        <span className='text-sm font-medium text-gray-600'>Edit your personal information.</span>
                  </div>
                  <form onSubmit={handleSubmit}>
                        <div className='w-full mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4'>
                              {/* user name input */}
                              <div className='flex flex-col gap-1'>
                                    <label className='text-sm font-semibold text-gray-600' htmlFor="profile_user_name">Phone / Email *</label>
                                    <input required value={phone} onChange={(e) => setPhone(e.target.value)} className='outline-none py-1 px-2 border border-gray-300 rounded-md' type="text" placeholder='Your name' id='profile_user_name' />
                              </div>
                              {/* user address input */}
                              <div className='flex flex-col gap-1'>
                                    <label className='text-sm font-semibold text-gray-600' htmlFor="profile_user_name">Password</label>
                                    <div className='relative w-full h-full'>
                                          <input value={password} onChange={e => setPassword(e.target.value)} className='outline-none py-1 px-2 border border-gray-300 rounded-md absolute w-full' type={!see ? "password" : "text"} placeholder='Your address' id='profile_user_name' />
                                          <button onClick={() => setSee((prev) => !prev)} className='absolute right-2 top-1 w-[25px] h-[25px] grid place-items-center rounded-full bg-gray-200'>
                                                <FontAwesomeIcon
                                                      icon={!see ? faEye : faEyeSlash}
                                                />
                                          </button>
                                    </div>
                              </div>
                        </div>
                        <div className='text-center py-6'>
                              <button className='btn_primary' type="submit">Submit Your Data</button>
                        </div>
                  </form>
            </div>
      );
};

export default EditSecurityInfo;