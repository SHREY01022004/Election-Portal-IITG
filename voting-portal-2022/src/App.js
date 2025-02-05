import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { BASEURL } from "./constants";
import { getAllCandidates } from "./redux/actions/candidates";
import VotingScreen from "./screens/VotingScreen";
import StatusScreen from "./screens/StatusScreen";
import Loading from "./components/Loader/Loading";
import StartVotingButton from "./components/StartVotingButton/StartVotingButton";
import VotingIdGenScreen from "./screens/VotingIdGenScreen";
import EnterVoterIdScreen from "./screens/EnterVoterIdScreen";
import { VotingResScreen } from "./screens/VotingResScreen";
import { VotingFailScreen } from "./screens/VotingFailScreen";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import AdminVoteDay from "./screens/AdminScreen";
import { IS_PROD } from "./constants";
function App() {
  const dispatch = useDispatch();
  const candidates = useSelector((state) => state.candidates.all)
  const [candidateToID, setCandidateToID] = useState({});

  function candidateToIDMap (candidates) {
    const map = {}
    const temp ={}
    candidates.forEach(candidate => {
      if (candidate.nomination_status === "approved") {
        map[candidate.id] = candidate.name
        temp[`${candidate.id}`] = candidate.position + "," + candidate.name;
      }
    });
    [-1,-2,-3,-4,-5,-6,-7,-8,-9,-10,-12].forEach(e => {
      map[e] = "NOTA"
    });
    setCandidateToID(map)
    // console.log("temppp", temp)
  }
  // console.log("map:",candidateToID)
  // if (IS_PROD) {
  //   window.console.log = () => {};
  // }

  useEffect(() => {
    dispatch(getAllCandidates());
    candidateToIDMap(candidates)
  }, [dispatch]);

  useEffect(() => {
    candidateToIDMap(candidates)
  }, [candidates]);

  return (
    <>
      <div className="voting-portal-2022-wrapper">
        <BrowserRouter basename={BASEURL}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => (
                <StatusScreen>
                  <StartVotingButton />
                </StatusScreen>
              )}
            />
            <Route path="/admin" exact component={AdminVoteDay} />
            <Route path="/enterid" exact component={EnterVoterIdScreen} />
            <Route path="/otp" exact component={VotingIdGenScreen} />
            <Route path="/response" exact component={VotingResScreen} />
            <Route path="/fail" exact component={VotingFailScreen} />
            <Route
              path="/status"
              exact
              render={() => (
                <StatusScreen>
                  <Loading text="Please wait till we process your vote" />
                </StatusScreen>
              )}
            />
            <Route path="/:position" exact component={() => <VotingScreen candidateIDMap={candidateToID}/>} />
          </Switch>
        </BrowserRouter>
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
}

export default App;
