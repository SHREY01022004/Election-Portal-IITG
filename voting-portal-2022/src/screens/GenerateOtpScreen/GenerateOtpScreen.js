import React, { useState } from "react";
import Number from "./Number";
import styles from "./GenerateOtpScreen.module.css";
import { generateVoterId } from "../../api/index";
import Loader from "../../components/Loader/Loading";
import CheckIDCard from "../../components/CheckIDCard/CheckIDCard";
import error_svg from "./error.svg";
const GenerateOtpScreen = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [voted, setVoted] = useState(false);
  const [sent, setSent] = useState(false);
  const [loaded, setLoaded] = useState(null);
  const [email, setEmail] = useState("");
  const [error, setError] = useState();

  const handleSubmit = async () => {
    if (email.length === 0) return;
    try {
      setSent(true);
      const { data } = await generateVoterId(email + "@iitg.ac.in");

      if (data.valError) {
        setError(data["valError"]);
      } else if (data.user != null) {
        if (data.is_voted == true) setVoted(true);
        else setIsSuccess(true);
      } else {
        setIsSuccess(false);
      }

      setLoaded(data);
    } catch (e) {
      console.log("error", e);
      setIsSuccess(false);
      setLoaded(true);
    }
  };

  const handleClick = () => {
    window.location.reload();
  };
  return (
    <>
      <div className="flex flex-col ml-4">
        <div className={`${styles.head} mb-10`}>Steps to send OTP</div>
        <div className="flex flex-col my-3">
          <div className="flex">
            <Number number="1"></Number>
            <div className={`${styles.bold} flex self-center ml-3.5`}>
              Enter voter’s User ID
            </div>
          </div>
          <div className="ml-12 mt-3">
            <div className={`${styles.small}`}>User ID</div>
            <div className="flex items-center gap-4">
              <input
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={true}
              />
              <div>@iitg.ac.in</div>
            </div>
            {/* <br /> */}
            <div className="pt-4">
              {!sent && (
                <button className={styles.button} onClick={handleSubmit}>
                  Send OTP
                </button>
              )}
              {sent && loaded == null && (
                <Loader text="Loading.. Please Wait" />
              )}
              {isSuccess && <button className={styles.button2}>Sent </button>}
              {loaded != null && !isSuccess && !voted && (
                <div className="flex justify-start items-center gap-2">
                  <img width={20} src={error_svg} alt="err" />
                  <div className="text-base text-rose-600">{error}</div>
                </div>
              )}
              {voted && <button className={styles.button3}>Has Voted!</button>}
            </div>
          </div>
        </div>
        <div className="flex my-3">
          <Number number="2"></Number>
          <div className={`${styles.bold} flex self-center ml-3.5`}>
            Verify ID Card
            {/* {isSuccess && console.log("data", loaded?.data?.user?.email)} */}
          </div>
        </div>
        <div className="py-4 pl-8">
          {isSuccess && loaded != null && (
            <CheckIDCard
              email={loaded?.user?.email}
              name={loaded?.user?.name}
              roll_number={loaded?.user?.roll_number}
              degree={loaded?.user?.degree}
              hostel={loaded?.user?.hostel}
              branch={loaded?.user?.branch}
            />
          )}
          <div id="idCardError" style={{ display: "none" }}>
            Please carry your ID card / proof of branch change.{" "}
          </div>
        </div>
        <div className="flex flex-col my-3">
          <div className="flex mb-2">
            <Number number="3"></Number>
            <div className={`${styles.bold} flex self-center ml-3.5`}>
              Ask voter to go to next screen
            </div>
          </div>
          <div className={`${styles.detail} ml-12`}>
            Ask user to wait for 5-10s and go to next screen
          </div>
          <div className={`mt-6 ml-12`}>
            <button className={styles.button} onClick={handleClick}>
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GenerateOtpScreen;
