import React from "react";
import Sidebar from "../components/Sidebar/Sidebar"
import GenerateOtpScreen from "./GenerateOtpScreen/GenerateOtpScreen";
const AdminVoteDay = () => {
  return (
    <div className="bg-gray-100 font-family-karla flex">
            <Sidebar>
             <GenerateOtpScreen/>
            </Sidebar>
    </div>
  );
};

export default AdminVoteDay;
