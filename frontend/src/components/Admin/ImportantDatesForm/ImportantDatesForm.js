import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { BASEURL } from "../../../constants";
import { useNavigate } from "react-router-dom";
import {
  addImportantDate,
  editImportantDate,
} from "../../../actions/importantDates";
import DateTimePicker from 'react-datetime-picker'

const makeDate = (dt)=> {
  let resDate = new Date(dt);
  let finalDate = new Date(resDate.getTime() - 1000 * 3600 * 5.5);
  return finalDate;
}

const makeDate2 = (dt)=> {
  let resDate = new Date(dt);
  let finalDate = new Date(resDate.getTime() + 1000 * 3600 * 5.5);
  return finalDate;
}

const ImportantDatesForm = ({ type, formData }) => {
  const [title, setTitle] = useState(
    formData && formData.title ? formData.title : ""
  );

  const [date, setDate] = useState(
    formData && formData.date ? makeDate(formData.date) : new Date()
  );

  const link_id = formData && formData.id;
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (type === "Add")
      dispatch(addImportantDate({ title, date: makeDate2(date).toISOString() })).then(() => {
        navigate("../importantdates", { replace: true });
      });
    else
      dispatch(
        editImportantDate(link_id, {
          title,
          date: makeDate2(date).toISOString() ,
        })
      ).then(() => {
        navigate("../importantdates", { replace: true });
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
                  className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded disabled:text-gray-500 disabled:cursor-not-allowed"
                  id="title"
                  name="title"
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  required
                  disabled={title==="Nomination Deadline" || title==="Basic Info Deadline"}
                />
              </div>
              <div className="mt-2">
                <label className="block text-sm text-gray-600" htmlFor="date">
                  Date
                </label>
                <DateTimePicker 
                  className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" 
                  onChange={(e)=>{
                    console.log("Date: ",makeDate2(e).toISOString());
                    setDate(e);
                  }} 
                  value={date}
                />
                {/* <input
                  className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                  id="date"
                  name="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                /> */}
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

export default ImportantDatesForm;