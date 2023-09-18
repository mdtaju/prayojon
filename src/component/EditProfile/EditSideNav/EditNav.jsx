import { faUserLock, faUserPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const EditNav = ({ nav, setNav }) => {
      return (
            <div className='grow-0'>
                  <ul className='flex flex-col gap-2 whitespace-nowrap'>
                        <li
                              onClick={() => setNav("personal")}
                              className={`nav_sub_link_btn rounded-md ${nav === "personal" ? "nav_sub_link_btn_active" : ""}`}>
                              <FontAwesomeIcon className='text-orange-500' icon={faUserPen} /><span>Personal Info</span>
                        </li>
                        <li
                              onClick={() => setNav("security")}
                              className={`nav_sub_link_btn rounded-md ${nav === "security" ? "nav_sub_link_btn_active" : ""}`}>
                              <FontAwesomeIcon className='text-orange-500' icon={faUserLock} /><span>Security Info</span></li>
                  </ul>
            </div>
      );
};

export default EditNav;