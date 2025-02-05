import React from "react";
const OrganizerCard = (props) => {
  const contact = `tel:${props.contact}`;
  const name = props.imagename;
  const nameString = props.name.split(" ");
  return (
    <div className="border-2 p-4 rounded-md mt-8 mr-4 w-72">
      {/* <div
        className="box-border pointer-events-none border-8 border-white w-full h-64 bg-gray-700 flex justify-center"
        style={{ maxWidth: "225px", margin: "auto" }}
      >
        <img
          src={props.image[name]}
          alt=""
          className="h-full w-full object-fit rounded-sm"
        />
      </div> */}
        <div className="bg-gray-200 rounded-md ">
          <img
            style={{ height: "250px" }}
            src={props.image[name]}
            alt="ProfilePic"
            className="w-full object-contain rounded-md"
          />
        </div>
      <div class="ml-2">
        <div className="font-bold font-sans text-lg">{props.name}</div>
        <div className="text-gray-600 font-semibold">{props.post}</div>
        <div className="flex items-center space-x-2">
          {/* <div>
          <svg
            width="16"
            height="12"
            viewBox="0 0 16 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M1.75012 0C0.783624 0 0.000122075 0.7835 0.000122075 1.75V2.48577C-4.08865e-05 2.49479 -4.04965e-05 2.50381 0.000122075 2.51282V10.25C0.000122075 11.2165 0.783623 12 1.75012 12H14.2501C15.2166 12 16.0001 11.2165 16.0001 10.25V2.51265C16.0003 2.50376 16.0003 2.49485 16.0001 2.48594V1.75C16.0001 0.7835 15.2166 0 14.2501 0H1.75012ZM14.5001 2.07029V1.75C14.5001 1.61193 14.3882 1.5 14.2501 1.5H1.75012C1.61205 1.5 1.50012 1.61193 1.50012 1.75V2.07029L8.00012 5.88063L14.5001 2.07029ZM1.50012 3.80902V10.25C1.50012 10.3881 1.61205 10.5 1.75012 10.5H14.2501C14.3882 10.5 14.5001 10.3881 14.5001 10.25V3.80902L8.37941 7.39702C8.14519 7.53432 7.85505 7.53432 7.62083 7.39702L1.50012 3.80902Z"
              fill="#4B5563"
            />
          </svg>
        </div> */}
          <div className="font-gray-700">+91-{props.contact}</div>
        </div>
      </div>
      <div className="flex justify-center">
      <button className="mt-4 py-2.5 px-14 border-2 rounded-md bg-gray-100 font-semibold">
        <a href={contact}>Contact {nameString[0]}</a>
      </button></div>
    </div>
  );
};

export default OrganizerCard;
