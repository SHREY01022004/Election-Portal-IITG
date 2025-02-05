import React from "react";
import { url2Post } from "../../constants";
import styles from "../buttons/buttons.module.css";

const Topbar = ({ position, vote }) => {
  const showBtnText = () => {
    if (position === "ug" || position === "pg" || position === "girl") {
      return position === "girl"
        ? `${vote.length}/3 Multiple`
        : `${vote.length}/7 Multiple`;
    } else {
      return "Single";
    }
  };

  return (
    <div className="fixed top-0 left-80 xl:left-96 -z-50 flex justify-start items-center w-full py-3 bg-white">
      <h2 className="text-lg" style={{ marginRight: "40vw" }}>
        <span className="font-bold ml-16">
          {/* {candidates.all[0]["position"]} */}
          {url2Post[position]}
        </span>
      </h2>
      <div className={`${styles.bg} text-sm font-atkinson`}>{showBtnText()} Vote</div>
    </div>
  );
};

export default Topbar;
