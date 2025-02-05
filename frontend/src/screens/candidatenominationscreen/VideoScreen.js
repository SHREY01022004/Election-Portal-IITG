import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useNavigationType } from "react-router-dom";
import { getUser } from "../../actions/auth";
import { API, updateCandidateData, uploadCredentials } from "../../api";
import { SET_CANDIDATE_DATA } from "../../constants";
import useNominate from "../../hooks/useNominate";
import styles from "../Register/RegisterScreen.module.css";
import SaveAndNext from "./SaveAndNext";
import YoutubeEmbed from "../../components/Home/Nomination/Video/YoutubeEmbed";

const VideoScreen = () => {
  const {
    error,
    message,
    loading,
    candidate,
    setError,
    updateNomination,
    isDeadlineOver,
  } = useNominate();

  const videoRef = useRef(null);
  let embedId = "";
  const CheckURL = (value) => {
    var regEx =
      "^(?:https?:)?//[^/]*(?:youtube(?:-nocookie)?.com|youtu.be).*[=/]([-\\w]{11})(?:\\?|=|&|$)";
    var matches = value.match(regEx);
    if (matches) {
      return matches[1];
    }
    return false;
  };
  const submitData = async () => {
    if (!videoRef.current.value || !CheckURL(videoRef.current.value)) {
      setError("Please add valid url");
      return;
    }
    embedId = CheckURL(videoRef.current.value);
    const data = { video: videoRef.current.value };
    updateNomination(data, "/nominate/witnesses");
    setError(null);
  };
  return (
    <>
      <div className="px-3 md:p-0">
        {/* <p>Enter Youtube Video url.</p> */}
        <label for="video" className="font-medium text-base text-gray-800">
          Enter Youtube Video Url :
        </label>
        <br />
        <input
          required
          type="text"
          id="video"
          name="video"
          placeholder="youtube video link address..."
          className={`${styles.input} mt-2 md:w-1/2 lg:w-2/5 w-full`}
          defaultValue={candidate?.video}
          ref={videoRef}
          disabled={isDeadlineOver}
        />
        {candidate.video && (
          <div className="w-full md:w-1/2 my-4">
            <YoutubeEmbed embedId={CheckURL(candidate.video)} />
          </div>
        )}
      </div>
      {!isDeadlineOver && (
        <SaveAndNext
          error={error}
          message={message}
          loading={loading}
          submit={submitData}
        />
      )}

      <>
        {isDeadlineOver && (
          <p className="text-red-500 font-medium uppercase">
            Nomination Deadline is over.
          </p>
        )}
      </>
    </>
  );
};
export default VideoScreen;
