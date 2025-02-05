import React, { useState } from "react";
import { Avatar } from "@primer/react";
import LogoSVG from "../../../assets/svgs/logo.svg";
import profile from "../../../assets/svgs/profile.svg";
import dropdown from "../../../assets/svgs/drop.svg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../actions/auth";
import { useNavigate } from "react-router-dom";
import { SET_CANDIDATE_DATA } from "../../../constants";

const TopNav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.auth);
  const [dropClick, setDropClick] = useState(false);
  
  let loginComp = () => {
    if (userData) {
      return (
        <div className={`sm:flex flex-col`}>
          <div className={`decoration-stone-800 flex items-center space-x-2`}>
            <Avatar src={profile} size={38} />
            <div className="ml-2 relative">
              <div className="flex flex-row space-x-2">
                <span className="text-sm font-medium">
                  {userData.first_name ||
                    userData.euser?.name ||
                    userData?.email ||
                    `VOTER_${userData.id}`}
                </span>
                <img
                  src={dropdown}
                  className={`ml-1 scale-150 cursor-pointer ${
                    dropClick ? "rotate-180" : ""
                  }`}
                  alt="d"
                  onClick={() => setDropClick(!dropClick)}
                />
              </div>
              <span className="text-sm text-gray-800">
                {userData.candidates?.length !== 0 ? "Candidate" : "Voter"}
              </span>
              <div
                className={`decoration-gray-600 absolute z-10 font-bold bg-white rounded shadow-lg top-10 right-0 w-40 shadow ${
                  dropClick ? "flex flex-col" : "hidden"
                }`}
              >
                {userData?.candidates?.length !== 0 && (
                  <button className="hover:bg-blue-100 py-2">
                    <Link
                      to="/nominate/about"
                      className=" font-medium  px-3 py-2 rounded"
                      onClick={() => setDropClick(false)}
                    >
                      My profile
                    </Link>
                  </button>
                )}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(logout());
                    setDropClick(false);
                    dispatch({ type: SET_CANDIDATE_DATA, data: {} });
                    navigate("/", { replace: true });
                  }}
                  className="font-medium hover:bg-blue-100 px-3 py-2 rounded"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <Link to="/login">
          <button className="border-2 py-1 px-4 rounded-md text-sm font-medium">
            Login
          </button>
        </Link>
      </div>
    );
  };
  return (
    <div className={`flex pl-4 pr-4 md:pl-16 md:pr-16 my-3`}>
      <div>
        <Link to="/">
          <img src={LogoSVG} alt="logo" />
        </Link>
      </div>
      <div className="flex items-center justify-end w-full gap-6">
        <div className="flex items-center gap-2">
          {loginComp()}
        </div>
      </div>
    </div>
  );
};
export default TopNav;
