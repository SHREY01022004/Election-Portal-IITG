import React, { useState } from "react";
import { AgendaSVG } from "./AgendaSVG";
import ShareModal from "../ShareModal/ShareModal";
import styles from "../../../../screens/CandidatePositionForm/CandidatePositionForm.module.css";
const NameTag = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  let capital_name = props.name;
  let arr = capital_name.split(" ");
  arr.forEach((e, index, theArray) => {
    theArray[index] = e.charAt(0) + e.slice(1).toLowerCase();
  });

  capital_name = arr.join(" ");

  return (
    <div className="">
      <div className="w-full flex justify-between items-center">
        <div className="flex justify-center items-center text-gray-400 font-semibold text-base sm:text-lg">
          <p>Contesting for {props.position}</p>
        </div>
        <div className="hidden space-x-2 sm:block">
          {isOpen && (
            <ShareModal setIsOpen={setIsOpen} url={window.location.href} />
          )}
          <button className={styles.button} onClick={() => setIsOpen(true)}>
            Share this profile
          </button>
          {/* <button
            className={styles.button3}
            onClick={() => {
              window.open(props.agenda_pdf);
            }}
          >
            <div className="flex items-center">
              Agenda
              <AgendaSVG />
            </div>
          </button> */}
        </div>
      </div>
      <div
        className={`font-bold text-[26px] sm:text-5xl text-gray-800 my-1 sm:my-2 sm:mt-4 ${styles.atkinson}`}
      >
        {capital_name}
      </div>
      <div className={styles.pink}>
        {props.degree}, {props.branch}
      </div>
      <div className="flex justify-between items-center my-2 space-x-2 sm:hidden">
        {isOpen && (
          <ShareModal setIsOpen={setIsOpen} url={window.location.href} />
        )}
        <button
          className={`${styles.button} w-max py-[6px] px-[20px]`}
          onClick={() => setIsOpen(true)}
        >
          Share this profile
        </button>
        {/* <button
          className={styles.button3}
          onClick={() => {
            window.open(props.agenda_pdf);
          }}
          style={{ width: "50%", padding: "6px 20px" }}
        >
          <div className="flex justify-center items-center">
            Agenda
            <AgendaSVG />
          </div>
        </button> */}
      </div>
    </div>
  );
};

export default NameTag;
