import { faGraduationCap, faOutdent } from "@fortawesome/free-solid-svg-icons";
import { getSession } from "next-auth/react";
import React from "react";
import Navbar from "../../src/component/common/Navbar/Navbar";
import Layout from "../../src/component/containers/Layout";
import StepTitle from "../../src/component/dashboard/Course/StepTitle";
import UploadOutline from "../../src/component/dashboard/Course/UploadOutline";
import DashboardLayout from "../../src/component/dashboard/DashboardLayout";
import TitleArea from "../../src/component/dashboard/TitleArea";

const UploadCourse = () => {
  return (
    <Layout>
      <Navbar />
      <DashboardLayout>
        <TitleArea
          Icon={faGraduationCap}
          title="UPLOAD COURSE"
          subtitle="UPLOAD COURSE subtitle here"
        />
        <div>
          <StepTitle title={"Course Upload Outline"} Icon={faOutdent} />
          <UploadOutline />
          <div className="w-full text-center mt-4">
            <button className="btn_primary shadow-lg">
              {"Let's Get Start"}
            </button>
          </div>
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

export default UploadCourse;
