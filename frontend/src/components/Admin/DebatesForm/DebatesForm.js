import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { BASEURL } from "../../../constants";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  addDebate,
  editDebate,
} from "../../../actions/debates";

const DebatesForm = ({ type, formData }) => {
  const [title, setTitle] = useState(
    formData && formData.title ? formData.title : ""
  );

  const [date, setDate] = useState(
    formData && formData.date ? formData.date : ""
  );
  const [time, setTime] = useState(
    formData && formData.time ? formData.time : ""
    );
    const [debate_time,setdebateTime]=useState("");
 useEffect(() => {
    // Combine date and time into a single string
     const combinedDateTime = `${date}T${time}:00`;
    setdebateTime(combinedDateTime);
  }, [date, time]);


  const link_id = formData && formData.id;
  const dispatch = useDispatch();
  let navigate = useNavigate();


  const formSubmitHandler = (e) => {
    e.preventDefault();
    console.log(debate_time,"hhfff");
    if (type === "Add")
      dispatch(addDebate({ title, date,debate_time })).then(() => {
        navigate("../debates", { replace: true });
      });
    else
      dispatch(
        editDebate(link_id, {
          title,
          date,
          debate_time,
        })
      ).then(() => {
        navigate("../debates", { replace: true });
      });
  };
  return (
    <>
      <h1 className="text-3xl text-black pb-6">{type} Important Date</h1>
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
                <label className="block text-sm text-gray-600" htmlFor="Title">
                  title
                </label>
                <input
                  className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                  id="title"
                  name="title"
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  required
                />
              </div>
              <div className="mt-2">
                <label className="block text-sm text-gray-600" htmlFor="date">
                  Date
                </label>
                <input
                  className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                  id="date"
                  name="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
                    <div className="mt-2">
                <label className="block text-sm text-gray-600" htmlFor="time">
                  Time
                </label>
                <input
                  className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                  id="time"
                  name="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
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

export default DebatesForm;
