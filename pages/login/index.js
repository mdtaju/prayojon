import { CircularProgress, TextField } from "@mui/material";
import { getSession, signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import AuthProviders from "../../src/component/Register/AuthProviders";
import Layout from "../../src/component/Register/Layout";
import RouteToggle from "../../src/component/Register/RouteToggle";
import TitleContainer from "../../src/component/Register/TitleContainer";

const Login = () => {
  const router = useRouter();
  const { data } = useSession();
  const [loading, setLoading] = useState(false);
  const [errMss, setErrMss] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [password, setPassword] = useState("");

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
    <Layout>
      <TitleContainer title="Login your account" />
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <p className="-mb-2">Enter your phone number:</p>
        <div className="px-4 py-4 border border-gray-400 rounded-sm">
          <PhoneInput
            international
            // placeholder="Enter your phone"
            countryCallingCodeEditable={false}
            defaultCountry="BD"
            value={userPhone}
            onChange={setUserPhone}
            className={"input-phone-number"}
          />
        </div>
        <TextField
          type={"password"}
          placeholder={"Enter your password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errMss && <p className="text-red-500">{errMss}</p>}
        <button className="input_submit_btn" type="submit">
          {loading ? <CircularProgress color="inherit" size={16} /> : "Log in"}
        </button>
        <Link className="w-fit mx-auto" href={"/login/forget_password"}>
          <p className="w-fit text-primary hover:underline cursor-pointer">
            Forgotten Password?
          </p>
        </Link>
      </form>
      <div className="w-full h-[1px] bg-gray-300 my-2"></div>
      <AuthProviders />
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
