import React from "react";
import checkCircle from "./checkCircle.png";
import submit from "../../../assets/Submit.png";
import agenda from "../../../assets/Agenda.png";
import record from "../../../assets/Record.png";
import register from "../../../assets/Register.png";
import useNominate from "../../../hooks/useNominate";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Step = ({ text, imgSrc, done, link }) => (
  <Link to={`/nominate/${link}`}>
    <div className="flex justify-center items-center mb-2 mr-4 p-2 md:p-4 flex-shrink-0 w-40 h-36 md:w-48 md:h-40">
      <div className="rounded-md flex flex-col justify-center items-center cursor-pointer hover:scale-110 ease-in-out duration-300">
        <div className="text-center mb-2">
          <img src={imgSrc} alt="icon" />
        </div>
        <p className="text-center text-sm font-medium">{text}</p>
      </div>
    </div>
  </Link>
);




const StepCompleted = ({ text, imgSrc, done, link }) => (
  <div className="flex justify-center items-center mb-2 mr-4 p-2 md:p-4 bg-blue-100 rounded-lg flex-shrink-0 w-32 h-28 md:w-48 md:h-40">
    <div className="rounded-md flex flex-col justify-center items-center cursor-pointer hover:scale-110 ease-in-out duration-300 ">
      <div className="text-center mb-2">
        <img src={checkCircle} alt="icon" />
      </div>
      <p className="text-center text-sm font-medium text-indigo-600">
        {text}
      </p>
    </div>
  </div>
);

const NominateBtn = ({ userData }) => {
  const navigate = useNavigate();

  return (
    <div className="flex mt-2">
      <button
        class="bg-[#2B00FF] hover:bg-[#2B00AA] text-[14px] font-family-roboto text-white font-medium py-2 px-4 rounded mr-3 sm:mr-4"
        onClick={() => {
          let path = "";
          if (!userData) {
            path = "/login";
          } else if (!userData?.euser?.registration_complete) {
            path = "/register";
          } else if (userData && userData.candidates.length) {
            path = "/nominate/about";
          } else path = `/nominate/post`;
          navigate(path);
        }}
      >
        {userData && !userData?.euser.registration_complete ? "Complete registration" : userData?.candidates.length !== 0
          ? "View Nomination"
          : "Apply Now"}
      </button>
      {/* <button class=" hover:bg-gray-300 bg-coolGray-50 text-[14px] font-medium py-2 px-6 rounded border-2">
            Learn More
          </button> */}
    </div>
  );
}
const StepContent = ({ userData, steps, isDeadlineOver }) => {
  if(isDeadlineOver){
    return (
      <p className="p-6 mx-6 shadow rounded md:w-1/2 md:text-xl font-base">Deadline for nominations are over!! </p>
    )
  } else if (!userData) {
    return (
      <p className="p-6 mx-6 shadow rounded md:w-1/2 md:text-xl font-base">Login to apply for nominations !! </p>
    )
  }
  else if (!userData?.euser?.registration_complete) {
    return (
      <div className="p-6 w-1/2 md:w-1/2 mx-6 shadow rounded">
        <p className="mb-3  md:text-xl font-base">Complete your voter registrations before nominations !! </p>
        <NominateBtn userData={userData} />
      </div>
    )
  }
  else if (userData?.candidates.length == 0) {
    return (
      <div className="p-6 w-1/2 md:w-1/2 mx-6 shadow rounded"><p className="mb-3  md:text-xl font-base">Proceed to apply for nominations</p><NominateBtn userData={userData} /></div>
    )
  }
  else {
    return (
    <>
      <h1 className="p-3 pt-0 font-medium text-xl">
        Steps For Nominating Yourself
      </h1>
      <div
        className="rounded-md py-6 px-8 m-3 overflow-hidden w-11/12 md:w-max"
        style={{
          boxShadow:
            "0px 0px 2px rgb(0 0 0 / 20%), 0px 2px 10px rgb(0 0 0 / 10%)",
        }}
      >
        <div className="overflow-x-auto flex justify-start items-center">
          {steps.map(({ text, imgSrc, done, link }, index) => {
            if (userData !== null && done) {
              return (
                <StepCompleted
                  key={index}
                  text={text}
                  imgSrc={imgSrc}
                  done={done}
                  link={link}
                />
              );
            } else {
              return (
                <Step
                  key={index}
                  text={text}
                  imgSrc={imgSrc}
                  done={done}
                  link={link}
                />
              );
            }
          })}
        </div>
        <NominateBtn userData={userData} steps={steps}/>
      </div>
    </>
    )
  }

};
const StepList = () => {
  const { candidate, error, message, updateNomination, isComplete, isDeadlineOver } =
    useNominate();
  const userData = useSelector((store) => store.auth);
  const steps = [
    {
      text: "Register for the post",
      imgSrc: register,
      done: !!candidate.id,
      link: "",
    },
    {
      text: "Write your agendas",
      imgSrc: agenda,
      done:
        candidate &&
        candidate.agenda_text &&
        Object.keys(candidate.agenda_text).length >= 3,
      link: "agendas",
    },
    {
      text: "Record your introduction video",
      imgSrc: record,
      done: !!candidate.video,
      link: "video",
    },
    {
      text: "Verification Complete",
      imgSrc: submit,
      done: candidate.nomination_status === "approved",
      link: "verification",
    },
  ];
  return (
    <StepContent userData={userData} steps={steps} isDeadlineOver={isDeadlineOver}/>
  );
};

export default StepList;
