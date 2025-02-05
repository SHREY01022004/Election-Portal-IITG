import React from "react";
import ImportantDatesForm from "../../../components/Admin/ImportantDatesForm/ImportantDatesForm";
import { useLinkClickHandler, useLocation } from "react-router-dom";

const EditImportantDateScreen = () => {
  const location = useLocation();
  console.log(location.state);
  return (
    <>
      <ImportantDatesForm type="EDIT" formData={location.state} />
    </>
  );
};
export default EditImportantDateScreen;
