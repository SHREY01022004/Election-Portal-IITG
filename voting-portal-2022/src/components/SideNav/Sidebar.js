import React, { useState } from "react";
import SubMenu from "./SubMenu";
import gymkhana from "../../assets/gymkhana.png";
import styles from "./Sidebar.module.css";
import SubmitVotesModal from "../SubmitVotesModal/SubmitVotesModal";
import { useSelector } from "react-redux";
import { checkVotedAll } from "../../utils/checkVotedAll";
import { useEffect, useRef } from "react";

const Sidebar = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const votes = useSelector((store) => store.votes);
  const voterInfo = useSelector((store) => store.voterInfo);
  const [isVoted, setIsVoted] = useState(checkVotedAll(votes, voterInfo));

  useEffect (() => {
    setIsVoted(checkVotedAll(votes, voterInfo));
  },[votes]);

  return (
    <>
      <div
        className="shadow-lg rounded-2xl fixed top-0 left-0 h-screen overflow-x-hidden overflow-y-auto w-1/5 pr-1 text-sm pb-28"
        style={{
          backgroundColor: "#F9F9F9",
        }}
      >
        <div className="flex justify-center items-center m-3 mb-5">
          <img src={gymkhana} alt="hi" />
          <div className="font-semibold p-3 text-xl">
            Gymkhana Elections 2024
          </div>
        </div>

        {props.posts.map((item, index) => {
          return <SubMenu item={item} key={index} />;
        })}
        <div
          className="fixed bottom-0 left-0 w-1/5 flex justify-center items-center py-3 bg-white"
          style={{ zIndex: "1" }}
        >
          <button
            //disabled={!isVoted}
            className={
              isVoted
                ? `${styles.button} ${styles.button2}`
                : `${styles.button}`
            }
            onClick={() => setModalOpen(true)}
          >
            Seal and Submit
          </button>
        </div>
        {modalOpen && (
          <SubmitVotesModal isVoted={isVoted} setModalOpen={setModalOpen} votes={votes} candidateIDMap={props.candidateIDMap} />
        )}
      </div>
    </>
  );
};

export default Sidebar;
