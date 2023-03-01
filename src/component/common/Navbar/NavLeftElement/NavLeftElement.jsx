import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
const CustomPopper = dynamic(() => import('../../CustomPopper'), {
      ssr: false,
})

const NavLeftElement = () => {
      const [anchorEl, setAnchorEl] = useState(null);
      const [open, setOpen] = useState(false);
      const [placement, setPlacement] = useState();

      const handleClick = (newPlacement) => (event) => {
            setAnchorEl(event.currentTarget);
            setOpen((prev) => placement !== newPlacement || !prev);
            setPlacement(newPlacement);
      };
      const handleClickAway = () => {
            setOpen(false);
            console.log("Handle Click Away")
      }
      return (
            <>
                  <CustomPopper
                        setOpenPopper={setOpen}
                        anchorEl={anchorEl}
                        open={open}
                        placement={placement}
                  >
                        <h1>Search</h1>
                  </CustomPopper>
                  <p className="text-base font-bold text-blue-600">PRAYOJON</p>
                  <div onClick={handleClick('bottom-start')} className="w-fit flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
                        <FontAwesomeIcon
                              className="text-gray-400 text-base"
                              icon={faMagnifyingGlass}
                        />
                        <input className="outline-none border-none bg-transparent placeholder:text-gray-500 font-medium placeholder:font-normal" placeholder="Search prayojon" type="text" />
                  </div>
            </>
      );
};

export default NavLeftElement;