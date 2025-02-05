import React, { useState } from "react";
import styles from "./RegisterScreen.module.css";
import { userRegistration } from "../../api/index";
import { useNavigate } from "react-router-dom";

const WitnessDataForm = ({ data, setData, validationErrors, isFormClosed }) => {
  const onChange = (e) => {
    setData((prev) => ({
      ...data,
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

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
          <p className="text-red-400 text-xs font-medium">
            {validationErrors.name}
          </p>
        ) : (
          <br />
        )}
        <label for="email" className="font-semibold text-sm text-gray-800">
          Email:{" "}
        </label>
        <br />
        <input
          required
          type="text"
          id="email"
          name="email"
          className={`${styles.input} md:w-11/12 w-full mb-1`}
          defaultValue={data?.email}
          onChange={onChange}
          disabled={isFormClosed}
        />
        {validationErrors?.email ? (
          <p className="text-red-400 text-xs font-medium">
            {validationErrors.email}
          </p>
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
          <p className="text-red-400 text-xs font-medium">
            {validationErrors.roll_number}
          </p>
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
          <option value="BTech" selected={data?.degree == "BTech"}>
            B.Tech
          </option>
          <option value="MTech" selected={data?.degree == "MTech"}>
            M.Tech
          </option>
          <option value="PhD" selected={data?.degree == "PhD"}>
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
          <p className="text-red-400 text-xs font-medium">
            {validationErrors.degree}
          </p>
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
          <option selected={data?.branch == "CSE"}>CSE</option>
          <option selected={data?.branch == "ECE"}>ECE</option>
          <option selected={data?.branch == "ME"}>ME</option>
          <option selected={data?.branch == "Civil"}>Civil</option>
          <option selected={data?.branch == "Design"}>Design</option>
          <option selected={data?.branch == "BSBE"}>BSBE</option>
          <option selected={data?.branch == "CL"}>CL</option>
          <option selected={data?.branch == "EEE"}>EEE</option>
          <option selected={data?.branch == "Physics"}>Physics</option>
          <option selected={data?.branch == "Chemistry"}>Chemistry</option>
          <option selected={data?.branch == "MNC"}>MNC</option>
          <option selected={data?.branch == "HSS"}>HSS</option>
          <option selected={data?.branch == "DSAI"}>DSAI</option>
          <option selected={data?.branch == "Energy"}>Energy</option>
          <option selected={data?.branch == "Environment"}>Environment</option>
          <option selected={data?.branch == "Nano-Tech"}>Nano-Tech</option>
          <option selected={data?.branch == "Rural-Tech"}>Rural-Tech</option>
          <option selected={data?.branch == "Linguistics"}>Linguistics</option>
          <option selected={data?.branch == "Others"}>Others</option>
        </select>
        {validationErrors?.branch ? (
          <p className="text-red-400 text-xs font-medium">
            {validationErrors.branch}
          </p>
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
          <option selected={data?.hostel == "Lohit"}>Lohit</option>
          <option selected={data?.hostel == "Dhansiri"}>Dhansiri</option>
          <option selected={data?.hostel == "Dihing"}>Dihing</option>
          <option selected={data?.hostel == "Gaurang"}>Gaurang</option>
          <option selected={data?.hostel == "Disang"}>Disang</option>
          <option selected={data?.hostel == "Dibang"}>Dibang</option>
          <option selected={data?.hostel == "Manas"}>Manas</option>
          <option selected={data?.hostel == "Umiam"}>Umiam</option>
          <option selected={data?.hostel == "Kapili"}>Kapili</option>
          <option selected={data?.hostel == "Subhansiri"}>Subansiri</option>
          <option selected={data?.hostel == "Kameng"}>Kameng</option>
          <option selected={data?.hostel == "Barak"}>Barak</option>
          <option selected={data?.hostel == "Married Scholor Hostel"}>
            Married Scholar Hostel
          </option>
          <option selected={data?.hostel == "Brahmaputra"}>Brahmaputra</option>
          <option selected={data?.hostel == "Siang"}>Siang</option>
          <option selected={data?.hostel == "Not Alloted"}>Not Alloted</option>
        </select>
        {validationErrors?.hostel ? (
          <p className="text-red-400 text-xs font-medium">
            {validationErrors.hostel}
          </p>
        ) : (
          <br />
        )}
        <label for="cpi" className="font-semibold text-sm text-gray-800">
          Room no:{" "}
        </label>
        <input
          required
          type="text"
          id="room_no"
          name="room_no"
          className={`${styles.input} md:w-11/12 w-full mb-1`}
          defaultValue={data?.room_no}
          onChange={onChange}
          disabled={isFormClosed}
        />
        {validationErrors?.room_no ? (
          <p className="text-red-400 text-xs font-medium">
            {validationErrors.room_no}
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
          defaultValue={data?.cpi}
          onChange={onChange}
          disabled={isFormClosed}
        />
        {validationErrors?.cpi ? (
          <p className="text-red-400 text-xs font-medium">
            {validationErrors.cpi}
          </p>
        ) : (
          <br />
        )}
        <label for="cpi" className="font-semibold text-sm text-gray-800">
          Semester:{" "}
        </label>
        <input
          required
          type="text"
          id="semester"
          name="semester"
          className={`${styles.input} md:w-11/12 w-full mb-1`}
          defaultValue={data?.semester}
          onChange={onChange}
          disabled={isFormClosed}
        />
        {validationErrors?.semester ? (
          <p className="text-red-400 text-xs font-medium">
            {validationErrors.semester}
          </p>
        ) : (
          <br />
        )}
        <label for="contact_no" className="font-semibold text-sm text-gray-800">
          Contact No:{" "}
        </label>
        <br />
        <input
          required
          type="text"
          id="contact_no"
          name="contact_no"
          className={`${styles.input} md:w-11/12 w-full mb-1`}
          defaultValue={data?.contact_no}
          onChange={onChange}
          disabled={isFormClosed}
        />
        {validationErrors?.contact_no ? (
          <p className="text-red-400 text-xs font-medium">
            {validationErrors.contact_no}
          </p>
        ) : (
          <br />
        )}
      </form>
    </div>
  );
};

export default WitnessDataForm;
