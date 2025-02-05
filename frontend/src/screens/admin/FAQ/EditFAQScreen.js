import React from "react";
import FAQForm from "../../../components/Admin/FAQForm/FAQForm";
import { useLinkClickHandler, useLocation } from "react-router-dom";

const EditFAQScreen = () => {
  const location = useLocation();
  console.log(location.state);
  return (
    <>
      <FAQForm type="EDIT" formData={location.state} />
    </>
  );
};
export default EditFAQScreen;
