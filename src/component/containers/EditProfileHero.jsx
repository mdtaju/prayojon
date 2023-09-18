import React, { useState } from 'react';
import EditBody from '../EditProfile/EditBody/EditBody';
import EditNav from '../EditProfile/EditSideNav/EditNav';

const EditProfileHero = () => {
      const [nav, setNav] = useState("personal");
      return (
            <div className='w-full md:w-[80%] max-w-[1536px] py-4 px-2 sm:py-12 sm:px-6 mx-auto flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-start mt-[30px] md:mt-[70px] common_shadow'>
                  <EditNav 
                        nav={nav}
                        setNav={setNav}
                  />
                  <EditBody 
                        nav={nav}
                  />
            </div>
      );
};

export default EditProfileHero;