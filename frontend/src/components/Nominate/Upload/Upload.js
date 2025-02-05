import React, { useState } from "react";
import styles from "./Upload.module.css";
import doc from "./doc.svg";
import UploadField from "./UploadField";
import del from "./delete.svg";
const Upload = (props) => {
  const hiddenFileInput = React.useRef(null);
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    props.handleFile("proof", fileUploaded);
  };

  const onCLick = (e) => {
    e.preventDefault();
    let credential = (
      <UploadField
        handleFile={props.handleFile}
        isFormClosed={props.isFormClosed}
      />
    );
    props.setCredentials((credentials) => {
      return [credential];
    });
  };
  return (
    <div>
      <div className={`w-full md:w-3/5 ${styles.container}`}>
        {/* <div className="p-6">
          <div className="pb-4">
            <p className="text-lg leading-8 text-gray-600 ">
              Certificate of Appreciation in RECYCLE-2018 (International
              Conference in the month of February) from IIT GUWAHATI.
            </p>
          </div>
          <button className={styles.button} onClick={handleClick}>
            {" "}
            <div className="flex">
              <img src={doc} alt="doc" />
              <p className="pl-2">Attach Proof </p>
            </div>
          </button>
          <input
            type="file"
            ref={hiddenFileInput}
            onChange={handleChange}
            style={{ display: "none" }}
          />
        </div> */}
      </div>
      <div></div>
      <div>{props.credentials}</div>
      {!props.isFormClosed && (
        <div className="pt-8 px-2">
          <button
            className={`px-5 w-full md:w-fit text-white ${styles.credbutton}`}
            onClick={onCLick}
          >
            Add Credentials
          </button>
        </div>
      )}
    </div>
  );
};

export default Upload;
