import React, { useState } from "react";
import styles from "./RegisterScreen.module.css";
import { userRegistration } from "../../api/index";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../actions/auth";
import * as yup from "yup";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.auth);
  const [validationErrors, setValidationErrors] = useState(null);
  let aboutSchema = yup.object().shape({
    name: yup
      .string()
      .required("Please enter the name")
      .min(3, "Please enter a valid name"),
    degree: yup.string().required(),
    branch: yup.string().required(),
    hostel: yup.string().required(),
    gender: yup.string().required(),
    roll_number: yup
      .string()
      .required()
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(9, "Roll number should have atleast 9 digits")
      .max(12, "Roll number shouldn't be more than 12 digits")
      .typeError("Please enter digits only"),
  });
  let navigate = useNavigate();
  // const [name, setName] = useState("");
  // const [rollNo, setRollNo] = useState(0);
  const submitHandler = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const payload = {
      name: data.get("name"),
      roll_number: data.get("roll_number"),
      degree: data.get("degree"),
      branch: data.get("branch"),
      hostel: data.get("hostel"),
      gender: data.get("gender"),
    };

    try {
      await aboutSchema.validate(payload, { abortEarly: false });
    } catch (err) {
      if (err.inner) {
        setValidationErrors((prev) => {
          const newError = {};
          err.inner.forEach((e) => (newError[e.params.path] = e.errors[0]));
          return newError;
        });
      }
      return;
    }
    const regSubmit = async () => {
      try {
        const res = await userRegistration(payload);
        if (res.status === 200) {
          dispatch(getUser());
          navigate("/", { replace: true });
        }
      } catch (error) {
        console.error(error);
      }
    };
    regSubmit();
  };

  return (
    <div>
      <form onSubmit={(e) => submitHandler(e)}>
        <label for="name" className="font-semibold text-s text-gray-800">
          Name:{" "}
        </label>
        <br />
        <input
          required
          type="text"
          id="name"
          name="name"
          defaultValue={userData?.first_name || userData?.euser?.name}
          className={`${styles.input} md:w-11/12 w-full`}
        />
        {validationErrors?.name ? (
          <p className="text-red-400 text-sm">{validationErrors.name}</p>
        ) : (
          <>
            <br />
            <br />
          </>
        )}
        <label for="rollno" className="font-semibold text-s text-gray-800">
          Roll No.:{" "}
        </label>
        <br />
        <input
          required
          type="text"
          id="rollno"
          name="roll_number"
          className={`${styles.input} md:w-11/12 w-full`}
          defaultValue={userData?.euser?.roll_number}
        />
        {validationErrors?.roll_number ? (
          <p className="text-red-400 text-sm">{validationErrors.roll_number}</p>
        ) : (
          <>
            <br />
            <br />
          </>
        )}
        <label for="degree" className="font-semibold text-s text-gray-800">
          Gender:{" "}
        </label>{" "}
        <br />
        <select
          required
          id="gender"
          name="gender"
          className={`${styles.input} md:w-11/12 w-full`}
          defaultValue={userData?.euser?.gender}
        >
          <option value="">Select </option>
          <option value="Male" selected={userData?.euser?.gender == "Male"}>
            Male
          </option>
          <option value="Female" selected={userData?.euser?.gender == "Female"}>
            Female
          </option>
        </select>
        {validationErrors?.gender ? (
          <p className="text-red-400 text-sm">{validationErrors.gender}</p>
        ) : (
          <>
            <br />
            <br />
          </>
        )}
        <label for="degree" className="font-semibold text-s text-gray-800">
          Degree:{" "}
        </label>{" "}
        <br />
        <select
          required
          id="degree"
          name="degree"
          className={`${styles.input} md:w-11/12 w-full`}
          defaultValue={userData?.euser?.degree}
        >
          <option value="">Select </option>
          <option value="B" selected={userData?.euser?.degree == "B"}>
            B.Tech
          </option>
          <option value="M" selected={userData?.euser?.degree == "M"}>
            M.Tech
          </option>
          <option value="P" selected={userData?.euser?.degree == "P"}>
            PhD
          </option>
          <option value="Msc" selected={userData?.euser?.degree == "Msc"}>
            MSc
          </option>
          <option value="Bdes" selected={userData?.euser?.degree == "Bdes"}>
            Bdes
          </option>
          <option value="Mdes" selected={userData?.euser?.degree == "Mdes"}>
            Mdes
          </option>
          <option value="Dual" selected={userData?.euser?.degree == "Dual"}>
            Dual Degree
          </option>
          <option value="MA" selected={userData?.euser?.degree == "MA"}>
            MA
          </option>
          <option value="MSR" selected={userData?.euser?.degree == "MSR"}>
            MSR
          </option>
          <option value="Others" selected={userData?.euser?.degree == "Others"}>
            Others
          </option>
        </select>
        {validationErrors?.degree ? (
          <p className="text-red-400 text-sm">{validationErrors.degree}</p>
        ) : (
          <>
            <br />
            <br />
          </>
        )}
        <label for="branch" className="font-semibold text-s text-gray-800">
          Branch:{" "}
        </label>{" "}
        <br />
        <select
          required
          id="branch"
          name="branch"
          className={`${styles.input} md:w-11/12 w-full`}
          defaultValue={userData?.euser?.branch}
        >
          <option value="">Select </option>
          <option value="01" selected={userData?.euser?.branch == "01"}>
            CSE
          </option>
          <option value="02" selected={userData?.euser?.branch == "02"}>
            ECE
          </option>
          <option value="03" selected={userData?.euser?.branch == "03"}>
            ME
          </option>
          <option value="04" selected={userData?.euser?.branch == "04"}>
            Civil
          </option>
          <option value="05" selected={userData?.euser?.branch == "05"}>
            Design
          </option>
          <option value="06" selected={userData?.euser?.branch == "06"}>
            BSBE
          </option>
          <option value="07" selected={userData?.euser?.branch == "07"}>
            CL
          </option>
          <option value="08" selected={userData?.euser?.branch == "08"}>
            EEE
          </option>
          <option value="21" selected={userData?.euser?.branch == "21"}>
            Physics
          </option>
          <option value="22" selected={userData?.euser?.branch == "22"}>
            Chemistry
          </option>
          <option value="23" selected={userData?.euser?.branch == "23"}>
            MNC
          </option>
          <option value="41" selected={userData?.euser?.branch == "41"}>
            HSS
          </option>
          <option value="50" selected={userData?.euser?.branch == "50"}>
            DSAI
          </option>
          <option value="51" selected={userData?.euser?.branch == "51"}>
            Energy
          </option>
          <option value="52" selected={userData?.euser?.branch == "52"}>
            Environment
          </option>
          <option value="53" selected={userData?.euser?.branch == "53"}>
            Nano-Tech
          </option>
          <option value="54" selected={userData?.euser?.branch == "54"}>
            Rural-Tech
          </option>
          <option value="55" selected={userData?.euser?.branch == "55"}>
            Linguistics
          </option>
          <option value="61" selected={userData?.euser?.branch == "61"}>
            Others
          </option>
        </select>
        {validationErrors?.branch ? (
          <p className="text-red-400 text-sm">{validationErrors.branch}</p>
        ) : (
          <>
            <br />
            <br />
          </>
        )}
        <label for="hostel" className="font-semibold text-s text-gray-800">
          Hostel:
        </label>
        <br />
        <select
          required
          id="hostel"
          name="hostel"
          className={`${styles.input} md:w-11/12 w-full`}
          defaultValue={userData?.euser?.hostel}
        >
          <option value="">Select </option>
          <option value="lohit" selected={userData?.euser?.hostel == "lohit"}>
            Lohit
          </option>
          <option
            value="dhansiri"
            selected={userData?.euser?.hostel == "dhansiri"}
          >
            Dhansiri
          </option>
          <option value="dihing" selected={userData?.euser?.hostel == "dihing"}>
            Dihing
          </option>
          <option value="gaurang" selected={userData?.euser?.hostel == "gaurang"}>
            Gaurang
          </option>
          <option value="disang" selected={userData?.euser?.hostel == "disang"}>
            Disang
          </option>
          <option value="dibang" selected={userData?.euser?.hostel == "dibang"}>
            Dibang
          </option>
          <option value="manas" selected={userData?.euser?.hostel == "manas"}>
            Manas
          </option>
          <option value="umiam" selected={userData?.euser?.hostel == "umiam"}>
            Umiam
          </option>
          <option value="kapili" selected={userData?.euser?.hostel == "kapili"}>
            Kapili
          </option>
          <option
            value="subansiri"
            selected={userData?.euser?.hostel == "subansiri"}
          >
            Subansiri
          </option>
          <option value="kameng" selected={userData?.euser?.hostel == "kameng"}>
            Kameng
          </option>
          <option value="barak" selected={userData?.euser?.hostel == "barak"}>
            Barak
          </option>
          <option value="msh" selected={userData?.euser?.hostel == "msh"}>
            Married Scholar Hostel
          </option>
          <option
            value="brahmaputra"
            selected={userData?.euser?.hostel == "brahmaputra"}
          >
            Brahmaputra
          </option>
          <option value="siang" selected={userData?.euser?.hostel == "siang"}>
            Siang
          </option>
          <option
            value="not-alloted"
            selected={userData?.euser?.hostel == "not-alloted"}
          >
            Not Alloted
          </option>
        </select>
        {validationErrors?.hostel ? (
          <p className="text-red-400 text-sm">{validationErrors.hostel}</p>
        ) : (
          <>
            <br />
            <br />
          </>
        )}
        <button type="submit" className={`${styles.button} mt-3`}>
          Continue
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
