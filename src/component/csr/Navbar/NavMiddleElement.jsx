import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge, Tooltip } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

const NavMiddleElement = ({ toolTitle, Icon, activeLink }) => {
      const router = useRouter();
      return (
            <li className={`h-full py-1 ${router.pathname === activeLink && "border-b-2 border-blue-600"}`}>
                  <Tooltip title={toolTitle} arrow>
                        <div className="nav_icon_btn">
                              {
                                    toolTitle === 'Cart' ?
                                          <Badge badgeContent={2} color="primary">
                                                <FontAwesomeIcon
                                                      className="nav_icon"
                                                      icon={Icon}
                                                />
                                          </Badge> :

                                          <FontAwesomeIcon
                                                className={`nav_icon ${router.pathname === activeLink && "text-blue-600"}`}
                                                icon={Icon}
                                          />
                              }
                        </div>
                  </Tooltip>
            </li>
      );
};

export default NavMiddleElement;