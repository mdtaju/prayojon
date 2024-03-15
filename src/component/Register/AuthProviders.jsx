import { signIn } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';

const AuthProviders = () => {
      // google auth handler function 
      const handleGoogleSignIn = async () => {
            await signIn('google', { callbackUrl: "/" })
      }
      return (
            <div>
                  {/* Login wit google */}
                  <div onClick={handleGoogleSignIn} className='login_icon_btn'>
                        <div className='w-fit mx-auto flex items-center gap-4'>
                              <Image
                                    src={'/web-icons/icons8-google.svg'}
                                    alt="google"
                                    width={26}
                                    height={26}
                              />
                              <span className='text-lg text-gray-800 font-semibold'>Login with Google</span>
                        </div>
                  </div>
                  {/* Login with facebook */}
                  {/* <div className='login_icon_btn'>
                        <Image
                              src={'/web-icons/icons8-facebook.svg'}
                              alt="google"
                              width={36}
                              height={36}
                        />
                        <span className='text-lg text-gray-800 font-semibold'>Login with Facebook</span>
                  </div> */}
            </div>
      );
};

export default AuthProviders;