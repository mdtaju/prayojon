import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';

const FormOTP = ({ userPhone, setIsSuccessValidated, requestedOTP, setRequestedOTP }) => {
      const [isValid, setIsValid] = useState(false);
      const [otp, setOtp] = useState("");
      const [timer, setTimer] = useState(40);
      const [isTimeOut, setIsTimeOut] = useState(false);

      // OTP validation 
      useEffect(() => {
            if (otp.length === 5) {
                  setIsValid(true)
            } else {
                  setIsValid(false)
            }
      }, [otp]);

      // Timer for request new OTP 
      useEffect(() => {
            if (!isTimeOut) {
                  const intervalTimer = setInterval(() => {
                        setTimer((prevSecond) => prevSecond - 1);
                  }, 1000);
                  return () => clearInterval(intervalTimer);
            }
      }, [isTimeOut]);

      // Clear timer 
      useEffect(() => {
            if (timer === 0) {
                  setIsTimeOut(true);
            }
      }, [timer]);

      // reset opt handler 
      const resetOptHandler = async () => {
            const alpha_token = "o9V7a9sf64EBjGDjnqC60r4rjfPfqkQBTu2PIB87" // Tajuddin "K78KGIsCbpupYvSLUn2v15xzeakBlk52s3qe5Vix";
            const otp = Math.floor(Math.pow(10, 5 - 1) + Math.random() * (Math.pow(10, 5) - Math.pow(10, 5 - 1) - 1)); // Making 5 digit OTP
            const message = `Your Prayojon OTP code is ${otp}`; // Making message with OTP code.
            const formattedPhone = "88" + userPhone.replace("+", ""); // Format the phone number 
            // sending OTP message
            const res = await axios.post(`https://api.sms.net.bd/sendsms?api_key=${alpha_token}&msg=${message}&to=${formattedPhone}`);
            if (!res.data.error) {
                  setRequestedOTP(otp);
                  setIsTimeOut(false);
                  setTimer(40)
            }
      }

      // Checking OTP 
      const handleSubmit = async (e) => {
            e.preventDefault();

            if (requestedOTP === +otp) {
                  setIsSuccessValidated(true);
            } else {
                  setIsSuccessValidated(false);
            }
      }
      return (
            <form className='flex flex-col gap-3'>
                  {/* Countdown Timer */}
                  <div>
                        {
                              timer > 0 &&
                              <>
                                    <p className='text-center text-primary leading-[10px]'>You can request for new OTP after</p>
                                    <p className={`text-center text-2xl font-bold ${timer > 30 && "text-green-500"} ${timer < 31 && timer > 10 && "text-yellow-500"} ${timer < 11 && "text-red-500"}`}>{timer}</p>
                                    <p className='text-center text-primary leading-[10px]'>Seconds.</p>
                              </>
                        }
                  </div>
                  {/* OTP input and resend btn */}
                  <div className='w-full'>

                        <TextField
                              required
                              type={"number"}
                              placeholder={"Enter your OTP"}
                              value={otp}
                              fullWidth
                              size='small'
                              onChange={(e) => setOtp(e.target.value)}
                              max={"5"}
                        />
                  </div>
                  <div className='flex items-start justify-between gap-4'>
                        <p className='text-sm text-yellow-500'>{"Note: 'Resend OTP' button will enable after 1 minute of the previous OTP."}</p>
                        <button onClick={resetOptHandler} disabled={timer ? true : false} className={`whitespace-nowrap w-fit px-3 py-1 text-xs font-medium  rounded-sm ${timer ? "bg-gray-200 text-gray-800 cursor-not-allowed" : "bg-primary text-white cursor-pointer"} z-10`}>Resend OTP</button>
                        {/* Warn message */}
                  </div>
                  <button
                        disabled={isValid ? false : true}
                        className={`${isValid ? 'input_submit_btn' : "input_submit_btn_err"}`}
                        onClick={handleSubmit}
                  >{"Submit OTP"}</button>
            </form>
      );
};

export default FormOTP;