import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getDebates,
  deleteDebate,
} from "../../../actions/debates";
import { DateConvert } from "../../../utils";

const DebatesScreen = () => {
    const debates = useSelector((state) => state.debates);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getDebates());
    }, [dispatch]);
    
  return (
    <>
      <h1 className="text-3xl text-black pb-6">Debates</h1>
      <div className="mt-6">
        <Link
          className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded"
          to={`/admin/debates/add`}
        >
          Add Debates
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
              {console.log(debates)}
              {debates.length !== 0 &&
                debates.map((data, idx) => {
                  return (
                    <tr key={idx}>
                      <td className="text-left py-3 px-4">{data?.title}</td>
                      <td className="text-left py-3 px-4">
                        {data?.debate_time.split("T",1)}
                      </td>
                      <td className="text-left py-3 px-4">
                        {data?.debate_time.split("T")[1].split("Z")}
                      </td>
                      <td className="text-left py-3 px-4">
                        <Link
                          to={{
                            pathname: `/admin/debates/${data?.id}`,
                          }}
                          state={data}
                        >
                          <button className="hover:text-blue-500">Edit</button>
                        </Link>
                      </td>
                      <td className="text-left py-3 px-4">
                        <button
                          className="hover:text-red-500"
                          onClick={() =>
                            dispatch(deleteDebate(data?.id))
                          }
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

export default DebatesScreen;
