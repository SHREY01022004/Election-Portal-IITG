import { useState } from "react";
import styles from "./SubmitVotesField.module.css";

const SubmitVotesField = (props) => {
  //console.log(props.post, props.candidate);
  const [clicked, setClicked] = useState(false);
  let shortCand =
    props.candidate?.length > 26
      ? props.candidate.substr(0, 26) + "..."
      : props.candidate;
  const dropDownHandler = (e) => {
    setClicked(!clicked);
  };
  let candidate = <div className={props.cClass}>{props.candidate}</div>;
  if (props.long === true) {
    candidate = (
      <div className={props.cClass}>
        <div className="flex">
          {clicked ? props.candidate : shortCand}
          <div
            onClick={dropDownHandler}
            className="self-center mr-2 ml-auto cursor-pointer"
          >
            <div className="hidden">{props.candidate}</div>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={clicked ? { transform: "rotate(180deg)" } : {}}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5 8L10 13L15 8H5Z"
                fill="#959DA5"
              />
            </svg>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div
      className={`grid grid-cols-2 grid-flow-col gap-4 pl-4 py-4 ${styles.main}`}
    >
      <div className={props.pClass}>{props.post}</div>
      {candidate}
    </div>
  );
};
export default SubmitVotesField;
