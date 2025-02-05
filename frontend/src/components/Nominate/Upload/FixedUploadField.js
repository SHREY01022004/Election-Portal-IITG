import React from "react";
import styles from "./Upload.module.css";
import doc from "./doc.svg";
//import del from "./delete.svg";

const FixedUploadField = (props) => {
  const hiddenFileInput = React.useRef(null);
  //const fileNameRef = React.useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const fileName = (str) => {
    const arr = props.link.split("/");
    return arr[arr.length - 1];
  };

  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    props.handleFile(props.title, fileUploaded);
  };

  return (
    <div className="mb-2 px-2 md:px-0">
      <div className={`w-full md:w-3/5 ${styles.container}`}>
        <div className="p-6 flex items-center ">
          <div className="w-full">
            <p>{props.title}</p>
            <div className="flex flex-wrap">
              {props.link && (
                <button className={`${styles.button} mt-2 mr-2 text-black`}>
                  <a
                    href={props.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-black text-sm flex"
                  >
                    <img src={doc} alt="doc" className="mr-1" />
                    <p>{fileName(props.link)}</p>
                  </a>
                </button>
              )}
              {!props.isFormClosed && (
                <button
                  className={`${styles.button} mt-2`}
                  onClick={handleClick}
                >
                  <div className="flex">
                    <img src={doc} alt="doc" />
                    <p className="pl-2">Attach proof</p>
                  </div>
                </button>
              )}
            </div>
          </div>
          <div className="ml-auto mr-12">
            <input
              type="file"
              ref={hiddenFileInput}
              onChange={handleChange}
              style={{ display: "none" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FixedUploadField;
