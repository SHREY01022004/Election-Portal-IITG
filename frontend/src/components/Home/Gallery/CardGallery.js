import React from "react";
import Card from "./Card";
import styles from "./CardStyle.css"
import { ShuffleArray } from "../../../utils";

const CardGallery = ({persons}) => {
  if(persons?.length>0){
      persons = ShuffleArray(persons);
  }
  
  return (
    <div className="ml-4 flex items-center justify-center md:m-2">
      <div className="grid grid-flow-col md:grid-flow-row-dense	auto-cols-max overflow-auto sm:overflow-visible md:grid-cols-2 lg:grid-cols-3 gap-3">
        {persons && persons.map((person,i)=>{
          return <Card key={i} id={i} person={person} className={styles.card}/>;
        })}
      </div>
    </div>
  );
};

export default CardGallery;
