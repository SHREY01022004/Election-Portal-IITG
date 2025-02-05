import React, { useState, useEffect } from "react";
import StatusScreen from "./StatusScreen";
import { getVoterID } from "../api";
import styles from "../components/buttons/buttons.module.css";
import Countdown from "../components/timer/countdown";
const VotingIdGenScreen = (props) => {
  const [success, setSuccess] = useState(false);
  const [otp, setOtp] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [voterId, setVoterId] = useState("");
  const [fill, setFill] = useState(100);
  const [empty, setEmpty] = useState(0);
  const handleGetVoterId = (otp) => {
    console.log("xsxsxs");
    getVoterID(otp)
      .then((data) => {
        setVoterId(data.data.voterid);
        setSuccess(true);
        console.log("Voter id data: ", data);
      })
      .catch((e) => {
        console.log("Voter id error: ", e.response.data);
        setErrorMsg(e.response.data[0]);
      });
  };

  return (
    <StatusScreen>
      {success ? (
        <>
          <div className="w-96">
            <div className="flex flex-col items-center justify-between p-4">
              <div className="text-4xl font-atkinson">
                <p className="text-gray-600">Here is your Voter ID</p>
              </div>
              <div className="mt-8">
                <button className={`${styles.voterId} w-96 h-20  text-white `}>
                  <div className="flex items-center gap-4">
                    <div className="pl-4">
                      <Countdown
                        fill={fill}
                        empty={empty}
                        className="ml-1 text-lg"
                      />
                    </div>
                    <div className="font-extrabold font-roboto text-4xl">
                      {voterId}
                    </div>
                  </div>
                </button>
              </div>
              <div className="mt-6 text-center text-gray-700 w-full">
                You may now write this down and enter this in your voting system
              </div>
              <div className={`${styles.pink} mt-2 text-center `}>
                If you forget this ID you will not be able to cast votes
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* <div className="flex flex-col justify-start">
          <h1>Enter your OTP cdcdcd</h1>
          <div className="flex flex-col items-start">
            <input
              type="number"
              className="border-black-700 p-4"
              style={{ border: "1px solid #2B00FF" }}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button onClick={() => {handleGetVoterId(otp);console.log("sxsxs")}}>Continue</button>
          </div>
        </div> */}
          <div className="w-80">
            <div className="flex flex-col items-center justify-between p-4">
              <div className="text-4xl font-atkinson">
                <p className="text-gray-600">Enter Your OTP</p>
              </div>
              <div>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleGetVoterId(otp);
                  }}>
                  <input
                  type="text"
                  inputMode="numeric"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="outline-none w-64 h-12 p-2 border-2 mt-5 border-purple-400 rounded-md text-purple-600 focus:border-purple-500 font-bold text-center text-2xl "
                />
                <button
                  type="submit"
                  className="w-64 bg-blueBg mt-5 h-12 text-white rounded-lg font-roboto"
                >
                  Continue
                </button>
                </form>
                
              </div>
            </div>
          </div>
        </>
      )}
    </StatusScreen>
  );
};

export default VotingIdGenScreen;
