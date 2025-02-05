import React from "react";
import arrow from "./arrowRight.png";
import { Link } from "react-router-dom";

const StartVotingButton = () => {
  return (
    <Link to="/enterid">
      <div className="w-80 bg-gradient-to-r from-blueBg to-violetBg rounded-lg cursor-pointer hover:shadow-2xl">
        <div className="flex flex-row items-center justify-center p-4">
          <div className="text-2xl font-bold font-atkinson">
            <p className="text-white">Start Voting</p>
          </div>
          <div className="w-12 h-12">
            <img src={arrow} alt="" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default StartVotingButton;
