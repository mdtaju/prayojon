import { getSession } from "next-auth/react";
import React, { useState } from "react";
import AuthProviders from "../src/component/Register/AuthProviders";
import FormOTP from "../src/component/Register/FormOTP";
import FormPassword from "../src/component/Register/FormPassword";
import FormPhone from "../src/component/Register/FormPhone";
import Layout from "../src/component/Register/Layout";
import RouteToggle from "../src/component/Register/RouteToggle";
import TitleContainer from "../src/component/Register/TitleContainer";

const Register = () => {
  const [userPhone, setUserPhone] = useState("");
  const [isOptSend, setIsOtpSend] = useState(false);
  const [isSuccessValidated, setIsSuccessValidated] = useState(false);
  const [requestedOTP, setRequestedOTP] = useState("");
  return (
    <Layout>
      <TitleContainer title={"Create an account"} />
      {!isSuccessValidated ? (
        <>
          {!isOptSend ? (
            <FormPhone
              label="Enter a valid phone number:"
              userPhone={userPhone}
              setUserPhone={setUserPhone}
              setIsOtpSend={setIsOtpSend}
              setRequestedOTP={setRequestedOTP}
              isLogin={false}
            />
          ) : (
            <FormOTP
              userPhone={userPhone}
              setIsSuccessValidated={setIsSuccessValidated}
              requestedOTP={requestedOTP}
            />
          )}
        </>
      ) : (
        <FormPassword
          userPhone={userPhone}
          setIsSuccessValidated={setIsSuccessValidated}
        />
      )}
      <div className="w-full h-[1px] bg-gray-300 my-3"></div>
      <AuthProviders />
      <RouteToggle title={"Already have an account"} path="/login" />
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

export default Register;
