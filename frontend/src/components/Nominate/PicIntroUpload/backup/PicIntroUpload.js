import React from "react";
import "react-image-crop/dist/ReactCrop.css";
import Avatar from "./Avatar";

const PicIntroUpload = ({
  uploadImage,
  setUploadImage,
  setIntro,
  imageURL,
  setImageURL,
  intro,
  validationErrors,
}) => {
  console.log("khulllaaaaaaaaaaa ncdlnlcd");

  return (
    <div className="w-full p-3 m-6 mt-0">
      <div className="font-medium">Profile Pic : </div>
      <div
        className="flex justify-center align-center items-center border-2 p-3"
        style={({ height: "fit-content" }, { "min-height": "12rem" })}
      >
        <div>
          <div className="mb-3 text-center">
            {" "}
            Upload your profile picture here
          </div>
          <input
            accept="image/*"
            type="file"
            id="select-image"
            style={{ display: "none" }}
            onChange={(e) => setUploadImage(e.target.files[0])}
            required
          />
          <label htmlFor="select-image">
            <div class=" hover:bg-gray-300 bg-coolGray-50 text-[14px] font-medium text-center py-2 px-6 rounded border-2">
              Upload File
            </div>
          </label>
          {imageURL && <Avatar imageURL={imageURL} />}
        </div>
      </div>
      <div className="mt-3 font-medium">Brief Introduction :</div>
      <textarea
        type="text"
        placeholder="Write 300 words of introduction..."
        name="intro"
        className="w-full h-48 p-2 mt-1 border-2"
        defaultValue={intro}
        onChange={(e) => setIntro(e.target.value)}
        required
      ></textarea>
      {validationErrors?.about ? (
        <p className="text-red-400 text-sm">{validationErrors.about}</p>
      ) : (
        <br />
      )}
    </div>
  );
};

export default PicIntroUpload;
