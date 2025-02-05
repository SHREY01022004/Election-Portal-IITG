import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BASEURL, IS_PROD, SET_CANDIDATE_DATA } from "./constants";
import PreElectionScreen from "./screens/pre_election/PreElectionScreen";
import AdminScreen from "./screens/admin/AdminScreen";
import CandidateNominateScreen from "./screens/candidatenominationscreen/CandidateNominateScreen";
import RegisterScreen from "./screens/Register/RegisterScreen";
import CandidatePositionForm from "./screens/CandidatePositionForm/CandidatePositionForm";
import TopNav from "./components/Home/TopNav/TopNav";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./actions/auth";
import LoginScreen from "./screens/loginScreen/LoginScreen";
import RegistrationRoute from "./custom-routes/RegistrationRoute";
import NominationRoute from "./custom-routes/NominationRoutes";
import { getImportantDates } from "./actions/importantDates";
import ReactGA from "react-ga";
import { getCandidateData } from "./actions/candidates";

function UserScreens() {
  return (
    <div className="min-h-screen">
      <TopNav />
      <Routes>
        <Route path="/*" exact element={<PreElectionScreen />} />
        <Route
          path="/register"
          exact
          element={
            <RegistrationRoute>
              <RegisterScreen />
            </RegistrationRoute>
          }
          />
        <Route
          path="/nominate/*"
          exact
          element={
            <NominationRoute>
              <CandidateNominateScreen />
            </NominationRoute>
          }
          />
        <Route
          path="/nominate/post"
          exact
          element={<CandidatePositionForm />}
          />
      </Routes>
    </div>
  );
}

function App() {
  const userData = useSelector((store) => store.auth);
  const candidate = useSelector((store) => store.candidate);
  const dispatch = useDispatch();

  if (IS_PROD) {
    window.console.log = () => {};
  }

  useEffect(() => {
    dispatch(getUser());
    dispatch(getImportantDates());
    dispatch(getCandidateData());
    ReactGA.pageview(window.location.pathname);
  }, []);

  useEffect(() => {
    console.log("userData: ", userData);
    if (
      userData &&
      Object.keys(candidate).length === 0 &&
      userData.candidates.length !== 0
    ) {
      dispatch({ type: SET_CANDIDATE_DATA, data: userData.candidates[0] });
    }
  }, [userData]);

  return (
    <BrowserRouter basename={BASEURL}>
      <Routes>
        <Route path="/*" exact element={<UserScreens />} />
        <Route path="/admin/*" exact element={<AdminScreen />} />
        <Route path="/login" exact element={<LoginScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
