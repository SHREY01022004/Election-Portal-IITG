import React,{useEffect} from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import TopNav from "../../components/Home/TopNav/TopNav";
import ProfileNavBar from "../../components/Nominate/ProfileNavBar/ProfileNavBar";
import AboutScreen from "./AboutScreen";
import AgendasScreen from "./AgendasScreen";
import WitnessesScreen from "./WitnessesScreen";
import CredentialsScreen from "./CredentialsScreen";
import VerificationScreen from "./VerificationScreen";
import VideoScreen from "./VideoScreen";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../actions/auth";
import Footer from "../../components/Footer/Footer";
import ReactGA from "react-ga";
const Layout = () => {
  return (
    <div
      className="mt-12 ml-1 mr-1 md:ml-16 md:mr-10"
      style={{ maxWidth: "1240px", minHeight:"60vh" }}
    >
      <Outlet />
    </div>
  );
};
const CandidateNominateScreen = () => {
  const dispatch = useDispatch();
  
  useEffect(()=>{
    dispatch(getUser());
    ReactGA.pageview(window.location.pathname,[],"Nomination pages");
  },[])

  return (
    <>
      {/* <TopNav /> */}
      <div className="mt-5 ml-1 mr-1 md:ml-16 md:mr-10">
        <ProfileNavBar />
      </div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" exact element={<AboutScreen />} />
          <Route path="about" element={<AboutScreen />} />
          <Route path="agendas" exact element={<AgendasScreen />} />
          <Route path="credentials" exact element={<CredentialsScreen />} />
          <Route path="video" exact element={<VideoScreen />} />
          <Route path="verification" exact element={<VerificationScreen />} />
          <Route path="witnesses" exact element={<WitnessesScreen />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
};

export default CandidateNominateScreen;
