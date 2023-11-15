import { TextField } from '@mui/material';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axios from '../../config/axios';

const FormPassword = ({ userPhone, setIsSuccessValidated }) => {
      const router = useRouter();
      const [password, setPassword] = useState("");
      const [isValid, setIsValid] = useState(false);

      // password length checking
      useEffect(() => {
            if (password.length >= 6) {
                  setIsValid(true)
            } else {
                  setIsValid(false)
            }
      }, [password]);

      // registration submission
      const handleSubmit = async (e) => {
            e.preventDefault();
            const getPhone = userPhone.replace("+", "");
            const data = {
                  phone: getPhone,
                  password: password
            }
            const postOptions = {
                  headers: { "content-type": "application/json" }
            }
            try {
                  const res = await axios.post("/register", data, postOptions);
                  const formattedPhone = userPhone.replace("+", "");
                  if (res.data === "Success") {
                        const status = await signIn('credentials', {
                              phone: formattedPhone,
                              password: password,
                              redirect: false,
                              callbackUrl: '/'
                        });
                        if (status?.ok) {
                              router.push("/")
                        } else {
                              setErrMss("Something went wrong. Please try again.")
                        }
                  }
            } catch (error) {
                  // console.log(error)
            }
      }

      return (
            <>
                  <p className='text-green-500 text-center text-base font-semibold'>Successfully verified your phone.</p>
                  <p className='text-yellow-500 text-center text-sm mb-3'>{"Warning: Don't reload this page before creating your account."}</p>
                  <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
                        <div className={`px-4 py-4 border border-gray-300 rounded-sm`}>
                              <span className='select-none'>{userPhone}</span>
                        </div>
                        <TextField
                              required
                              type={"password"}
                              placeholder={"Enter a strong password"}
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                              disabled={isValid ? false : true}
                              className={`${isValid ? 'input_submit_btn' : "input_submit_btn_err"}`}
                              type='submit'
                        >Create account</button>
                  </form>
            </>
      );
};

export default FormPassword;