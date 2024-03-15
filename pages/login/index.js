import { CircularProgress, TextField } from "@mui/material";
import { getSession, signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
// import PhoneInput from "react-phone-number-input";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Banner from "../../public/images/login_banner.png";
import AuthProviders from "../../src/component/Register/AuthProviders";
import Layout from "../../src/component/Register/Layout";
import RouteToggle from "../../src/component/Register/RouteToggle";

const Login = () => {
  const router = useRouter();
  const { data } = useSession();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [errMss, setErrMss] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formattedPhone = userPhone.replace("+", "");
    const status = await signIn("credentials", {
      phone: formattedPhone,
      password: password,
      redirect: false,
      callbackUrl: "/",
    });
    if (status?.ok) {
      setLoading(false);
      router.push("/");
    } else {
      setLoading(false);
      setErrMss("Something went wrong. Please try again.");
    }
  };

  return (
    <Layout Banner={Banner}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {/* <div className="px-4 py-4 border border-gray-400 rounded-sm"> */}
        {/* <PhoneInput
            international
            // placeholder="Enter your phone"
            countryCallingCodeEditable={false}
            defaultCountry="BD"
            value={userPhone}
            onChange={setUserPhone}
            className={"input-phone-number"}
          /> */}
        {/* </div> */}
        {/* phone number  */}
        <div className="space-y-1 w-full">
          <h4 className="text-sm font-medium">Enter your phone number</h4>
          <TextField
            sx={{ width: "100%" }}
            type={"tel"}
            placeholder={"019***"}
            value={userPhone}
            size="small"
            onChange={(e) => setUserPhone(e.target.value)}
          />
        </div>
        {/* password */}
        <div className="space-y-1 w-full">
          <h4 className="text-sm font-medium">Password</h4>
          {/* password and eye button container */}
          <div className="relative w-full">
            {/* password input */}
            <TextField
              sx={{ width: "100%" }}
              type={showPassword ? "text" : "password"}
              placeholder={"Password"}
              value={password}
              size="small"
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* password show and hidden control */}
            <div
              onClick={handleClickShowPassword}
              className="absolute right-3 top-1 w-fit h-fit p-1 cursor-pointer">
              {showPassword ? (
                <FontAwesomeIcon icon={faEyeSlash} />
              ) : (
                <FontAwesomeIcon icon={faEye} />
              )}
            </div>
          </div>
        </div>
        {errMss && <p className="text-red-500">{errMss}</p>}
        {/* remember and forgot password container */}
        <div className="w-full flex items-center justify-between">
          <label className="flex items-center gap-2 select-none cursor-pointer">
            <input type="checkbox" name="" id="" />
            <span>Remember me</span>
          </label>
          <Link className="w-fit" href={"/login/forget_password"}>
            <p className="w-fit text-primary hover:underline cursor-pointer font-medium">
              Forgotten Your Password?
            </p>
          </Link>
        </div>
        {/* submit btn */}
        <button
          className="input_submit_btn font-medium"
          type="submit"
          disabled={loading}>
          {loading ? <CircularProgress color="inherit" size={16} /> : "LOGIN"}
        </button>
      </form>
      {/* auth provider google */}
      <AuthProviders />
      {/* register link button */}
      <RouteToggle title="Create new account" path="/register" />
    </Layout>
  );
};

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default Login;
