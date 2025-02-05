import React from "react";
import styles from "./CandidateCard.module.css";
import { SingleVote } from "../buttons/buttons";
const Agenda = (p) => {
  return <ol>{p.title}</ol>;
};

const CandidateCard = ({ candidate,urlPara }) => {
  function toPascalCase(string = "") {
    console.log("string", string)
    let b = string.split(" ");
    let string2 = "";
    console.log("bb",b)
    for (let i = 0; i < b.length; i++) {
      if(b[i] !== ""){
        let s = b[i][0].toUpperCase();
        let y = b[i].substr(1).toLowerCase();
        const final = s + y;
        string2 += final;
        string2 += " ";
      }
    }
    return string2;
  }
  let agendas = [];
  for (const [key, value] of Object.entries(candidate.agenda_text)) {
    agendas = [...agendas, <Agenda key={key} title={key} agenda={value} />];
    if (agendas.length === 4) {
      break;
    }
  }
  let listItems = [];
  let list = [];

  if (agendas[0].key[0] !== "1") {
    listItems = agendas.map((agenda) => <li>{agenda}</li>);
  }
  if (agendas[0].key[0] === "1") {
    // list = []
    list = agendas.map((agenda) => <li> {agenda}</li>);
    list.join("\n");
  }
  return (
    <div
      className={`${styles.card} m-10 w-3/4 h-64 flex justify-start hover:shadow-lg transition duration-200 ease-in`}
    >
      <div className="flex-shrink-0 h-full w-60">
        <img
          src={candidate.image}
          alt="W"
          className={styles.candidate}
        />
      </div>

      <div className="p-4 md:pr-16 overflow-hidden">
        <h1 className="font-bold pl-2">{toPascalCase(candidate.name)}</h1>
        <div className={`h-3/5 overflow-auto pr-2 ${styles.agendaCont}`}>
          <div className="pl-6 pt-2">
            {listItems.length > 0 && (
              <ol className="list-decimal">{listItems}</ol>
            )}
            {listItems.length === 0 && <ol className="list-none">{list}</ol>}
          </div>
          <div className="mt-auto mb-0"></div>
        </div>

        <div className="pt-4">
          <SingleVote
            name={toPascalCase(candidate.name)}
            key={candidate.id}
            id={candidate.id}
            pos={candidate.pos}
            urlPara={urlPara}
          />
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;
