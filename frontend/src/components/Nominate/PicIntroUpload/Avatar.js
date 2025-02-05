import React from "react";

function Avtr({ url }) {
  return (
    <div className="flex-col justify-center align-center items-center">
      <div className="mx-10 my-3">
        {url && <img class="w-auto h-64" src={url} alt="img" />}
      </div>
    </div>
  );
}

export default function Avatar({ imageURL, uploadImage }) {
  if (uploadImage) return <Avtr url={URL.createObjectURL(uploadImage)} />;
  else return <Avtr url={imageURL} />;
}
