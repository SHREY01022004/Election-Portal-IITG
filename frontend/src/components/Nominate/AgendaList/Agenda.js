import { useState } from "react";
import styles from "./Agenda.module.css";

const Agenda = (props) => {
  const [clicked, setClicked] = useState(false);

  const agendaDelete = async () => {
    console.log("213");
    const prevAgendas = props.candidate.agenda_text;
    const newAgendas = {};
    Object.keys(prevAgendas).forEach((k) => {
      if (k == props.title) return;
      newAgendas[k] = prevAgendas[k];
    });
    const data = {
      agenda_text: newAgendas,
    };
    props.updateNomination(data);
  };
  return (
    <div className="p-2">
      <div className={`w-full md:w-3/5 ${styles.container}`}>
        <div className="p-6">
          <div className="flex">
            <h1 className="text-[18px] text-gray-800">
              Agenda {props.count}:{" "}
              <span className="font-bold">{props.title}</span>
            </h1>
          </div>
          <div className="flex flex-col">
            <div className={`pt-4 ${styles.agendaContainer}`}>
              {props.agenda}
            </div>
            <div className="flex w-full items-center justify-start mt-2">
              {!props.isFormClosed && (
                <>
                  <button
                    className={`${styles.button} mt-2 mr-2`}
                    onClick={() => {
                      props.setTitle(props.title);
                      props.setIsOld(true);
                      props.setIsOpen(true);
                    }}
                  >
                    <div className="flex">
                      {/* <img src={doc} alt="doc" /> */}
                      <p className="">Edit</p>
                    </div>
                  </button>
                  <button
                    className={`${styles.button} mt-2 text-red-500`}
                    onClick={agendaDelete}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Agenda;
