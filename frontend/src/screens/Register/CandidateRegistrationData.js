import React, { useState } from "react";
import styles from "./RegisterScreen.module.css";
import { userRegistration } from "../../api/index";
import { useNavigate } from "react-router-dom";

const CandidateRegistrationData = ({
  data,
  setData,
  validationErrors,
  isFormClosed,
}) => {
  const onChange = (e) => {
    setData((prev) => ({
      ...data,
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  console.log(data);

  return (
    <div>
      <form>
        <label for="name" className="font-semibold text-sm text-gray-800">
          Name:{" "}
        </label>
        <br />
        <input
          required
          type="text"
          id="name"
          name="name"
          className={`${styles.input} md:w-11/12 w-full mb-1`}
          defaultValue={data?.name}
          onChange={onChange}
          disabled={isFormClosed}
        />
        {validationErrors?.name ? (
          <p className="text-red-400 text-sm">{validationErrors.name}</p>
        ) : (
          <br />
        )}
        <label for="rollno" className="font-semibold text-sm text-gray-800">
          Roll No.:{" "}
        </label>
        <br />
        <input
          required
          type="text"
          id="rollno"
          name="roll_number"
          className={`${styles.input} md:w-11/12 w-full  mb-1`}
          defaultValue={data?.roll_number != "" ? data?.roll_number : null}
          onChange={onChange}
          maxLength={9}
          disabled={isFormClosed}
        />
        {validationErrors?.roll_number ? (
          <p className="text-red-400 text-sm">{validationErrors.roll_number}</p>
        ) : (
          <br />
        )}
        <label for="degree" className="font-semibold text-sm text-gray-800">
          Degree:{" "}
        </label>{" "}
        <br />
        <select
          required
          id="degree"
          name="degree"
          className={`${styles.input} md:w-11/12 w-full  mb-1`}
          defaultValue={data?.degree != "" ? data?.degree : null}
          onChange={onChange}
          disabled={isFormClosed}
        >
          <option value="" selected={data?.degree == ""}>
            Select{" "}
          </option>
          <option value="B" selected={data?.degree == "B"}>
            B.Tech
          </option>
          <option value="M" selected={data?.degree == "M"}>
            M.Tech
          </option>
          <option value="P" selected={data?.degree == "P"}>
            PhD
          </option>
          <option value="Msc" selected={data?.degree == "Msc"}>
            MSc
          </option>
          <option value="Bdes" selected={data?.degree == "Bdes"}>
            Bdes
          </option>
          <option value="Mdes" selected={data?.degree == "Mdes"}>
            Mdes
          </option>
          <option value="Dual" selected={data?.degree == "Dual"}>
            Dual Degree
          </option>
          <option value="MA" selected={data?.degree == "MA"}>
            MA
          </option>
          <option value="MSR" selected={data?.degree == "MSR"}>
            MSR
          </option>
        </select>
        {validationErrors?.degree ? (
          <p className="text-red-400 text-sm">{validationErrors.degree}</p>
        ) : (
          <br />
        )}
        <label for="branch" className="font-semibold text-sm text-gray-800">
          Branch:{" "}
        </label>{" "}
        <br />
        <select
          required
          id="branch"
          name="branch"
          defaultValue={data?.branch != "" ? data?.branch : null}
          onChange={onChange}
          className={`${styles.input} md:w-11/12 w-full  mb-1`}
          disabled={isFormClosed}
        >
          <option value="" selected={data?.branch == ""}>
            Select
          </option>
          <option value="01" selected={data?.branch == "01"}>
            CSE
          </option>
          <option value="02" selected={data?.branch == "02"}>
            ECE
          </option>
          <option value="03" selected={data?.branch == "03"}>
            ME
          </option>
          <option value="04" selected={data?.branch == "04"}>
            Civil
          </option>
          <option value="05" selected={data?.branch == "05"}>
            Design
          </option>
          <option value="06" selected={data?.branch == "06"}>
            BSBE
          </option>
          <option value="07" selected={data?.branch == "07"}>
            CL
          </option>
          <option value="08" selected={data?.branch == "08"}>
            EEE
          </option>
          <option value="21" selected={data?.branch == "21"}>
            Physics
          </option>
          <option value="22" selected={data?.branch == "22"}>
            Chemistry
          </option>
          <option value="23" selected={data?.branch == "23"}>
            MNC
          </option>
          <option value="41" selected={data?.branch == "41"}>
            HSS
          </option>
          <option value="50" selected={data?.branch == "50"}>
            DSAI
          </option>
          <option value="51" selected={data?.branch == "51"}>
            Energy
          </option>
          <option value="52" selected={data?.branch == "52"}>
            Environment
          </option>
          <option value="53" selected={data?.branch == "53"}>
            Nano-Tech
          </option>
          <option value="54" selected={data?.branch == "54"}>
            Rural-Tech
          </option>
          <option value="55" selected={data?.branch == "55"}>
            Linguistics
          </option>
          <option value="61" selected={data?.branch == "61"}>
            Others
          </option>
        </select>
        {validationErrors?.branch ? (
          <p className="text-red-400 text-sm">{validationErrors.branch}</p>
        ) : (
          <br />
        )}
        <label for="hostel" className="font-semibold text-sm text-gray-800">
          Hostel:
        </label>
        <br />
        <select
          required
          id="hostel"
          name="hostel"
          defaultValue={data?.hostel != "" ? data?.hostel : null}
          onChange={onChange}
          className={`${styles.input} md:w-11/12 w-full  mb-1`}
          disabled={isFormClosed}
        >
          <option value="" selected={data?.hostel == ""}>
            Select{" "}
          </option>
          <option value="lohit" selected={data?.hostel == "lohit"}>
            Lohit
          </option>
          <option value="dhansiri" selected={data?.hostel == "dhansiri"}>
            Dhansiri
          </option>
          <option value="dihing" selected={data?.hostel == "dihing"}>
            Dihing
          </option>
          <option value="gaurang" selected={data?.hostel == "gaurang"}>
            Gaurang
          </option>
          <option value="disang" selected={data?.hostel == "disang"}>
            Disang
          </option>
          <option value="dibang" selected={data?.hostel == "dibang"}>
            Dibang
          </option>
          <option value="manas" selected={data?.hostel == "manas"}>
            Manas
          </option>
          <option value="umiam" selected={data?.hostel == "umiam"}>
            Umiam
          </option>
          <option value="kapili" selected={data?.hostel == "kapili"}>
            Kapili
          </option>
          <option value="subansiri" selected={data?.hostel == "subansiri"}>
            Subansiri
          </option>
          <option value="kameng" selected={data?.hostel == "kameng"}>
            Kameng
          </option>
          <option value="barak" selected={data?.hostel == "barak"}>
            Barak
          </option>
          <option value="msh" selected={data?.hostel == "msh"}>
            Married Scholar Hostel
          </option>
          <option value="brahmaputra" selected={data?.hostel == "brahmaputra"}>
            Brahmaputra
          </option>
          <option value="siang" selected={data?.hostel == "siang"}>
            Siang
          </option>
          <option value="not-alloted" selected={data?.hostel == "not-alloted"}>
            Not Alloted
          </option>
        </select>
        {validationErrors?.hostel ? (
          <p className="text-red-400 text-sm">{validationErrors.hostel}</p>
        ) : (
          <br />
        )}
      </form>
    </div>
  );
};

export default CandidateRegistrationData;
