import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import PhoneIcon from "../../../../public/images/bx_phone.svg";

const HomeLeftMenuPublic = () => {
      const handleGoogleSignIn = async () => {
            await signIn('google', { callbackUrl: "/" })
      }
      return (
            <div>
                  <div className='common_shadow p-6'>
                        {/* welcome banner */}
                        <div className='mb-4 space-y-2'>
                              <h1 className='font-semibold text-xl text-gray-900 text-center'>Welcome To Prayojon</h1>
                              <p className='mt-2 text-center text-sm font-semibold text-gray-800'>Create an account to follow your favorite categories and stand Buying and Selling</p>
                        </div>
                        <Link className='w-full' href={"/login"}>
                              <button className='btn_primary w-full'>Login</button>
                        </Link>
                        <p className='text-center text-xs font-bold text-gray-800 my-4'>Or login via</p>
                        <div className='w-[100px] mx-auto flex items-center justify-between'>
                              {/* google login button */}
                              <div
                                    onClick={handleGoogleSignIn}
                                    className='w-[40px] h-[40px] rounded-full bg-[#F1F6FB] grid place-items-center cursor-pointer'>
                                    <Image
                                          src={"/web-icons/icons8-google.svg"}
                                          width={30}
                                          height={30}
                                          alt='google'
                                    />
                              </div>
                              {/* facebook login button */}
                              <Link href={"/login"}>
                                    <div className='w-[40px] h-[40px] rounded-full bg-[#F1F6FB] grid place-items-center cursor-pointer'>
                                          <Image
                                                src={PhoneIcon}
                                                alt='phone'
                                          />
                                    </div>
                              </Link>
                        </div>
                        <p className='text-center text-xs font-bold text-gray-800 my-4'>{"Don't have an account yet"}</p>
                        <Link className='w-full' href={"/register"}>
                              <button className='btn_primary w-full'>Sign in</button>
                        </Link>
                  </div>
            </div>
      );
};

export default HomeLeftMenuPublic;