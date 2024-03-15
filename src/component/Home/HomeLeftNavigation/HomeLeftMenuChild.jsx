import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const HomeLeftOptionChild = ({ Icon, title, link }) => {
      return (
            <Link href={link}>
                  <div className='px-8 py-4 flex items-center gap-2 group hover:bg-gray-100 cursor-pointer transition-all duration-150'>
                        {/* <FontAwesomeIcon
                              icon={Icon}
                              className="text-[22px] w-6 h-6 text-primary px-[3px]"
                        /> */}
                        <div className='grid place-items-center w-[38px] h-[38px] bg-[#F1F5F9] group-hover:bg-[#fff] rounded-full transition-all duration-150'>
                              <Image
                                    src={Icon}
                                    alt={title}
                                    width={15}
                                    height={15}
                              />
                        </div>
                        <span className='text-lg text-[#595756] font-normal'>{title}</span>
                  </div>
            </Link>
      );
};

export default HomeLeftOptionChild;