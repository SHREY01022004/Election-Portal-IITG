import React, { useEffect, useState } from "react";
import RegisterForm from "../Register/RegisterForm";
import PicIntroUpload from "../../components/Nominate/PicIntroUpload/PicIntroUpload";
import styles from "../Register/RegisterScreen.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import {
  API,
  fetchUserData,
  updateCandidateData,
  userRegistration,
} from "../../api";
import { getUser } from "../../actions/auth";
import { SET_CANDIDATE_DATA } from "../../constants";
import WitnessDataForm from "../Register/WitnessDataForm";
import useNominate from "../../hooks/useNominate";
import SaveAndNext from "./SaveAndNext";
import * as yup from "yup";
import { validateYupSchema } from "formik";
import CandidateRegistrationData from "../Register/CandidateRegistrationData";
import { set } from "react-hook-form";

// const deadline = 1649734200000;
// // const deadline = 1649549824000;
// const checkDeadline = () => {
//   return new Date(Date.now()).getTime() <= deadline;
// };

export const candidateSchema = yup.object().shape({
  cpi: yup.string().required("Cpi is required"),
  backlogs: yup.string().required("Please enter NA if None"),
  active_backlogs: yup.string().required("Please enter NA if None"),
  contact_no: yup
    .string()
    .required("Please enter your phone number")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(6, "Phone no should have atleast 6 digits"),
  semester: yup.string().required("Semester is required"),
  room_no: yup.string().required("Room no is required"),
  about: yup.string().required("Please add your intro"),
  image: yup.string().required("Please add your profile pic"),
  tagline: yup.string().required("Please enter your tagline"),
});

