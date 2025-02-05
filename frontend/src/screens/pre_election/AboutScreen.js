import React from "react";
import AboutTextBlock from "../../components/Home/Register/Register";
import Dates from "../../components/Home/Dates/Dates";
import Debates from "../../components/Home/Debates/Debates";
import { Helmet } from "react-helmet";
import RegisterSuccess from "../../components/Home/RegisterSuccess/RegisterSuccess";
import { useSelector } from "react-redux";

const AboutScreen = () => {
  const userData = useSelector((state) => state.auth);
  return (
    <>
      <div className="px-4">
        <Helmet>
          <title>Election Portal</title>
        </Helmet>
        {/* {userData ? <RegisterSuccess /> : <AboutTextBlock />} */}
        <AboutTextBlock />
        <Dates />
        {/* <Debates /> */}
      </div>
    </>
  );
};

export default AboutScreen;
