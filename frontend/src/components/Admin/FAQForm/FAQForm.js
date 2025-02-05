import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { BASEURL } from "../../../constants";
import { useNavigate } from "react-router-dom";
import { addFAQ, editFAQ } from "../../../actions/faq";

const FAQForm = ({ type, formData }) => {
  const [question, setQuestion] = useState(
    formData && formData.question ? formData.question : ""
  );

  const [answer, setAnswer] = useState(
    formData && formData.answer ? formData.answer : ""
  );

  const link_id = formData && formData.id;
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (type === "Add")
      dispatch(addFAQ({ question, answer, election: 1 })).then(() => {
        navigate("../faq", { replace: true });
      });
    else
      dispatch(
        editFAQ(link_id, {
          question,
          answer,
          election: 1,
        })
      ).then(() => {
        navigate("../faq", { replace: true });
      });
  };
  return (
    <>
      <h1 className="text-3xl text-black pb-6">{type} FAQ</h1>
      <div className="flex flex-wrap justify-center">
        <div className="w-full lg:w-1/2 my-6 pr-0 lg:pr-2">
          <p className="text-xl pb-6 flex items-center">
            <i className="fas fa-list mr-3"></i>
          </p>
          <div className="leading-loose">
            <form
              className="p-10 bg-white rounded shadow-xl"
              onSubmit={(e) => formSubmitHandler(e)}
            >
              <div className="mt-2">
                <label
                  className="block text-sm text-gray-600"
                  htmlFor="question"
                >
                  Question
                </label>
                <input
                  className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                  id="question"
                  name="question"
                  type="text"
                  onChange={(e) => setQuestion(e.target.value)}
                  value={question}
                  required
                />
              </div>
              <div className="mt-2">
                <label className="block text-sm text-gray-600" htmlFor="answer">
                  Answer
                </label>
                <input
                  className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                  id="answer"
                  name="answer"
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  required
                />
              </div>
              <div className="mt-6">
                <button
                  className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQForm;
