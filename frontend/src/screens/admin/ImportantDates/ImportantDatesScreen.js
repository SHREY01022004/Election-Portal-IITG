import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getImportantDates,
  deleteImportantDate,
} from "../../../actions/importantDates";
import { DateConvert, TimeConvert } from "../../../utils";
const ImportantDatesScreen = () => {
  const importantDates = useSelector((state) => state.importantDates);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getImportantDates());
  }, [dispatch]);
  return (
    <>
      <h1 className="text-3xl text-black pb-6">Important Dates</h1>
      <div className="mt-6">
        <Link
          className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded"
          to={`/admin/importantdates/add`}
        >
          Add Important Dates
        </Link>
      </div>
      <div className="w-full mt-6 overflow-auto">
        <div className="bg-white">
          <table className="min-w-full leading-normal">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-5 py-3 border-b-2 text-left text-sm font-semibold uppercase tracking-wider">
                  Title
                </th>
                <th className="px-5 py-3 border-b-2 text-left text-sm font-semibold uppercase tracking-wider">
                  Date
                </th>
                <th className="px-5 py-3 border-b-2 text-left text-sm font-semibold uppercase tracking-wider">
                  Time
                </th>
                <th className="px-5 py-3 border-b-2 text-left text-sm font-semibold uppercase tracking-wider">
                  Edit
                </th>
                <th className="px-5 py-3 border-b-2 text-left text-sm font-semibold uppercase tracking-wider">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {console.log(importantDates)}
              {importantDates.length !== 0 &&
                importantDates.map((data, idx) => {
                  return (
                    <tr key={idx}>
                      <td className="text-left py-3 px-4">{data?.title}</td>
                      <td className="text-left py-3 px-4">
                        {DateConvert(data?.date)}
                      </td>
                      <td className="text-left py-3 px-4">
                        {TimeConvert(data?.date)}
                      </td>
                      <td className="text-left py-3 px-4">
                        <Link
                          to={{
                            pathname: `/admin/importantdates/${data?.id}`,
                          }}
                          state={data}
                        >
                          <button className="hover:text-blue-500">Edit</button>
                        </Link>
                      </td>
                      <td className="text-left py-3 px-4">
                        <button
                          className="hover:text-red-500 disabled:text-gray-400 disabled:cursor-not-allowed"
                          onClick={() =>
                            dispatch(deleteImportantDate(data?.id))
                          }
                          disabled={data?.title==="Nomination Deadline" || data?.title==="Basic Info Deadline"}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ImportantDatesScreen;