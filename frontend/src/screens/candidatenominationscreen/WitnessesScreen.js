import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RegisterForm from "../Register/RegisterForm";
import WitnessDataForm from "../Register/WitnessDataForm";
import styles from "../Register/RegisterScreen.module.css";
import { useNavigate } from "react-router-dom";
import { SET_CANDIDATE_DATA } from "../../constants";
import useNominate from "../../hooks/useNominate";
import SaveAndNext from "./SaveAndNext";
import * as yup from "yup";

export const witnessSchema = yup.object().shape({
  name: yup
    .string()
    .required("Please enter the name")
    .min(3, "Please enter a valid name"),
  email: yup.string().email().required("Please enter a valid iitg email"),
  degree: yup.string().required(),
  branch: yup.string().required(),
  hostel: yup.string().required(),
  roll_number: yup
    .string()
    .required()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(9, "Roll number should have atleast 9 digits")
    .max(12, "Roll number shouldn't be more than 12 digits")
    .typeError("Please enter digits only"),
  cpi: yup.string().required("Cpi is required"),
  semester: yup.string().required("Semester is required"),
  room_no: yup.string().required("Room no is required"),
  contact_no: yup
    .string()
    .required("Please enter your phone number")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(6, "Phone no should have atleast 6 digits"),
});
// const deadline = 1649734200000;
// // const deadline = 1649549824000;
// const checkDeadline = () => {
//   return new Date(Date.now()).getTime() >= deadline;
// };

const WitnessesScreen = () => {
  let {
    candidate,
    error,
    message,
    updateNomination,
    loading,
    setError,
    setMessage,
    isDeadlineOver,
  } = useNominate();

  const [proposedByData, setProposedyData] = useState(null);
  const [secondedByData, setSecondedByData] = useState(null);
  const [pvalidationErrors, setPValidationErrors] = useState(null);
  const [svalidationErrors, setSValidationErrors] = useState(null);

  const [signs, setSigns] = useState({});

  const submitData = async () => {
    setSValidationErrors(null);
    setPValidationErrors(null);
    setMessage(null);

    if (secondedByData) {
      try {
        const res = await witnessSchema.validate(secondedByData, {
          abortEarly: false,
        });
      } catch (err) {
        if (err.inner) {
          setSValidationErrors((prev) => {
            const newError = {};
            err.inner.forEach((e) => (newError[e.params.path] = e.errors[0]));
            return newError;
          });
        }
      }
    }
    if (proposedByData) {
      try {
        await witnessSchema.validate(proposedByData, { abortEarly: false });
      } catch (err) {
        if (err.inner) {
          setPValidationErrors((prev) => {
            const newError = {};
            err.inner.forEach((e) => (newError[e.params.path] = e.errors[0]));
            return newError;
          });
        }
      }
    }
    const data = {
      proposed_by: proposedByData || candidate.proposed_by,
      seconded_by: secondedByData || candidate.seconded_by,
    };
    if (data.proposed_by.name == "" || data.seconded_by.name == "") {
      setMessage("Please fill both witness details");
    }
    updateNomination(data, "/nominate/verification");
  };

  const onChange = (e) => {
    setSigns((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }));
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="p-6">
          <div className="font-semibold text-m text-gray-800">
            Proposed by :
          </div>
          <br />
          <WitnessDataForm
            data={
              proposedByData ||
              (candidate?.proposed_by ? candidate.proposed_by : {})
            }
            setData={setProposedyData}
            validationErrors={pvalidationErrors}
            isFormClosed={isDeadlineOver}
          />
          <br />
          {/* <div className="font-semibold text-s text-gray-800">Signature :</div> */}
          {/* <input
            accept="image/*"
            type="file"
            id="select-image"
            name="proposed_by_sign"
            onChange={onChange}
          /> */}
        </div>

        <div className="p-6">
          <div className="font-semibold text-m text-gray-800">
            Seconded by :
          </div>
          <br />
          <WitnessDataForm
            isFormClosed={isDeadlineOver}
            data={
              secondedByData ||
              (candidate?.proposed_by ? candidate.seconded_by : {})
            }
            setData={setSecondedByData}
            validationErrors={svalidationErrors}
          />
          <br />
          {/* <div className="font-semibold text-s text-gray-800">Signature :</div>
          <input
            accept="image/*"
            type="file"
            id="select-image"
            name="seconded_by_sign"
            onChange={onChange}
          /> */}
        </div>
      </div>
      <div className="sm:pl-6 mb-4">
        {!isDeadlineOver && (
          <SaveAndNext
            error={error}
            message={message}
            loading={loading}
            submit={submitData}
          />
        )}

        <>
          {isDeadlineOver && (
            <p className="text-red-500 font-medium uppercase">
              Nomination Deadline is over.
            </p>
          )}
        </>
      </div>
    </div>
  );
};
export default WitnessesScreen;
