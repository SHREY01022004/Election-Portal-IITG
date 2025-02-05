import React, { useEffect } from "react";
import StatusScreen from "./StatusScreen";
import SuccessMessage from "../components/SuccessMessage/SuccessMessage";
import FailMessage from "../components/FailMessage/FailMessage";
import { useLocation, Redirect } from "react-router-dom";

export const VotingFailScreen = () => {
  const location = useLocation();
  //console.log("[ye hamari location]", location);
  useEffect(() => {
    let id = setTimeout(() => {
      window.location.replace("/voting_portal");
    }, 5000)
    return () => {
      clearTimeout(id)
    }
  },[])
  return (
    <>
      {location.state ? (
        <div>
          <StatusScreen>
            <FailMessage message={location.state.data} />
          </StatusScreen>
        </div>
      ) : (
        <Redirect to="/"/>
      )}
    </>
  );
};
