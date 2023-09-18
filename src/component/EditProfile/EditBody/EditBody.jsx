import React from 'react';
import EditPersonalInfo from './EditPersonalInfo';
import EditSecurityInfo from './EditSecurityInfo';

const EditBody = ({ nav }) => {
      return (
            <div className='grow-1 py-6 w-full h-full md:py-2 px-2 md:px-12 border-t md:border-t-0 md:border-l border-gray-300'>
                  {
                        nav === "personal" ?
                              <EditPersonalInfo /> :
                              <EditSecurityInfo />
                  }
            </div>
      );
};

export default EditBody;