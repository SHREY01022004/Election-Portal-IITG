import { React, useState } from "react";
import parse from "html-react-parser";
import styles from "./AgendaList.module.css";
import FAQCard from "../../FAQ/FAQCard";
import styles2 from "../../../Nominate/AgendaNavbar/AgendaNavbar.module.css";

const Agenda = (p) => {
  return (
    <div className="pb-1">
      {/* <div className="font-semibold text-lg">{p.title}</div> */}
      <div className="leading-8">
        <FAQCard question={p.title} answer={parse(p.agenda)} />
        {/* <ol className={`list-decimal text-gray-600 text-lg leading-8 ${styles.list}`}></ol> */}
      </div>
    </div>
  );
};
const AgendaList = (props) => {
  // const list = props.agenda;

  // const updatedList = list.map((listItems) => {
  //   return (
  //     <li key={listItems.toString()}>
  //       {listItems}
  //     </li>
  //   );
  // });
  const [less, setLess] = useState(true);
  let agendas = [];
  let showText;
  if (less) {
    showText = "Show More";
  } else {
    showText = "Show Less";
  }
  for (const [key, value] of Object.entries(props.agenda)) {
    agendas = [...agendas, <Agenda key={key} title={key} agenda={value} />];
    if (less && agendas.length === 4) {
      break;
    }
  }

  return (
    <>
      <div className="flex">
        <div className="font-bold text-lg pb-1 pl-1 sm:pb-4">My Agendas</div>
      </div>
      {/* <div className="p-2 leading-8 text-justify">
        <ul className="list-decimal text-gray-600 text-lg leading-8  ">{props.agenda}</ul>
      </div> */}
      {agendas}

      <div
        className={`mt-2 ml-auto cursor-pointer text-[#f71873] hover:underline`}
        onClick={() => {
          setLess(!less);
        }}
      >
        {showText}
      </div>

      <div className="font-bold text-lg mt-2 sm:mt-4 pt-4">About me</div>
      <div className="text-gray-600 text-base pt-2 px-0 leading-7 text-justify">
        {props.about}
      </div>
    </>
  );
};

export default AgendaList;
