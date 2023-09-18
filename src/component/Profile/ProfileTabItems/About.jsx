import { faAddressCard } from '@fortawesome/free-regular-svg-icons';
import { faBuildingFlag, faCalendarDays, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment/moment';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useGetUserQuery } from '../../../features/profile/profileApi';

const About = ({ UID = false }) => {
      const { data: authData } = useSession();
      const { data: getAuthUser } = useGetUserQuery(UID ? UID : authData?.user?.email);
      const [city, setCity] = useState("");
      const [address, setAddress] = useState("");
      const [birthday, setBirthday] = useState("");
      const [bio, setBio] = useState("");

      useEffect(() => {
            if (getAuthUser && getAuthUser[0]?.city) {
                  setCity(getAuthUser[0].city);
            }
            if (getAuthUser && getAuthUser[0]?.address) {
                  setAddress(getAuthUser[0]?.address);
            }
            if (getAuthUser && getAuthUser[0]?.birthday) {
                  setBirthday(getAuthUser[0]?.birthday);
            }
            if (getAuthUser && getAuthUser[0]?.bio) {
                  setBio(getAuthUser[0]?.bio);
            }
      }, [getAuthUser]);

      return (
            <div className='w-full md:w-[80%] max-w-[1536px] mx-auto common_shadow my-5'>
                  <h1 className='mt-4 text-xl font-semibold text-gray-900'>About</h1>
                  <div className='w-full mt-6 px-2 text-center'>
                        <div className='py-1 px-3 bg-gray-300 rounded-md mb-2 w-fit flex items-center gap-2 mx-auto text-orange-500'>
                              <FontAwesomeIcon
                                    icon={faAddressCard}
                              />
                              <span className='text-base font-bold'>Bio</span>
                        </div>
                        <p className='font-semibold text-gray-600 italic'>{bio ? bio : "Not added"}</p>

                        <div className='py-1 px-3 bg-gray-300 rounded-md mt-6 mb-2 w-fit flex items-center gap-2 mx-auto text-orange-500'>
                              <FontAwesomeIcon
                                    icon={faBuildingFlag}
                              />
                              <span className='text-base font-bold'>City</span>
                        </div>
                        <p className='font-semibold text-gray-600 italic'>{city ? city : "Not added"}</p>
                        <div className='py-1 px-3 bg-gray-300 rounded-md mt-6 mb-2 w-fit flex items-center gap-2 mx-auto text-orange-500'>
                              <FontAwesomeIcon
                                    icon={faLocationDot}
                              />
                              <span className='text-base font-bold'>Location</span>
                        </div>
                        <p className='font-semibold text-gray-600 italic'>{address ? address : "Not added"}</p>
                        <div className='py-1 px-3 bg-gray-300 rounded-md mt-6 mb-2 w-fit flex items-center gap-2 mx-auto text-orange-500'>
                              <FontAwesomeIcon
                                    icon={faCalendarDays}
                              />
                              <span className='text-base font-bold'>Birthday</span>
                        </div>
                        <p className='font-semibold text-gray-600 italic'>{birthday ? moment(birthday).format("ll") : "Not added"}</p>
                  </div>
            </div>
      );
};

export default About;