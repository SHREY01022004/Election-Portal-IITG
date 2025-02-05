import React, { useState, useEffect } from "react";
import "./CardStyle.css";
import { Link } from "react-router-dom";
import DefaultIMG from "./default.svg";

const MoreCandidatesCard = ({ person,candidateName }) => {
  
  const [loading, setLoading] = useState(true);

 
  let capital_name = person?.name || person?.user?.name;
  let image = person.image ? person.image : DefaultIMG;
  let arr = capital_name.split(" ");
  arr.forEach((e, index, theArray) => {
    theArray[index] = e.charAt(0) + e.slice(1).toLowerCase();
  });

  capital_name = arr.join(" ");
  const config = {
    "background-image":
      "linear-gradient(0deg,rgba(10, 10, 10, 0.8) 0%,rgba(255, 255, 255, 0) 100%), url(" +
      image +
      ")",
    "min-width": "10rem",
  };

 console.log(candidateName,"hed");

  return (
    <Link to={`/candidate/${person.id}/${candidateName}`}>
      <div className={`!rounded-md front shadow-lg`} style={config}>
        <div className="title text-xl font-bold">{capital_name}</div>
        {person.tagline ? <div className="title smallTitle">{person.tagline}</div> : <div className="title smallTitle"></div>}
      </div>
    </Link>
  );
};

export default MoreCandidatesCard;
