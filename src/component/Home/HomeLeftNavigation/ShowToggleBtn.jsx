import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const ShowToggleBtn = ({ state, setState }) => {
      return (
            <div
                  onClick={() => setState((prevState) => !prevState)}
                  className='p-4 py-2 flex items-center gap-2 cursor-pointer bg-transparent hover:bg-gray-300 rounded-md transition-all duration-150 select-none'>
                  <div className='w-[30px] h-[30px] grid place-items-center bg-gray-200 rounded-full'>
                        <FontAwesomeIcon
                              icon={faAngleDown}
                              style={state ? { rotate: "180deg" } : { rotate: "0deg" }}
                              className="text-[16px] text-gray-800"
                        />
                  </div>
                  <span className='text-base text-gray-800 font-semibold'>{state ? "See less" : "See more"}</span>
            </div>
      );
};

export default ShowToggleBtn;