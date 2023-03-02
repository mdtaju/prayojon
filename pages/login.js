import { TextField } from '@mui/material';
import { signIn, useSession } from "next-auth/react";
import Image from 'next/image';
import React, { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
const Login = () => {
      const { data } = useSession();
      const [userPhone, setUserPhone] = useState();

      // google auth handler function 
      const handleGoogleSignIn = async () => {
            await signIn('google', { callbackUrl: "/" })
      }
      return (
            <section className='container min-h-screen mx-auto py-6'>
                  <div className='w-[300px] sm:w-[420px] flex flex-col gap-4 mx-auto'>
                        <div className='w-full mx-auto p-4 bg-white rounded-md shadow-md'>
                              <div className='mb-4 text-center border-b border-gray-300 pb-2'>
                                    <h1 className='text-primary text-2xl font-bold'>Prayojon</h1>
                                    <p>Login your account</p>
                              </div>
                              <form className='flex flex-col gap-3'>
                                    <div className='px-4 py-4 border border-gray-400 rounded-sm'>
                                          <PhoneInput
                                                international
                                                placeholder="Enter your phone"
                                                countryCallingCodeEditable={false}
                                                defaultCountry="BD"
                                                value={userPhone}
                                                onChange={setUserPhone}
                                                style={{ outline: 'none', border: 'none' }}
                                          />
                                    </div>
                                    <TextField
                                          type={"password"}
                                          placeholder={"Enter your password"}
                                    />
                                    <button className='input_submit_btn' type='submit'>Log in</button>
                                    <p className='w-fit mx-auto text-primary hover:underline cursor-pointer'>Forgotten Password?</p>
                              </form>
                              <div>
                                    <div onClick={handleGoogleSignIn} className='login_icon_btn'>
                                          <Image
                                                src={'/web-icons/icons8-google.svg'}
                                                alt="google"
                                                width={36}
                                                height={36}
                                          />
                                          <span className='text-lg text-gray-800 font-semibold'>Login with Google</span>
                                    </div>
                                    <div className='login_icon_btn'>
                                          <Image
                                                src={'/web-icons/icons8-facebook.svg'}
                                                alt="google"
                                                width={36}
                                                height={36}
                                          />
                                          <span className='text-lg text-gray-800 font-semibold'>Login with Facebook</span>
                                    </div>
                              </div>
                              <div className='w-full h-[1px] bg-gray-300'></div>
                              <div className='text-center'>
                                    <button className='input_submit_btn mt-4 w-fit bg-green-600'>Create new account</button>
                              </div>
                        </div>
                  </div>
            </section>
      );
};

export default Login;