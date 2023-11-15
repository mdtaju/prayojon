import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';

const FormOTP = ({ setIsSuccessValidated, requestedOTP }) => {
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
            <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
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
                  <div className='w-full relative'>
                        <div className={`absolute right-3 top-[50%] translate-y-[-50%] ${timer ? "otp_btn_disable" : "btn_primary"} z-10`}>Resend OTP</div>
                        <TextField
                              required
                              type={"number"}
                              placeholder={"Enter your OTP"}
                              value={otp}
                              fullWidth
                              onChange={(e) => setOtp(e.target.value)}
                              max={"5"}
                        />
                  </div>
                  {/* Warn message */}
                  <p className='text-sm text-yellow-500'>{"Note: 'Resend OTP' button will enable after 1 minute of the previous OTP."}</p>
                  <button
                        disabled={isValid ? false : true}
                        className={`${isValid ? 'input_submit_btn' : "input_submit_btn_err"}`}
                        type='submit'
                  >{"Submit OTP"}</button>
            </form>
      );
};

export default FormOTP;