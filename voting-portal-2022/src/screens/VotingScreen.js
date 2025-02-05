import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { pos2idMap } from "../constants";
import { getCandidateByPos } from "../redux/actions/candidates";
import { Link, useHistory, Redirect } from "react-router-dom";
import CandidateCard from "../components/CandidateCard/CandidateCard";
import styles from "../components/buttons/buttons.module.css";
import SideBarSection from "../components/SideNav/Sidebar";
import { posts } from "../constants";
import { deleteAllVotes } from "../redux/actions/votes";
import { checkNext } from "../utils/voteValue";
import { getNextPage } from "../constants";
import Topbar from "../components/Topbar/Topbar";
import { postsToShow } from "../utils/postsToShow";
import { Spinner } from "@primer/react";
import { toast } from "react-toastify";

const VotingScreen = ({candidateIDMap}) => {
  const dispatch = useDispatch();
  let history = useHistory();
  const { position } = useParams();
  let candidates = useSelector((store) => store.candidates);
  // console.log("WE are candidate", candidates[position]);
  const voterInfo = useSelector((store) => store.voterInfo);
  const vote = useSelector((store) => store.votes[position]);
  const notify = () => toast.info(`You've voted NOTA.`);
  const handleNext = () => {
    if (checkNext(vote, position)) {
      history.push(`/${getNextPage[position]}`);
    }
  };
  useEffect(() => {
    dispatch(getCandidateByPos(pos2idMap[position], position));
    // console.log("side", postsToShow(posts, voterInfo), voterInfo);
    // console.log("bhalne", candidates[position]);
  }, [position]);
  //voterInfo.isVoterIdValid

  return (
    <>
      <Topbar position={position} vote={vote} />
      {voterInfo.isVoterIdValid ? (
        <>
          <div className="" >
            <SideBarSection posts={postsToShow(posts, voterInfo)} candidateIDMap={candidateIDMap}/>
            <div className="ml-80 xl:ml-96">
              <div className="p-6">
                <ul>
                  {candidates[position] && candidates[position].length > 0 ? (
                    candidates[position].map((candidate, i) => {
                      candidate = { ...candidate, pos: position };
                      return (
                        <CandidateCard
                          key={candidate.id}
                          candidate={candidate}
                          urlPara={position}
                        />
                      );
                    })
                  ) : (
                    <div
                      className="flex justify-center items-center"
                      style={{ height: "60vh", width: "75%" }}
                    >
                      <Spinner />
                    </div>
                  )}
                </ul>
                <div className="flex ml-10 gap-2 ">
                  <button
                    className={styles.none}
                    onClick={() => {
                      dispatch(deleteAllVotes(position));
                      notify();
                    }}
                    style={{
                      backgroundColor: vote < 0 || vote[0] < 0 ? "#ff6100" : "",
                      color: vote < 0 || vote[0] < 0 ? "#fff" : "",
                    }}
                  >
                    None of the above
                  </button>
                  {/* {position !== "girl" && (
                    <button
                      disabled={!checkNext(vote, position)}
                      className={`${styles.button2} ${
                        !checkNext(vote, position) &&
                        "cursor-not-allowed opacity-50"
                      }`}
                      onClick={handleNext}
                    >
                      Next
                    </button>
                  )} */}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

export default VotingScreen;
