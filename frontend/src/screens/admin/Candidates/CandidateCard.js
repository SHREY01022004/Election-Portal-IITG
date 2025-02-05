import React from "react";

const CandidateCard = (props) => {
  return (
    <div className="relative flex flex-col justify-start rounded-md shadow-lg bg-white">
      <div className="w-full bg-gray-200 rounded-md">
        <img
          src={props.imgSrc}
          alt={`${props.name}'s profile pic`}
          style={{ height: "250px" }}
          className="w-full object-contain rounded-md"
        />
      </div>
      <div className="text-black font-bold pl-3 pt-1">{props?.name}</div>
      <div className="text-sm italic text-black font-medium pl-3 pb-2">{props?.position}</div>
    </div>
  );
};

export default CandidateCard;
