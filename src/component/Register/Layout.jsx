import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Logo from "../../../public/images/logo-full.svg";

const Layout = ({ Banner, children }) => {
      return (
            <section className='container min-h-screen mx-auto'>
                  <div className="w-full sm:w-[600px] md:w-[980px] max-h-screen overflow-y-scroll md:overflow-hidden flex flex-col sm:flex-row items-center mx-auto bg-white rounded-sm shadow-md">
                        {/* image container start */}
                        <div className="hidden md:block w-[500px] h-screen">
                              <Image src={Banner} alt="banner" />
                        </div>
                        {/* image container end */}
                        {/* form container start */}
                        <div className="flex-1 flex flex-col gap-3 p-4 sm:px-6 md:px-12">
                              <div className='w-[200px] mx-auto mb-4'>
                                    <Link href={"/"}>
                                          <Image
                                                src={Logo}
                                                alt='logo'
                                          />
                                    </Link>
                              </div>
                              {children}
                        </div>
                        {/* form container end */}
                  </div>
            </section>
      );
};

export default Layout;