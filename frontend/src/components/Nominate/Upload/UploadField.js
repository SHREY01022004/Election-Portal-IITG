import React from "react";
import styles from "./Upload.module.css";
import doc from "./doc.svg";
import del from "./delete.svg";
const UploadField = (props) => {
  const hiddenFileInput = React.useRef(null);
  const fileNameRef = React.useRef(null);

  const handleClick = (event) => {
    if (!fileNameRef.current.value) {
      alert("Please add filename");
      return;
    }
    hiddenFileInput.current.click();
  };

  const fileName = (str) => {
    const arr = props.link.split("/");
    return arr[arr.length - 1];
  };

  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    props.handleFile(fileNameRef.current.value, fileUploaded);
  };

  return (
    <div className="mb-2 p-2 md:p-0">
      <div className={`w-full md:w-3/5 ${styles.container}`}>
        <div className="p-6 flex items-center ">
          <div className="w-full">
            {!props.link && (
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter Credential Name"
                className={`${styles.input}  w-full`}
                ref={fileNameRef}
              ></input>
            )}
            {props.link && (
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter Credential Name"
                className={`${styles.input}  w-full`}
                disabled
                value={props.title}
              ></input>
            )}
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
                <>
                  {!props.title && (
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
                  {props.title && (
                    <button
                      className={`${styles.button} mt-2 text-red-500`}
                      onClick={() => props.credDelete(props.title)}
                    >
                      Remove File
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="ml-auto mr-12">
            {/* {!props.title && (
              <button className={styles.button} onClick={handleClick}>
                <div className="flex">
                  <img src={doc} alt="doc" />
                  <p className="pl-2">Upload </p>
                </div>
              </button>
            )}
            {props.title && (
              <button
                className={styles.button}
                onClick={() => props.credDelete(props.title)}
              >
                Delete
              </button>
            )} */}
            {/* {props.title && (
              <button
                className="p-4"
                onClick={() => props.credDelete(props.title)}
              >
                <img src={del} />
              </button>
            )} */}

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

export default UploadField;
