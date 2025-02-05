import React, { useEffect } from "react";
import tick from "./error.svg";
const SuccessMessage = (props) => {
  //   useEffect(() => {
  //     setTimeout(() => {
  //       window.replace("/");
  //     }, 1000);
  //   }, []);
  return (
    <div className="w-80">
      <div className="flex flex-col">
        <div className="bg-red-600 flex flex-row justify-between items-center p-3 rounded-2xl">
          <div className="text-white font-bold text-xl font-atkinson">
            Unsuccessfull
          </div>
          <div className="w-8 h-8">
            <img src={tick} alt="" />
          </div>
        </div>

        <div
          className="mt-5 shadow-xl px-4 justify-center font-atkinson h-fit p-1"
          style={{ minHeight: "4rem", backgroundColor: "#f6f6f6" }}
        >
          <p style={{ overflowWrap: "break-word" }}>{props.message}</p>
        </div>
      </div>
    </div>
  );
};
export default SuccessMessage;
