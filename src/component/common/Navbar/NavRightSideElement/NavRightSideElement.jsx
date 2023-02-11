import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Badge, Tooltip } from '@mui/material';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
const CustomPopper = dynamic(() => import('../../CustomPopper'), {
      ssr: false,
})
const NavRightSideElement = ({ toolTitle, countValue, Icon, children }) => {
      const [anchorEl, setAnchorEl] = useState(null);
      const [open, setOpen] = useState(false);
      const [placement, setPlacement] = useState();

      const handleClick = (newPlacement) => (event) => {
            setAnchorEl(event.currentTarget);
            setOpen((prev) => placement !== newPlacement || !prev);
            setPlacement(newPlacement);
      };
      return (
            <li onClick={handleClick('bottom')} className="h-full grid place-items-center">
                  <CustomPopper
                        setOpenPopper={setOpen}
                        anchorEl={anchorEl}
                        open={open}
                        placement={placement}
                  >
                        {children}
                  </CustomPopper>
                  <Tooltip title={toolTitle} arrow>
                        <div className="nav_icon_round_btn">
                              {
                                    toolTitle === "Profile" ?
                                          <Avatar
                                                alt="Remy Sharp"
                                                //   src="/static/images/avatar/1.jpg"
                                                sx={{ width: 18, height: 18 }}
                                          /> :
                                          <Badge badgeContent={countValue} color="primary">
                                                <FontAwesomeIcon
                                                      className="nav_icon text-[18px]"
                                                      icon={Icon}
                                                />
                                          </Badge>
                              }
                        </div>
                  </Tooltip>
            </li>
      );
};

export default NavRightSideElement;