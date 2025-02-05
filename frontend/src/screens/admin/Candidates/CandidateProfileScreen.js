import React from "react";
import { useLocation, Link } from "react-router-dom";
import CandidateCard from "./CandidateCard";
import { editCandidateData } from "../../../actions/candidates";
import { useDispatch } from "react-redux";
import doc from "./doc.svg";

const CandidateProfileScreen = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const userData = location.state;

  const fileName = (str) => {
    const arr = str.split("/");
    let retStr = arr[arr.length - 1];
    return  retStr.length<20 ? retStr : retStr.slice(0,20)+"...";
  };

  return (
    <>
      {userData ? (
        <div>
          <p className="text-left text-blue-700 text-lg font-medium">
            <Link to="/admin/candidates" className="hover:text-blue-900">
              &#8592; Back
            </Link>
          </p>
          <div className="grid grid-cols-4 mt-3">
            <div className="hidden sm:block col-span-1 h-14">
              <CandidateCard
                imgSrc={userData?.image}
                name={userData?.user?.name}
                position={userData?.position?.title}
              />
            </div>
            <div className="px-8 col-span-4 sm:col-span-3">
              <div className="flex justify-between">
                <div className="flex justify-between">
                  <h1 className="text-2xl font-bold mr-3">
                    {userData?.user?.name}
                  </h1>
                  <button>
                    <a
                      className="bg-violet-500 p-2 py-1 rounded"
                      href={`${process.env.REACT_APP_BASEAPIURL}/candidate_pdf/${userData?.id}/`}
                      // href={`https://swc.iitg.ac.in/elections_api/sgc/candidate_pdf/${userData?.id}/`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View Form
                    </a>
                  </button>
                </div>
                <div>
                  <select
                    onChange={(e) => {
                      console.log(e.target.value);
                      dispatch(
                        editCandidateData(userData?.id, {
                          nomination_status: e.target.value,
                        })
                      ).then(() => {
                        // navigate("../debates", { replace: true });
                        console.log("edited");
                      });
                    }}
                    className="px-2 py-1 bg-gray-300 rounded"
                  >
                    <option
                      value="pending"
                      selected={
                        userData?.nomination_status === "pending" ? true : false
                      }
                    >
                      Pending
                    </option>
                    <option
                      value="approved"
                      selected={
                        userData?.nomination_status === "approved"
                          ? true
                          : false
                      }
                    >
                      Approve
                    </option>
                    <option
                      value="rejected"
                      selected={
                        userData?.nomination_status === "rejected"
                          ? true
                          : false
                      }
                    >
                      Reject
                    </option>
                  </select>
                </div>
              </div>
              <div className="my-8 flex justify-start">
                <div className="mr-10 flex flex-col justify-start">
                  <p className="font-medium">Seconded by</p>
                  <p className="text-sm leading-6">
                    {userData?.seconded_by?.name}
                  </p>
                  <p className="text-sm leading-6">
                    {userData?.seconded_by?.roll_number}
                  </p>
                </div>
                <div className="mr-10 flex flex-col justify-start">
                  <p className="font-medium">Proposed by</p>
                  <p className="text-sm leading-6">
                    {userData?.proposed_by?.name}
                  </p>
                  <p className="text-sm leading-6">
                    {userData?.proposed_by?.roll_number}
                  </p>
                </div>
                <div className="mr-10 flex flex-col justify-start">
                  <p className="font-medium">CPI</p>
                  <p className="text-sm">{userData?.cpi}</p>
                </div>
                <div className="mr-10 flex flex-col justify-start">
                  <p className="font-medium">
                    Backlogs:{" "}
                    <span className="font-normal">{userData?.backlogs}</span>
                  </p>
                  <p className="font-medium">
                    Active Backlogs:{" "}
                    <span className="font-normal">
                      {userData?.active_backlogs}
                    </span>
                  </p>
                </div>
              </div>
              <div>
                <h2 className="font-medium mb-2">Credentials</h2>
                {userData?.credentials &&
                  Object.keys(userData?.credentials).map((cred, index) => {
                    return (
                      <div
                        className="mb-4 px-4 py-2"
                        style={{
                          boxShadow:
                            "0px 2px 1px rgba(0, 0, 0, 0.05), 0px 0px 1px rgba(0, 0, 0, 0.25)",
                          borderRadius: "6px",
                        }}
                      >
                        <p className="mb-1">{cred}</p>
                        <div>
                          <button
                            className={`border-2 rounded p-1 px-2 bg-white hover:bg-gray-200 mt-2 mr-2 text-black`}
                          >
                            <a
                              href={userData.credentials[cred]}
                              target="_blank"
                              rel="noreferrer"
                              className="text-black text-sm flex"
                            >
                              <img src={doc} alt="doc" className="mr-1" />
                              <p>{fileName(userData.credentials[cred])}</p>
                            </a>
                          </button>
                        </div>
                        <div className="mt-2 flex justify-start items-center">
                          <input
                            type="checkbox"
                            id="credverify"
                            name="credverify"
                            value="credverify"
                          />
                          <label htmlFor="credverify" className="ml-2 text-sm text-gray-800">Verify</label>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <p className="text-left text-blue-700 text-lg font-medium">
            <Link to="/admin/candidates" className="hover:text-blue-900">
              &#8592; Back
            </Link>
          </p>
          <div className="flex h-40 justify-center items-center">
            <p>User Not found !!</p>
          </div>
        </>
      )}
    </>
  );
};

export default CandidateProfileScreen;
