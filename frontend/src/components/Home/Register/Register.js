import React from "react";
import styles from "./Register.module.css";
import RegisterSVG from "./RegisterSVG";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useNominate from "../../../hooks/useNominate";

const Register = () => {
  let navigate = useNavigate();
  const userData = useSelector((store) => store.auth);
  const {isDeadlineOver} = useNominate();

  const handleRouteChange = () => {
    let path = "";
    if (!userData) {
      path = "/login";
    } else if (!userData?.euser?.registration_complete) {
      path = "/register";
    } else if (userData && userData.candidates.length) {
      path = "/nominate/about";
    } else path = `/nominate/post`;
    navigate(path);
  };
 console.log(userData?.candidates[0]);
  const renderContent = () => {
    if (!userData) {
      return (
        <span>
          <p className="text-lg mb-4">
            Voting statistics are live!!
          </p>
          <button
            className={`${styles.regBtn} mr-4`}
            onClick={()=>navigate('/nominations/vicepresident')}
          >
            View Candidates
          </button>
        </span>
        // <span>
        //   {/* <p className="text-lg mb-4">Register to nominate yourself for the elections.</p> */}
        //   <p className="text-lg mb-4">Register to cast your vote in  the elections.</p>
        //   <button
        //     className={`${styles.regBtn} mr-4`}
        //     onClick={handleRouteChange}
        //   >
        //     Register
        //   </button>
        //   {/* <button
        //       className={`${styles.nomBtn} hover:bg-gray-300 bg-coolGray-50 text-[14px] font-medium py-2 px-6 rounded border-2`}
        //       onClick={handleRouteChange}
        //     >
        //       Nominate
        //     </button> */}
        // </span>
      );
    } else if (!userData?.euser?.registration_complete) {
      return (
        <span>
          <p className="text-lg mb-4">Register to cast your vote in the elections.</p>
          <button
            className={`${styles.regBtn} mr-4`}
            onClick={handleRouteChange}
          >
            Register
          </button>
          {/* <button
              className={`${styles.nomBtn} hover:bg-gray-300 bg-coolGray-50 text-[14px] font-medium py-2 px-6 rounded border-2`}
              onClick={handleRouteChange}
            >
              Nominate
            </button> */}
        </span>
      );
    } else if (userData?.candidates.length === 0) {
      // if(isDeadlineOver){
      //   return (
      //     <span>
      //     <p className="text-xl mb-4">Deadline for nominations are over!!</p>
      //   </span>
      //   )
      // }
      return (
        <span>
          <p className="text-lg mb-4">
            Voting statistics are live!!
          </p>
          <button
            className={`${styles.regBtn} mr-4`}
            onClick={()=>navigate('/nominations/vicepresident')}
          >
            View Candidates
          </button>
        </span>
        // <span>
        //   <p className="text-xl mb-4">Proceed to apply for nominations.</p>
        //   <button
        //       className={`${styles.regBtn}`}
        //       onClick={handleRouteChange}
        //     >
        //       Nominate
        //     </button>
        // </span>
      );
    } else {
      return (
        <>
        {/* <span>
  {userData.candidates[0].nomination_complete ? 
    'Nomination process is complete.' : 
    'Complete your nomination process'
  }
</span> */}

          <div className={styles.btns}>
            <button
              className={`${styles.nomBtn} hover:bg-[#1d1dff] bg-[#2b00ff] text-[14px] text-white font-medium py-2 px-6 rounded border-2`}
              onClick={handleRouteChange}
            >
              My Profile
            </button>
          </div>
        </>
      );
    }
  };

  return (
    <div className={`w-full md:w-4/6 px-2 md:p-0`}>
      <div className={styles.regCont}>
        <div className={styles.reg}>
          {renderContent()}
          {/* <span>
            <p className="text-lg mb-4">SGC Elections 2024 has been successfully completed.</p>
            <button
              className={`${styles.regBtn} mr-4`}
              onClick={() => navigate('/nominations/vicepresident')}
            >
              View Past Candidates
            </button>
          </span> */}
        </div>
        <div>
          <RegisterSVG />
        </div>
      </div>
    </div>
  );
};

export default Register;
