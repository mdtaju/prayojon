import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import { getSession } from "next-auth/react";
import React, { useState } from "react";
import Navbar from "../../src/component/common/Navbar/Navbar";
import SnackMessage from "../../src/component/common/SnackMessage";
import Layout from "../../src/component/containers/Layout";
import DashboardLayout from "../../src/component/dashboard/DashboardLayout";
import TitleArea from "../../src/component/dashboard/TitleArea";
import axiosInstance from "../../src/config/axios";

const Help = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [complain, setComplain] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState({
    error: false,
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const makeForm = {
      name,
      email,
      phone,
      subject,
      complain,
    };
    const res = await axiosInstance.post("/support_form", makeForm);
    if (res.status === 201) {
      setName("");
      setEmail("");
      setPhone("");
      setSubject("");
      setComplain("");
      setMessage({
        error: false,
        message: "Complain successfully submitted",
      });
      setOpen(true);
      return;
    } else {
      setMessage({
        error: true,
        message: "Something went wrong. Please try again",
      });
      setOpen(true);
    }
  };
  return (
    <Layout>
      <Navbar />
      <DashboardLayout>
        <TitleArea
          Icon={faCircleQuestion}
          title="HELP"
          subtitle="HELP subtitle here"
        />
        <SnackMessage open={open} setOpen={setOpen} message={message} />
        <div className="w-full common_shadow mt-6">
          <h1 className="text-center text-3xl font-medium">Complain Form</h1>
          <form onSubmit={handleSubmit} className="w-full mt-6">
            <div className="w-full max-w-[400px] space-y-4 mx-auto">
              {/* name */}
              <div>
                <h6 className="text-sm font-semibold">
                  Name <span className="text-red-600">*</span>
                </h6>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-1 border border-gray-400 rounded-md outline-none"
                  placeholder="Enter your full name"
                />
              </div>
              {/* email */}
              <div>
                <h6 className="text-sm font-semibold">
                  Email <span className="text-red-600">*</span>
                </h6>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-1 border border-gray-400 rounded-md outline-none"
                  placeholder="Enter email address"
                />
              </div>
              {/* phone */}
              <div>
                <h6 className="text-sm font-semibold">
                  Phone <span className="text-red-600">*</span>
                </h6>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-1 border border-gray-400 rounded-md outline-none"
                  placeholder="Enter your valid phone"
                />
              </div>
              {/* subject */}
              <div>
                <h6 className="text-sm font-semibold">
                  Subject <span className="text-red-600">*</span>
                </h6>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-1 border border-gray-400 rounded-md outline-none"
                  placeholder="Write a subject name"
                />
              </div>
              {/* Complain */}
              <div>
                <h6 className="text-sm font-semibold">
                  Complain <span className="text-red-600">*</span>
                </h6>
                <textarea
                  type="text"
                  required
                  value={complain}
                  onChange={(e) => setComplain(e.target.value)}
                  className="w-full px-3 py-1 border border-gray-400 rounded-md outline-none"
                  placeholder="Write your Complain"
                />
              </div>
              <button
                type="submit"
                className="w-full mt-4 bg-blue-500 hover:bg-blue-600 py-2 text-sm font-medium rounded-md text-white">
                Submit
              </button>
            </div>
          </form>
        </div>
      </DashboardLayout>
    </Layout>
  );
};

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  if (!session) {
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

export default Help;
