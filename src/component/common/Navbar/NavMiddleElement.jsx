import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge, Tooltip } from '@mui/material';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useGetCartItemsQuery } from '../../../features/cart/cartApi';

const NavMiddleElement = ({ toolTitle, Icon, activeLink }) => {
      const { data: session } = useSession();
      const { data: cartItems } = useGetCartItemsQuery(session?.user?.email);
      const router = useRouter();
      return (
            <li className={`h-full py-1 ${router.pathname === activeLink && "border-b-2 border-primary"}`}>
                  <Link href={activeLink}>
                        <Tooltip title={toolTitle} arrow>
                              <div className="nav_icon_btn">
                                    {
                                          toolTitle === 'Cart' ?
                                                <Badge badgeContent={cartItems?.length} color="primary">
                                                      <FontAwesomeIcon
                                                            className="nav_icon"
                                                            icon={Icon}
                                                      />
                                                </Badge> :

                                                <FontAwesomeIcon
                                                      className={`nav_icon ${router.pathname === activeLink && "text-primary"}`}
                                                      icon={Icon}
                                                />
                                    }
                              </div>
                        </Tooltip>
                  </Link>
            </li>
      );
};

export default NavMiddleElement;