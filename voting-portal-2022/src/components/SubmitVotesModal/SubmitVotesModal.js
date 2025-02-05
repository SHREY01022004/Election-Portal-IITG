import SubmitVotesField from "../SubmitVotesField/SubmitVotesField";
import styles from "./SubmitVotesModal.module.css";
import { candidateIDMap } from "../../constants/index";
import { useDispatch, useSelector } from "react-redux";
import { postAllVotes, postVotes } from "../../redux/actions/votes";
import { votesToString } from "../../utils/voteValue";
import StatusScreen from "../../screens/StatusScreen";
import Loading from "../Loader/Loading.js";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

function generateRandom(min = 0, max = 100) {
  let difference = max - min;
  let rand = Math.random();
  rand = Math.floor( rand * difference);
  rand = rand + min;

  return rand;
}

const SubmitVotesModal = ({ votes, setModalOpen, candidateIDMap, isVoted }) => {
  const dispatch = useDispatch();
  const [hasSendVote, setHasSendVote] = useState(false);
  const [confirm, setConfirm] = useState(false);
  
  const checkFinalSubmit = ()=> {
    if(!isVoted) 
      return true;
    else 
      return !confirm;
  }

  const [finalSubmit, setFinalSubmit] = useState(checkFinalSubmit());
  const history = useHistory();
  const voterInfo = useSelector((store) => store.voterInfo);

  console.log("voterid sxnls: ", voterInfo);


  useEffect(()=>{
    setFinalSubmit(checkFinalSubmit());
  },[confirm,isVoted]);


  const arrayToString = (ids) => {
    let names = "";
    ids.forEach((e) => {
      names += candidateIDMap[e];
      names += " , ";
    });
  
    names = names.slice(0, -3);
  
    return names;
  };

  const submitHandler = () => {
    console.log("voterid before submit: ", voterInfo);
    const strVotes = votesToString(votes);
    setHasSendVote(true);
    dispatch(postVotes(strVotes, voterInfo.voterId))
      .then((serverData) => {
        console.log("[ye status data hai ]", serverData);
        if (serverData && serverData.payload.status === 200) {
          // dispatch(postAllVotes(strVotes, voterInfo.voterId)).then((data) => {
          //   console.log("[ye abhi ka data]", data);

          //   history.push({
          //     pathname: "/response",
          //     state: {
          //       transaction_id: data.payload.transactionHash,
          //       voter_id: voterInfo.voterId,
          //       block_id: data.payload.blockHash,
          //       gas: data.payload.gasUsed,
          //       isShow: data.payload.isShow,
          //     },
          //   });
          // });
          setTimeout(() => {
            history.push("/response")
          }, generateRandom(3000,8000))
         
        } else {
          setTimeout(() => {
            history.push({
              pathname: "/fail",
              state: {
                data: serverData?.payload,
              },
            });
          }, generateRandom(3000,8000))
        }

      })
      .catch((err) => {
        console.log("Voting error: ",err)
        setTimeout(() => {
          history.push({
            pathname: "/fail",
            state: {
              data:  err?.message || JSON.stringify(err)
          }});
        }, generateRandom(3000,8000))
      
      });
  };
  return (
    <>
      {hasSendVote ? (
        <StatusScreen>
          <Loading text="Your votes are being stored securely!" />
        </StatusScreen>
      ) : (
        <div className={`${styles.model}`}>
          <div
            className={`${styles.mainContent} lg:w-6/12 ml-auto mr-auto mt-auto mb-auto pb-6 md:w-9/12 w-11/12`}
          >
            <div className={`${styles.heading} pl-8 pt-4 pb-4`}>
              Submit your Votes
            </div>
            <div className={`${styles.form} flex flex-col ml-8 mt-5 mr-11`}>
              <SubmitVotesField
                post="Post"
                pClass="font-medium"
                candidate="Candidate"
                cClass="font-medium"
              />
              <SubmitVotesField
                post="Vice President"
                candidate={candidateIDMap[votes["vicepresident"]]}
              />
              <SubmitVotesField
                post="Hostal Affairs Board"
                candidate={candidateIDMap[votes["hab"]]}
              />
              <SubmitVotesField
                post="Students Web Commitee"
                candidate={candidateIDMap[votes["swc"]]}
              />
              <SubmitVotesField
                post="Sports Board"
                candidate={candidateIDMap[votes["sports"]]}
                cClass="text-orange-500"
              />

              <SubmitVotesField
                post="Welfare Board"
                candidate={candidateIDMap[votes["welfare"]]}
                cClass="text-orange-500"
              />

              <SubmitVotesField
                post="SAIL"
                candidate={candidateIDMap[votes["sail"]]}
                cClass="text-orange-500"
              />
              <SubmitVotesField
                post="Technical Board"
                candidate={candidateIDMap[votes["technical"]]}
                cClass="text-orange-500"
              />
              <SubmitVotesField
                post="Cultural Board"
                candidate={candidateIDMap[votes["cultural"]]}
                cClass="text-orange-500"
              />

              {!(voterInfo?.degree === "B" || voterInfo?.degree === "Bdes") && (
                <SubmitVotesField
                  post="PG Senate"
                  candidate={arrayToString(votes["pg"])}
                  long={true}
                />
              )}
              {(voterInfo?.degree === "B" || voterInfo?.degree === "Bdes") && (
                <SubmitVotesField
                  post="UG Senate"
                  candidate={arrayToString(votes["ug"])}
                  long={true}
                />
              )}
              {voterInfo?.gender === "Female" && (
                <SubmitVotesField
                  post="Girls Senate"
                  candidate={arrayToString(votes["girl"])}
                  long={true}
                />
              )}
            </div>
            <div className="mr-11 ml-8 mt-5 mb-8 flex items-center">
              <input
                type="checkbox"
                id="check"
                name="check"
                className={`${styles.checkBox} w-5 h-5`}
                value={confirm}
                onChange={(e) => setConfirm((prev) => !prev)}
              ></input>
              <label for="check" className="text-base ml-2">
                I understand that I will not be able to change my votes after I
                submit
              </label>
            </div>
            <div className="flex gap-4 mr-11 ml-8">
              <button
                className={`${styles.cancelBtn} py-2.5 px-5`}
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className={`${styles.contBtn} py-2.5 px-5 ${
                  finalSubmit && `${styles.btnToolTip} cursor-not-allowed`
                }`}
                onClick={submitHandler}
                disabled={finalSubmit}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default SubmitVotesModal;
