import React, { useState } from "react";
import styles from "./UploadNavbar.module.css";
import LearnMore from "../../LearnMore/LearnMore";

const UploadNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="pb-6">
      <div className="flex">
        <h1 className="text-2xl ml-1"> My Credentials</h1>
        <button
          className={`mr-1 ml-auto self-center ${styles.link}`}
          onClick={() => setIsOpen(true)}
        >
          Learn More
        </button>
      </div>
      {isOpen && <LearnMore page="creds" setIsOpen={setIsOpen} />}
      <hr className="my-2 border border-solid border-gray-200" />
    </div>
  );
};

export default UploadNavbar;
