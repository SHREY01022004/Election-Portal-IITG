import Tile from "./Tile";
import postSVG from "./post.svg";
import agendaSVG from "./agenda.svg";
import videoSVG from "./video.svg";
import formSVG from "./form.svg";
import plusSVG from "./plus.svg";
import verifySVG from "./verify.svg";
import styles from "./VerificationBox.module.css";
import { useSelector } from "react-redux";
import { API, updateCandidateData } from "../../../api";
import React, { useEffect, useState } from "react";
import useNominate from "../../../hooks/useNominate";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
import {
  aboutSchema,
  candidateSchema,
} from "../../../screens/candidatenominationscreen/AboutScreen";
import { witnessSchema } from "../../../screens/candidatenominationscreen/WitnessesScreen";

const lastDateOfVerification = "TBD";

const VerificationBox = () => {
  const {
    candidate,
    error,
    message,
    updateNomination,
    isComplete,
    setError,
    setMessage,
    isDeadlineOver,
  } = useNominate();
  const userData = useSelector((store) => store.auth);
  const isNominationComplete = userData?.candidates[0]?.nomination_complete
  const [isOpen, setIsOpen] = useState(false);
  const [witnessComplete, setwitnessComplete] = useState(false);
  const [profileComplete, setprofileComplete] = useState(false);
  // Undertaking Logic
  const [isUndertaking1Accepted, setIsUndertaking1Accepted] = useState(false);
  const [isUndertaking2Accepted, setIsUndertaking2Accepted] = useState(false);
  console.log(!(isComplete&&isUndertaking1Accepted&&isUndertaking2Accepted));
  useEffect(() => {
    if (candidate) {
      checkWitnessData();
      checkProfile();
    }
  }, [candidate]);

  const checkCreds = () => {
    if (
      candidate &&
      candidate.credentials &&
      candidate.credentials["Latest Grade Card"]
    ) {
      return true;
      // if (
      //   candidate?.position?.title !== "PG Senator" &&
      //   candidate?.position !== 10
      // ) {
      //   return true;
      // } else if (
      //   (candidate?.position?.title === "PG Senator" ||
      //     candidate?.position === 10) &&
      //   candidate.credentials["Thesis incomplete proof"]
      // ) {
      //   return true;
      // } else {
      //   return false;
      // }
    } else {
      return false;
    }
  };

  const submitNominationForm = async () => {
    if (!(isComplete && profileComplete && witnessComplete)) {
      setError("Please complete all the steps,by verifying the tabs");
      return;
    }
    updateNomination({ nomination_complete: true });
    setIsOpen(false);
  };

  const checkProfile = async () => {
    try {
      await candidateSchema.validate(candidate, { abortEarly: false });
      await aboutSchema.validate(userData.euser, { abortEarly: false });
      setprofileComplete(true);
    } catch (err) {
      console.log(err);
      setprofileComplete(false);
    }
  };

  const checkWitnessData = async () => {
    try {
      await witnessSchema.validate(candidate.proposed_by, {
        abortEarly: false,
      });
      await witnessSchema.validate(candidate.seconded_by, {
        abortEarly: false,
      });
      setwitnessComplete(true);
    } catch (err) {
      console.log("Witness schema not validated");
      console.log(err);
      setprofileComplete(false);
    }
  };

  return (
    <div className={`w-full md:w-9/12 ${styles.main} pt-6 pl-6 pr-6 pb-6`}>
      <div className="flex flex-wrap">
        <Tile
          svg={postSVG}
          text={"Register for the Post"}
          done={!!candidate.id}
        />
        <Tile
          svg={formSVG}
          text={"Complete your election profile"}
          done={profileComplete}
        />
        <Tile
          svg={videoSVG}
          text={"Upload your introduction video"}
          done={!!candidate.video}
        />
        <Tile
          svg={agendaSVG}
          text={"Upload your agendas"}
          done={
            candidate &&
            candidate.agenda_text &&
            Object.keys(candidate.agenda_text).length >= 3
          }
        />

        <Tile svg={plusSVG} text={"Add Credentials"} done={checkCreds()} />
        <Tile
          svg={verifySVG}
          text={"Add Witness Data"}
          done={witnessComplete}
        />
      </div>
      {!isNominationComplete && !isDeadlineOver &&(
  <div>
      {/* Undertaking 1 */}
      <div className="my-[1.5%]">
        <label>
          <input
            type="checkbox"
            checked={isUndertaking1Accepted}
            onChange={() => setIsUndertaking1Accepted(!isUndertaking1Accepted)}
          />
       I, hereby declare my nomination for the Students Gymkhana Council post for the session 2024-25. With this declaration, I commit to contesting in the SGC elections 2024-25 in a manner that upholds fairness and integrity, adhering to all rules and regulations outlined by the Election Commission. I understand and acknowledge that the Election Commission holds the authority to cancel my candidature and impose strict penalties if I am found engaging in any form of unfair practices or violating the code of conduct established for the elections. I affirm my dedication to conducting myself in a manner that reflects the principles of honesty, transparency, and respect for the democratic process.
        </label>
      </div>

      {/* Undertaking 2 */}
      <div>
        <label>
          <input
            type="checkbox"
            checked={isUndertaking2Accepted}
            onChange={() => setIsUndertaking2Accepted(!isUndertaking2Accepted)}
          />
         In case of official assumption of the post, I pledge to uphold and honour the rules and regulations of the institute with utmost sincerity. I commit to maintaining the institute's honour and glory by adhering to its principles and values. I solemnly affirm that I will refrain from any form of substance abuse and will not violate any hostel rules and regulations, academic discipline, student code of conduct, or anti-ragging protocols. I accept that any violation of the aforementioned guidelines grants the institute authority the right to suspend my post without further discussion and to take severe disciplinary actions against me. I signify my unwavering dedication to fulfilling my responsibilities with integrity and dignity.
        </label>
      </div>
      </div>
      )}
    
      <div className={`flex mt-4`}>
        <button className={`${styles.btn1} py-2 px-4 mr-4 cursor-pointer`}>
          <a
            className={`${styles.text}`}
            href={`${process.env.REACT_APP_BASEAPIURL}/candidate_pdf/${candidate?.id}/`}
            // href={`https://swc.iitg.ac.in/elections_api/sgc/candidate_pdf/${candidate?.id}/`}
            target="_blank"
            rel="noreferrer"
          >
            Preview Nomination Form
          </a>
        </button>
        {!isNominationComplete && !isDeadlineOver && (
          <button
            className={`${isComplete ? styles.btn1 : styles.btn2} py-2 px-4`}
            disabled={!(isComplete&&isUndertaking1Accepted&&isUndertaking2Accepted)}
            onClick={() => setIsOpen(true)}
            // onClick={submitNominationForm}
          >
            <div className={`${isComplete&&isUndertaking1Accepted&&isUndertaking2Accepted ? styles.text1 : styles.text2}`}>
              Submit profile
            </div>
          </button>
        )}
      </div>
      <p className={`mt-2 text-blue-500`}>
        Your data is synced and will be auto updated on deadline.
      </p>
      
        <>
          {isDeadlineOver && (
            <p className="text-blue-500">Nomination Deadline is over.</p>
          )}
        </>
      {error && <p className="text-red-600 mt-5">{error}</p>}
      {message && <p className="text-green-600 mt-5">{message}</p>}
      <div className={`flex mt-4`}>
        <div className={`${styles.lastdate}`}>
          Last Date for Verification is: {lastDateOfVerification}
        </div>
        <div className={`mr-0 ml-auto ${styles.help}`}>
          <a href="mailto:swc@iitg.ac.in">Need Help?</a>
        </div>
      </div>
      {isOpen && (
        <ConfirmDialog
          setIsOpen={setIsOpen}
          finalSubmit={submitNominationForm}
        />
      )}
    </div>
  );
};

export default VerificationBox;
