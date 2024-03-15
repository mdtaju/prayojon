import { getSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import Banner from "../../public/images/login_banner.png";
import FormOTP from "../../src/component/Register/FormOTP";
import FormPhone from "../../src/component/Register/FormPhone";
import Layout from "../../src/component/Register/Layout";
import NewPassword from "../../src/component/Register/NewPassword";

const ForgetPassword = () => {
  const [isSuccessValidated, setIsSuccessValidated] = useState(false);
  const [userPhone, setUserPhone] = useState("");
  const [isOptSend, setIsOtpSend] = useState(false);
  const [requestedOTP, setRequestedOTP] = useState("");
  return (
    <Layout Banner={Banner}>
      {isSuccessValidated ? (
        <NewPassword userPhone={userPhone} />
      ) : (
        <>
          {isOptSend ? (
            <FormOTP setIsSuccessValidated={setIsSuccessValidated} />
          ) : (
            <FormPhone
              label="Enter your phone:"
              userPhone={userPhone}
              setUserPhone={setUserPhone}
              setIsOtpSend={setIsOtpSend}
              setRequestedOTP={setRequestedOTP}
              isLogin={true}
            />
          )}
        </>
      )}
      <Link className="block w-fit text-center mx-auto my-3" href={"/login"}>
        <p className="w-fit text-primary hover:underline cursor-pointer">
          Login your account.
        </p>
      </Link>
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

export default ForgetPassword;
