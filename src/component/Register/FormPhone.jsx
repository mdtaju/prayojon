import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import { TextField } from '@mui/material';
import Link from 'next/link';
import axiosInstance from '../../config/axios';

const FormPhone = ({
      userPhone,
      setUserPhone,
      setIsOtpSend,
      label,
      setRequestedOTP,
      isLogin
}) => {
      const [isValid, setIsValid] = useState(false);
      const [existsMss, setExistsMss] = useState("");
      const [isAgreeWithTerms, setIsAgreeWithTerms] = useState(false);

      // Phone validation
      useEffect(() => {
            if (userPhone) {
                  if (userPhone.startsWith("01") && userPhone.length === 11 && isAgreeWithTerms) {
                        setIsValid(true)
                  } else {
                        setIsValid(false)
                  }
            }
      }, [userPhone, isAgreeWithTerms]);

      // Form - check if phone is already exists and send OTP.
      const handleSubmit = async (e) => {
            e.preventDefault();
            const alpha_token = "o9V7a9sf64EBjGDjnqC60r4rjfPfqkQBTu2PIB87" // Tajuddin "K78KGIsCbpupYvSLUn2v15xzeakBlk52s3qe5Vix";
            const otp = Math.floor(Math.pow(10, 5 - 1) + Math.random() * (Math.pow(10, 5) - Math.pow(10, 5 - 1) - 1)); // Making 5 digit OTP
            const message = `Your Prayojon OTP code is ${otp}`; // Making message with OTP code.

            const formattedPhone = "88" + userPhone.replace("+", ""); // Format the phone number 

            try {
                  // Post for check is phone exists in database.
                  const res = await axiosInstance.post("/phone_check", {
                        phone: formattedPhone
                  });
                  if (isLogin) {
                        if (!res?.data?.isExists) {
                              setIsOtpSend(false);
                              setExistsMss("Phone number is not valid.")
                        } else {
                              // sending OTP message
                              const res = await axios.post(`https://api.sms.net.bd/sendsms?api_key=${alpha_token}&msg=${message}&to=${formattedPhone}`);
                              if (!res.data.error) {
                                    setExistsMss("");
                                    setIsOtpSend(true);
                                    setRequestedOTP(otp);
                              }
                        }
                  } else {
                        if (res?.data?.isExists) {
                              setIsOtpSend(false);
                              setExistsMss("User already exists on this phone...")
                        } else {
                              // sending OTP message
                              const res = await axios.post(`https://api.sms.net.bd/sendsms?api_key=${alpha_token}&msg=${message}&to=${formattedPhone}`);

                              // console.log(res)
                              if (res.data.error === 0) {
                                    setExistsMss("");
                                    setIsOtpSend(true);
                                    setRequestedOTP(otp);
                              } else {
                                    setExistsMss("Operation failed.Please try again")
                              }
                        }
                  }
            } catch (error) {
                  // console.log(error)
                  setIsOtpSend(false);
            }
      }
      return (
            <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
                  {/* <p className='-mb-2'>{label}</p> */}
                  {/* Phone input */}
                  {/* <div className={`px-4 py-4 border ${isValid ? "border-green-500" : "border-red-500"} rounded-sm`}>
                        <PhoneInput
                              international
                              // placeholder="Enter your phone"
                              countryCallingCodeEditable={false}
                              defaultCountry="BD"
                              value={userPhone}
                              onChange={setUserPhone}
                              className={"input-phone-number"}
                        />
                  </div> */}
                  <div className="space-y-1 w-full">
                        <h4 className="text-sm font-medium">{label}</h4>
                        <TextField
                              sx={{ width: "100%" }}
                              type={"tel"}
                              placeholder={"019***"}
                              value={userPhone}
                              size="small"
                              onChange={(e) => setUserPhone(e.target.value)}
                        />
                  </div>
                  <label className="flex items-center gap-2 select-none cursor-pointer">
                        <input onChange={() => setIsAgreeWithTerms((prevState) => !prevState)} value={isAgreeWithTerms} type="checkbox" name="" id="" />
                        <span>I agree with <Link className='text-blue-600 hover:underline' href={"/terms"}>terms and condition</Link></span>
                  </label>
                  {
                        existsMss && <p className='text-red-500'>{existsMss}</p>
                  }
                  <button
                        disabled={isValid ? false : true}
                        className={`${isValid ? 'input_submit_btn' : "input_submit_btn_err"}`}
                        type='submit'
                  >Request OTP</button>
            </form>
      );
};

export default FormPhone;