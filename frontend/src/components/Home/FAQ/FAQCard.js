import React, { useState } from "react";
import * as RiIcons from "react-icons/ri";

const FAQCard = (props) => {
  const [answerOpen, setAnswer] = useState(false);

  const toggleAnswer = () => setAnswer(!answerOpen);
  return (
    <div
      onClick={toggleAnswer}
      className="p-6 rounded-md shadow hover:shadow-md cursor-pointer"
    >
      <div
        className="flex justify-between pb-1 font-semibold"
        style={
          answerOpen
            ? { "margin-bottom": "10px", transition: "all 0.3s ease-out" }
            : { "margin-bottom": "0px", transition: "all 0.3s ease-out" }
        }
      >
        <div>{props.question}</div>
        {answerOpen ? (
          <div>
            <RiIcons.RiArrowUpSFill />
          </div>
        ) : (
          <div>
            <RiIcons.RiArrowDownSFill />
          </div>
        )}
      </div>
      <div
        className={answerOpen ? "opacity-1" : "opacity-0 overflow-hidden"}
        style={
          answerOpen
            ? { maxHeight: "100%", transition: "all 0.7s ease-out" }
            : { maxHeight: "0" }
        }
      >
        {props.answer}
      </div>
    </div>
  );
};

export default FAQCard;
