import React, { useEffect, useState } from "react";
import styles from "./AgendaList.module.css";
import TextEditor from "../../TextEditor/TextEditor";
import Agenda from "./Agenda";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import useNominate from "../../../hooks/useNominate";
const AgendaList = () => {
  const {
    candidate,
    error,
    message,
    updateNomination,
    loading,
    isDeadlineOver,
  } = useNominate();

  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState(null);
  const [isOld, setIsOld] = useState(false);
  return (
    <div className="">
      {candidate?.agenda_text &&
        Object.keys(candidate?.agenda_text || []).map((a, i) => (
          <Agenda
            title={a}
            agenda={parse(candidate.agenda_text[a])}
            agenda_up={candidate.agenda_text[a]}
            setIsOpen={setIsOpen}
            setTitle={setTitle}
            updateNomination={updateNomination}
            candidate={candidate}
            isFormClosed={isDeadlineOver}
            setIsOld={setIsOld}
            long={true}
            count={i + 1}
          />
        ))}
      {!candidate ||
        !candidate?.agenda_text ||
        (Object.keys(candidate?.agenda_text || []).length < 3 && (
          <p className="text-sm ml-2 mt-2">Add atleast 3 agendas</p>
        ))}

      {isOpen && (
        <TextEditor
          setIsOpen={setIsOpen}
          setTitle={setTitle}
          updateNomination={updateNomination}
          candidate={candidate}
          title={title}
          isOld={isOld}
          setIsOld={setIsOld}
        />
      )}
      {/* <textarea value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}></textarea> */}
      {/* <Agenda count={count} title={title} agenda={agenda} long={true} /> */}
      {!isDeadlineOver && (
        <div className="pt-8">
          <button
            className={`text-white ${styles.button} px-5 ml-2`}
            onClick={() => setIsOpen(true)}
          >
            Add Agenda
          </button>
        </div>
      )}
      {loading && <p className="text-sm text-blue-500">Saving...</p>}
      {error ? (
        <p className="text-red-300">{error}</p>
      ) : message ? (
        <p className="text-green-400">{error}</p>
      ) : null}

      <>
        {isDeadlineOver && (
          <p className="text-red-500 font-medium uppercase mt-4 ml-2">
            Nomination Deadline is over.
          </p>
        )}
      </>
      <br />
    </div>
  );
};

export default AgendaList;