export const aboutSchema = yup.object().shape({
  name: yup
    .string()
    .required("Please enter your name")
    .min(3, "Please enter a valid name"),
  degree: yup.string().required().min(1, "Please select your degree"),
  branch: yup.string().required().min(1, "Please select your branch"),
  hostel: yup.string().required().min(1, "Please select your hostel"),
  roll_number: yup
    .string()
    .required()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(9, "Roll number should have atleast 9 digits")
    .max(12, "Roll number shouldn't be more than 12 digits")
    .typeError("Please enter digits only"),
});
const convertoUrl = (image) => {
  if (!image) return null;
  if (
    (typeof image === "string" || image instanceof String) &&
    image.startsWith("http")
  ) {
    return image;
  }
  return URL.createObjectURL(image);
};
const AboutScreen = () => {
  const {
    candidate,
    error,
    setError,
    loading,
    setLoading,
    setMessage,
    message,
    updateNomination,
    isDeadlineOver,
  } = useNominate();

  const userData = useSelector((store) => store.auth);
  const [profileData, setProfileData] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [uploadImage, setUploadImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [candidateData, setCandidateData] = useState(null);
  const [candidateDataErrors, setcandidateDataErrors] = useState(null);
  const [validationErrors, setValidationErrors] = useState(null);
  const onChange = (e) => {
    setMessage(null);
    setCandidateData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // const importantDates = useSelector((store) => store.importantDates);
  // // console.log(importantDates)
  // const nominationDeadline = importantDates[0];

  // const deadline = nominationDeadline?.date;

  // const checkDeadline = () => {
  //   console.log("deadline",deadline)
  //   console.log("date now",new Date())
  //   console.log(new Date()>= new Date(deadline))
  //   return new Date()>= deadline;
  // };

  useEffect(() => {
    if (uploadImage) {
      setMessage(null);
      setCandidateData((prev) => ({
        ...prev,
        image: "Image uploaded",
      }));
    }
    if (uploadImage) {
      setImageURL(URL.createObjectURL(uploadImage));
    } else {
      setImageURL(null);
    }
  }, [uploadImage]);

  const saveUserData = async () => {
    try {
      const res = await userRegistration(profileData);
      dispatch(getUser());
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Something went wrong!Please again or refresh the browser"
      );
      return;
    }
  };

  useEffect(() => {
    if (userData && candidate) {
      if (isDeadlineOver) {
        if (
          candidate.semester &&
          candidate.semester != "" &&
          candidate.cpi &&
          candidate.cpi != "" &&
          candidate.backlogs &&
          candidate.backlogs != "" &&
          candidate.active_backlogs &&
          candidate.active_backlogs != "" &&
          candidate.contact_no &&
          candidate.contact_no != "" &&
          userData.euser.roll_number &&
          userData.euser.roll_number !== "" &&
          userData.euser.degree &&
          userData.euser.degree !== ""
        ) {
          setMessage(
            "Your profile data has been saved and considered for nominations!Please complete rest of form if not completed to be eligible for nominations"
          );
          return;
        }
        setMessage(
          "Your basic profile data is incomplete.Please contact EC next steps"
        );
        return;
      }
    }
  }, [userData, candidate]);

  const submitData = async () => {
    setError(null);
    setValidationErrors(null);
    setcandidateDataErrors(null);
    setMessage(null);
    if (isDeadlineOver) {
      setError("Basic profile information update deadline is now over");
      return;
    }

    if (profileData) {
      try {
        await aboutSchema.validate(profileData, { abortEarly: false });
      } catch (err) {
        saveUserData();
        if (err.inner) {
          setValidationErrors((prev) => {
            const newError = {};
            err.inner.forEach((e) => (newError[e.params.path] = e.errors[0]));
            return newError;
          });
        }
        return;
      }
      saveUserData();
    }
    let cData = {
      about: candidate.about || "",
      image: candidate.image || "",
      cpi: candidate.cpi || "",
      room_no: candidate.room_no || "",
      semester: candidate.semester || "",
      contact_no: candidate.contact_no || "",
      backlogs: candidate.backlogs || "",
      active_backlogs: candidate.active_backlogs || "",
      tagline: candidate.tagline || "",
    };
    // console.log(cData, candidateData);
    const uploadData = {
      ...cData,
      ...candidateData,
    };
    try {
      await candidateSchema.validate(uploadData, {
        abortEarly: false,
      });
    } catch (err) {
      if (err.inner) {
        setcandidateDataErrors((prev) => {
          const newError = {};
          err.inner.forEach((e) => (newError[e.params.path] = e.errors[0]));
          return newError;
        });
      }
    }
    const data = candidateData;
    // console.log(uploadImage, data);
    if (data && uploadImage) {
      data["image"] = uploadImage;
    }
    await updateNomination(data);
    setCandidateData(null);
    if (uploadImage) {
      setUploadImage(null);
      setImageURL(null);
    }
  };

  return (
    <>
      <div className="flex flex-col	md:flex-row ">
        <div className=" mx-4 md:mx-0 md:w-4/12">
          <CandidateRegistrationData
            data={profileData || userData?.euser}
            setData={setProfileData}
            validationErrors={validationErrors}
            isFormClosed={isDeadlineOver}
          />
          <label for="room_no" className="font-semibold text-sm text-gray-800">
            Room_no:{" "}
          </label>
          <br />
          <input
            required
            type="text"
            id="room_no"
            name="room_no"
            className={`${styles.input} md:w-11/12 w-full mb-1`}
            defaultValue={candidate?.room_no}
            onChange={onChange}
            disabled={isDeadlineOver}
          />
          {candidateDataErrors?.room_no ? (
            <p className="text-red-400 text-sm">
              {candidateDataErrors.room_no}
            </p>
          ) : (
            <br />
          )}
          <label for="cpi" className="font-semibold text-sm text-gray-800">
            Cpi:{" "}
          </label>
          <br />
          <input
            required
            type="text"
            id="cpi"
            name="cpi"
            className={`${styles.input} md:w-11/12 w-full mb-1`}
            defaultValue={candidate?.cpi}
            onChange={onChange}
            disabled={isDeadlineOver}
          />
          {candidateDataErrors?.cpi ? (
            <p className="text-red-400 text-sm">{candidateDataErrors.cpi}</p>
          ) : (
            <br />
          )}
          <label for="semester" className="font-semibold text-sm text-gray-800">
            Semester:{" "}
          </label>
          <br />
          <input
            required
            type="text"
            id="semester"
            name="semester"
            className={`${styles.input} md:w-11/12 w-full mb-1`}
            defaultValue={candidate?.semester}
            onChange={onChange}
            disabled={isDeadlineOver}
          />
          {candidateDataErrors?.semester ? (
            <p className="text-red-400 text-sm">
              {candidateDataErrors.semester}
            </p>
          ) : (
            <br />
          )}
          <label for="backlogs" className="font-semibold text-sm text-gray-800">
            Backlogs:{" "}
          </label>
          <br />
          <input
            required
            disabled={isDeadlineOver}
            type="text"
            id="backlogs"
            name="backlogs"
            className={`${styles.input} md:w-11/12 w-full mb-1`}
            defaultValue={candidate?.backlogs}
            onChange={onChange}
          />
          {candidateDataErrors?.backlogs ? (
            <p className="text-red-400 text-sm">
              {candidateDataErrors.backlogs}
            </p>
          ) : (
            <br />
          )}
          <label for="backlogs" className="font-semibold text-sm text-gray-800">
            Active Backlogs:{" "}
          </label>
          <br />
          <input
            required
            disabled={isDeadlineOver}
            type="text"
            id="active_backlogs"
            name="active_backlogs"
            className={`${styles.input} md:w-11/12 w-full mb-1`}
            defaultValue={candidate?.active_backlogs}
            onChange={onChange}
          />
          {candidateDataErrors?.active_backlogs ? (
            <p className="text-red-400 text-sm">
              {candidateDataErrors.active_backlogs}
            </p>
          ) : (
            <br />
          )}
          <label
            for="contact_no"
            className="font-semibold text-sm text-gray-800"
          >
            Contact No:{" "}
          </label>
          <br />
          <input
            required
            type="text"
            disabled={isDeadlineOver}
            id="contact_no"
            name="contact_no"
            className={`${styles.input} md:w-11/12 w-full mb-1`}
            defaultValue={candidate?.contact_no}
            onChange={onChange}
          />
          {candidateDataErrors?.contact_no ? (
            <p className="text-red-400 text-sm">
              {candidateDataErrors.contact_no}
            </p>
          ) : (
            <br />
          )}
        </div>
        <div className="w-full">
          <PicIntroUpload
            isFormClosed={isDeadlineOver}
            imageURL={imageURL || convertoUrl(candidate?.image)}
            uploadImage={uploadImage}
            setUploadImage={setUploadImage}
            setImageURL={setImageURL}
            intro={candidateData?.about || candidate?.about}
            tagline={candidateData?.tagline || candidate?.tagline}
            validationErrors={candidateDataErrors}
            onIntroChange={onChange}
          />
        </div>
      </div>
      <div class="">
        {!isDeadlineOver && (
          <SaveAndNext
            error={error}
            message={message}
            loading={loading}
            submit={submitData}
          />
        )}
        {/* {isNominationComplete ? (
          <p className="text-blue-500">Your Nomination is complete</p>
        ) : ( */}
        {/* )} */}
      </div>
      <>
        {isDeadlineOver && (
          <p className="text-red-500 font-medium uppercase mt-4">
            Nomination Deadline is over.
          </p>
        )}
      </>
    </>
  );
};
export default AboutScreen;
