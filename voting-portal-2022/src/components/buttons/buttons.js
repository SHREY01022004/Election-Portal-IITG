import React, { useState } from "react";
import { addVote, deleteVote } from "../../redux/actions/votes";
import { useDispatch, useSelector } from "react-redux";
import { voteValue } from "../../utils/voteValue";
import { ToastContainer, toast } from "react-toastify";

import styles from "./buttons.module.css";
import check from "./check.svg";
import cancel from "./cancel.svg";

export const SingleVote = ({ name, id, pos, urlPara }) => {
  const [hover, setHover] = useState(false);
  const votes = useSelector((store) => store.votes);
  //console.log("I'm votes : ", votes);
  const dispatch = useDispatch();
  const notify = (name) => toast.info(`You've voted for ${name}`);

  const vote = voteValue(votes, pos, id);
  const addVoteHandler = (id, pos) => {
    console.log("[Pos of component] : ", pos);

    dispatch(addVote(id, pos));
  };

  const deleteVoteHandler = (id, pos) => {
    console.log("[Pos of component] : ", pos);

    dispatch(deleteVote(id, pos));
  };

  return (
    <>
      <div>
        {!vote && (
          <button
            className={styles.button1}
            onClick={() => {
              addVoteHandler(id, pos);
              //  console.log("button para: ", urlPara, votes[urlPara]?.length);
              if (
                (urlPara === "ug" || urlPara === "pg") &&
                votes[urlPara].length < 7
              ) {
                notify(name);
              } else if (urlPara === "girl" && votes[urlPara].length < 3) {
                notify(name);
              } else if (typeof votes[urlPara] === "number") {
                notify(name);
              }
            }}
          >
            Vote
          </button>
        )}
        {vote && (
          <button
            className={styles.button2}
            style={hover ? { background: "#ff6100" } : { background: "" }}
            onClick={() => deleteVoteHandler(id, pos)}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <div className="flex justify-start items-center ">
              <img
                style={{ height: "20px", width: "auto" }}
                src={hover ? cancel : check}
                className="pr-2"
                alt="BTN"
              />

              <div>{hover ? "Cancel" : "Voted"}</div>
            </div>
          </button>
        )}
      </div>
    </>
  );
};

export const MultipleVote = ({ name, id, pos }) => {
  const [checked, setChecked] = useState(false);
  const [text, setText] = useState("Vote");
  const handleChange = () => {
    setChecked(!checked);
    if (text === "Vote") setText("Voted");
    else if (text === "Voted") setText("Vote");
  };
  return (
    <div>
      <button className={styles.button1}>
        <div className="flex">
          <div className="pr-2">
            <input type="checkbox" checked={checked} onChange={handleChange} />
          </div>
          <div className="flex flex-col">
            <p>{text}</p>
          </div>
        </div>
      </button>
    </div>
  );
};

export const CancelVote = ({ name, id, pos }) => {
  return (
    <div>
      <button className={styles.button3}>
        <div className="flex">
          <div className="pt-1">
            <img src={cancel} alt="BTN" />
          </div>
          <div>Cancel Vote</div>
        </div>
      </button>
    </div>
  );
};

export const CancelMultiple = ({ name, id, pos }) => {
  return (
    <div>
      <button className={styles.button3}>
        <div className="flex">
          <div className="pr-2">
            <input type="checkbox" />
          </div>
          <div className="flex flex-col">
            <p>Cancel Vote</p>
          </div>
        </div>
      </button>
    </div>
  );
};
