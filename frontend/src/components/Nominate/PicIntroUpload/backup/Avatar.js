import React from "react";
import ReactCrop from "react-image-crop";
import { useState } from "react";

export default function Avatar({ imageURL }) {
  const [crop, setCrop] = useState({ aspect: 4 / 3 });

  return (
    <div className="flex-col justify-center align-center items-center">
      {/* <div className="flex-col items-stretch">
        <button
          className="mt-3 mb-2 px-4 hover:bg-gray-400 rounded text-center border-2 border-gray-700 mx-10 font-bold"
          onClick={(e) => setUploadImage(null)}
        >
          Click to remove
        </button>
      </div> */}
      <div className="mx-10 my-3">
        <ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
          <img
            src={imageURL}
            style={{
              height: "12rem",
            }}
            alt="img"
          />
        </ReactCrop>
      </div>
    </div>
  );
}
