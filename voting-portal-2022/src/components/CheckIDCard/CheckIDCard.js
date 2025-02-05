import styles from "./CheckIDCard.module.css";
import { useSelector, useDispatch } from "react-redux";
import DEPT from "../../constants/depts";
import getUserImg from "../../redux/actions/getUserImg";
import { useEffect } from "react";
import DefaultIMG from "./default.svg";

const CheckIDCard = (props) => {
  const userImg = useSelector((store) => store.getUserImg);
  const dispatch = useDispatch();
  useEffect(() => {
    let data = { email: props.email };
    dispatch(getUserImg(data));
  }, [dispatch]);
  let roll_no = "";
  for (let i = 0; i < props?.roll_number?.length; i++) {
    if (i % 3 == 0) {
      roll_no += " ";
    }
    roll_no += props.roll_number[i];
  }
  let voter_type = "PG";
  if (props.degree === "B" || props.degree === "Bdes") {
    voter_type = "UG";
  }
  // console.log("Here",userImg.img_url);
  return (
    <div className={`${styles.cont} p-4`}>
      <div className={`grid ${styles.grid} gap-5`}>
        <img
          src={userImg?.img_url}
          className={`${styles.img} row-span-3`}
          alt={"Image"}
          onError={(th) => {
            th.target.src = DefaultIMG;
            document.getElementById("idCardError").style.display = "block";
          }}
        />
        <div className={`flex flex-col`}>
          <div className={`${styles.small}`}>Name</div>
          <div className={`${styles.text}`}>{props.name}</div>
        </div>
        <div className={`flex flex-col`}>
          <div className={`${styles.small}`}>Roll No</div>
          <div className={`${styles.text}`}>{roll_no}</div>
        </div>

        <div className={`flex flex-col`}>
          <div className={`${styles.small}`}>Voter Type</div>
          <div className={`${styles.text}`}>{voter_type} {userImg?.gender==="Male" ? "(M)" : "(F)"}</div>
        </div>
        <div className={`flex flex-col`}>
          <div className={`${styles.small}`}>Hostel</div>
          <div className={`${styles.text}`}>{props.hostel}</div>
        </div>
        <div className={`flex flex-col`}>
          <div className={`${styles.small}`}>Branch</div>
          <div className={`${styles.text}`}>{DEPT[props.branch]}</div>
        </div>
      </div>
    </div>
  );
};

export default CheckIDCard;
