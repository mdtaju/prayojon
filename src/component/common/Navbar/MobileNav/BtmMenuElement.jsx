import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge } from '@mui/material';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useGetCartItemsQuery } from '../../../../features/cart/cartApi';

const BtmMenuElement = ({ Icon, activeLink, countValue = "" }) => {
      const router = useRouter();
      const { data: session } = useSession();
      const { data: cartItems } = useGetCartItemsQuery(session?.user?.email);
      return (
            <Link href={activeLink}>
                  <div className='h-full p-1 grid place-items-center'>
                        {
                              activeLink !== "/cart" && activeLink !== "/notification" &&
                              <FontAwesomeIcon
                                    className={`${router.pathname === activeLink ? "text-blue-600" : "text-gray-600"}  text-base`}
                                    icon={Icon}
                              />
                        }
                        {
                              activeLink === "/cart" &&
                              <Badge badgeContent={cartItems?.length} sx={{
                                    "& .MuiBadge-badge": {
                                          color: "white",
                                          backgroundColor: "#F97316"
                                    }
                              }}>
                                    <FontAwesomeIcon
                                          className={`${router.pathname === activeLink ? "text-blue-600" : "text-gray-600"}  text-base`}
                                          icon={Icon}
                                    />
                              </Badge>
                        }
                        {
                              activeLink === "/notification" &&
                              <Badge badgeContent={countValue} sx={{
                                    "& .MuiBadge-badge": {
                                          color: "white",
                                          backgroundColor: "#F97316"
                                    }
                              }}>
                                    <FontAwesomeIcon
                                          className={`${router.pathname === activeLink ? "text-blue-600" : "text-gray-600"}  text-base`}
                                          icon={Icon}
                                    />
                              </Badge>
                        }
                  </div>
            </Link>
      );
};

export default BtmMenuElement;