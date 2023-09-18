import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Badge, Tooltip } from '@mui/material';
import { useSession } from "next-auth/react";
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { useGetUserQuery } from "../../../../features/profile/profileApi";
const CustomPopper = dynamic(() => import('../../CustomPopper'), {
      ssr: false,
});


const NavRightSideElement = ({ toolTitle, countValue, Icon, children }) => {
      const [anchorEl, setAnchorEl] = useState(null);
      const [open, setOpen] = useState(false);
      const [placement, setPlacement] = useState();
      const [photo, setPhoto] = useState("");
      const { data: authData } = useSession();
      const { data: getAuthUser } = useGetUserQuery(authData?.user?.email);

      // get user photo 
      useEffect(() => {
            if (getAuthUser && getAuthUser[0]?.photo_url) {
                  setPhoto(getAuthUser[0].photo_url);
            }
      }, [getAuthUser]);

      // popper open handler
      const handleClick = (newPlacement) => (event) => {
            setAnchorEl(event.currentTarget);
            setOpen((prev) => placement !== newPlacement || !prev);
            setPlacement(newPlacement);
      };
      return (
            <>
                  <CustomPopper
                        setOpenPopper={setOpen}
                        anchorEl={anchorEl}
                        open={open}
                        placement={placement}
                  >
                        {children}
                  </CustomPopper>
                  <li onClick={handleClick('bottom')} className="h-full grid place-items-center">
                        <Tooltip title={toolTitle} arrow>
                              <div className="nav_icon_round_btn">
                                    {
                                          toolTitle === "Profile" ?
                                                <Avatar
                                                      alt="Remy Sharp"
                                                      src={photo}
                                                      sx={{ width: 36, height: 36 }}
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
            </>
      );
};

export default NavRightSideElement;