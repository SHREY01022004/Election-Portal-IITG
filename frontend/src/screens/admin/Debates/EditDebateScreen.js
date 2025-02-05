import React from "react";
import DebatesForm from "../../../components/Admin/DebatesForm/DebatesForm";
import { useLinkClickHandler, useLocation } from "react-router-dom";

const EditDebatesScreen = () => {
    const location = useLocation();
    console.log(location.state);
    return (
        <>
        <DebatesForm type="EDIT" formData={location.state} />
        </>
    );
};
export default EditDebatesScreen;
