import { TextField } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axios from '../../config/axios';

const NewPassword = ({ userPhone }) => {
      const router = useRouter();
      const [operationMss, setOperationMss] = useState("");
      const [password, setPassword] = useState("");
      const [isValid, setIsValid] = useState(false);

      useEffect(() => {
            if (password.length >= 6) {
                  setIsValid(true)
            } else {
                  setIsValid(false)
            }
      }, [password]);

      const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                  const res = await axios.post("/change_user_password", {
                        phone: userPhone,
                        password
                  })
                  if (res.data.updated) {
                        setOperationMss("Your password has been changed successfully.");
                  } else {
                        setOperationMss("");
                  }
            } catch (error) {
                  console.log(error)
            }
      }
      return (
            <>
                  <p className='text-green-500 text-center text-base font-semibold'>Successfully verified your phone.</p>
                  <p className='text-yellow-500 text-center text-sm mb-3'>{"Warning: Don't reload this page before creating your new password."}</p>
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
                        {
                              operationMss &&
                              <p className='text-green-500'>{operationMss}</p>
                        }
                        <button
                              disabled={isValid ? false : true}
                              className={`${isValid ? 'input_submit_btn' : "input_submit_btn_err"}`}
                              type='submit'
                        >Update Password</button>
                  </form>
            </>
      );
};

export default NewPassword;