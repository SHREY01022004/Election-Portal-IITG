import styles from "./RegisterSuccess.module.css";
import Icon from "./icon.svg";
import { useSelector, useDispatch } from "react-redux";
import DEPT from "../../../constants/depts";
import getUserImg from "../../../actions/getUserImg";
import { useEffect, useState } from "react";
import DefaultIMG from "./default.svg";

const RegisterSuccess = (props) => {
  const userData = useSelector((store) => store.auth);
  const userImg = useSelector((store) => store.getUserImg);
  const dispatch = useDispatch();
  useEffect(() => {
    let data = { email: userData?.euser?.email };
    dispatch(getUserImg(data));
  }, [dispatch, userData]);
  // console.log("userData", userData);
  console.log("userImg", userImg);
  let hid = "";
  if (userData == null || userData?.euser?.registration_complete == false) {
    hid = "hidden";
  }
  let roll_no = "";
  for (let i = 0; i < userData?.euser?.roll_number?.length; i++) {
    if (i % 3 == 0) {
      roll_no += " ";
    }
    roll_no += userData?.euser?.roll_number[i];
  }
  let voter_type = "PG";
  if (props.degree === "B" || props.degree === "Bdes") {
    voter_type = "UG";
  }
  return (
    <>
      <h1 className="font-normal text-2xl pt-8 pb-4 text-gray-800">Voter ID</h1>
      <div className={`${styles.cont} p-2 md:p-4`}>
        <div className={`grid ${styles.grid} gap-2 md:gap-5`}>
          {/* <img src={Icon} className={`${styles.img} max-w-fit`}/> */}
          <img
            src={userImg?.img_url}
            className={`${styles.img} max-w-fit h-full object-cover rounded-lg row-span-3`}
            alt={"Image"}
            onError={(th) => {
              th.target.src = DefaultIMG;
            }}
          />
          <div className={`flex flex-col`}>
            <div className={`${styles.small}`}>Name</div>
            <div className={`${styles.text}`}>{userData?.euser?.name}</div>
          </div>
          <div className={`flex flex-col`}>
            <div className={`${styles.small}`}>Roll No</div>
            <div className={`${styles.text}`}>{roll_no}</div>
          </div>

          <div className={`flex flex-col`}>
            <div className={`${styles.small}`}>Voter Type</div>
            <div className={`${styles.text}`}>{userImg?.voter_type}</div>
          </div>
          <div className={`flex flex-col`}>
            <div className={`${styles.small}`}>Hostel</div>
            <div className={`${styles.text}`}>{userData?.euser?.hostel}</div>
          </div>
          <div className={`flex flex-col`}>
            <div className={`${styles.small}`}>Branch</div>
            <div className={`${styles.text}`}>
              {DEPT[userData?.euser?.branch]}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterSuccess;
