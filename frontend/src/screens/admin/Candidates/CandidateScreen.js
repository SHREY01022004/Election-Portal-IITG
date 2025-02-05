import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getCandidateData,
  editCandidateData,
} from "../../../actions/candidates";
import { DateConvert } from "../../../utils";
import PaginationBar from "./PaginationBar";

const CandidatesScreen = () => {
  const candidates = useSelector((state) => state.candidates);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const candidatesPerPage = 8;

  useEffect(() => {
    dispatch(getCandidateData());
  }, [dispatch]);

  let candidatesToShow = [];

  const lastInd = currentPage * candidatesPerPage;
  const firstInd = lastInd - candidatesPerPage;
  const paginatedCandidates =
    candidates && candidates.length !== 0
      ? candidates.slice(firstInd, lastInd)
      : [];

  const searchedCandidates =
    candidates && candidates.length !== 0
      ? candidates.filter((c, i) => {
          return (
            c?.user?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c?.user?.roll_number
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            c?.position?.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
        })
      : [];

  candidatesToShow =
    searchQuery === "" ? paginatedCandidates : searchedCandidates;

  return (
    <>
      <h1 className="text-3xl text-black mb-6">Candidates</h1>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-5/12 border-2 border-blue-500 rounded px-3 py-1"
        placeholder="Search candidates by name, roll no. or position"
      />
      <div className="w-full mt-6 overflow-x-auto bg-white">
        <div className="bg-white">
          <table className="min-w-full leading-normal">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-4 py-3 border-b-2 text-left text-sm font-semibold uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-3 border-b-2 text-left text-sm font-semibold uppercase tracking-wider">
                  Position
                </th>
                <th className="px-4 py-3 border-b-2 text-left text-sm font-semibold uppercase tracking-wider">
                  Video
                </th>
                <th className="px-4 py-3 border-b-2 text-left text-sm font-semibold uppercase tracking-wider">
                  Nomination Form
                </th>
                <th className="px-4 py-3 border-b-2 text-left text-sm font-semibold uppercase tracking-wider">
                  Credentials
                </th>
                <th className="px-4 py-3 border-b-2 text-left text-sm font-semibold uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {candidatesToShow.map((data, idx) => {
                
                return (
                  (data!=undefined && 
                  <tr key={idx}>
                    <td className="text-left py-3 px-4">
                      <Link to={`/admin/candidates/${data?.id}`} state={data}>
                        <div className="hover:text-blue-500">
                          <p>{data?.user.name}</p>
                          <p className="text-sm">{data?.user.roll_number}</p>
                        </div>
                      </Link>
                    </td>
                    <td className="text-left py-3 px-4">
                      {data?.position?.title}
                    </td>
                    <td className="text-left py-3 px-4">
                      <a
                        href={data?.video}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-500 underline"
                      >
                        View
                      </a>
                    </td>
                    <td className="text-left py-3 px-4">
                      <a
                        className="bg-violet-500 p-2 py-1"
                        href={`${process.env.REACT_APP_BASEAPIURL}/candidate_pdf/${data?.id}/`}
                        // href={`https://swc.iitg.ac.in/elections_api/sgc/candidate_pdf/${data?.id}/`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View Form
                      </a>
                    </td>
                    <td className="text-left py-3 px-4">
                      <Link
                        to={`/admin/candidates/${data?.id}`}
                        state={data}
                        className="bg-violet-500 p-2 py-1"
                      >
                        View Credentials
                      </Link>
                    </td>
                    <td className="text-left py-3 px-4">
                      <select
                        onChange={(e) => {
                          console.log(e.target.value);
                          const selectedOption = e.target.value;
                          if (selectedOption === "send_back") {
                            window.open(`mailto:${data?.user?.email}`);
                          } else {
                            dispatch(
                              editCandidateData(data?.id, {
                                nomination_status: selectedOption,
                              })
                            ).then(() => {
                              console.log("edited");
                            });
                          }
                        }}
                        className="px-2 py-1 bg-gray-300"
                      >
                        <option
                          value="pending"
                          selected={
                            data?.nomination_status === "pending" ? true : false
                          }
                        >
                          Pending
                        </option>
                        <option
                          value="approved"
                          selected={
                            data?.nomination_status === "approved"
                              ? true
                              : false
                          }
                        >
                          Approve
                        </option>
                        <option
                          value="rejected"
                          selected={
                            data?.nomination_status === "rejected"
                              ? true
                              : false
                          }
                        >
                          Reject
                        </option>
                        <option value="send_back" selected={false}>
                          Send Back
                        </option>
                      </select>
                    </td>
                  </tr>
                          ));
              })}
            </tbody>
          </table>
          {searchQuery === "" && (
            <PaginationBar
              candidatesPerPage={candidatesPerPage}
              totalCandidates={candidates.length}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default CandidatesScreen;