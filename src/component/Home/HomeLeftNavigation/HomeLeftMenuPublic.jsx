import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const HomeLeftMenuPublic = () => {
      return (
            <div>
                  {/* welcome banner */}
                  <div className='common_shadow'>
                        <div className='p-2 border-2 border-orange-500 rounded-sm'>

                              <h1 className='font-bold text-xl text-primary text-center'>Welcome To <br />Prayojon</h1>
                        </div>
                        <p className='mt-2 text-justify text-sm font-semibold text-gray-800'>Create an account to follow your favorite categories and stand Buying and Selling</p>
                  </div>
                  <div className='common_shadow mt-2'>
                        <Link className='w-full' href={"/login"}>
                              <button className='btn_primary w-full'>Login</button>
                        </Link>
                        <div className="w-fit mx-auto flex items-center gap-4">
                              <div className='w-[40px] h-[2px] bg-gray-800'></div>
                              <p className='text-center text-xs font-bold text-gray-800 my-4'>Or login via</p>
                              <div className='w-[40px] h-[2px] bg-gray-800'></div>
                        </div>
                        <div className='w-[100px] mx-auto flex items-center justify-between'>
                              <div className='w-[40px] h-[40px] rounded-full border border-primary grid place-items-center cursor-pointer'>
                                    <Image
                                          src={"/web-icons/icons8-google.svg"}
                                          width={30}
                                          height={30}
                                          alt='google'
                                    />
                              </div>
                              <div className='w-[40px] h-[40px] rounded-full border border-primary grid place-items-center cursor-pointer'>
                                    <Image
                                          src={"/web-icons/icons8-facebook.svg"}
                                          width={30}
                                          height={30}
                                          alt='facebook'
                                    />
                              </div>
                        </div>
                        <div className="w-fit mx-auto flex items-center gap-4">
                              <div className='w-[30px] h-[2px] bg-gray-800'></div>
                              <p className='text-center text-xs font-bold text-gray-800 my-4'>{"Don't have an account yet"}</p>
                              <div className='w-[30px] h-[2px] bg-gray-800'></div>
                        </div>
                        <Link className='w-full' href={"/register"}>
                              <button className='btn_primary w-full'>Sign in</button>
                        </Link>
                  </div>
            </div>
      );
};

export default HomeLeftMenuPublic;