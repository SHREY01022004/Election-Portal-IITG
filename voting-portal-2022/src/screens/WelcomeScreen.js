import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { countVotes, methodFunction } from "../utils/countMethodFunction";

const WelcomeScreen = () => {
  // useEffect(()=>{
  //   countVotes(); //calling the web3 function
  //   methodFunction("1, 2, 3", "69"); //calling the web3 function
  // }, []);
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex w-5/12">
        <div className="flex w-1/2 justify-center items-center">
          Icon of IITG
        </div>
        <div className="flex w-1/2 justify-center items-center">
          <Link to="/welfare" className="p-3 bg-blue-600 text-white">
            Start Voting
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
