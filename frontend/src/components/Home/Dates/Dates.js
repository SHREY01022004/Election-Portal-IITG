import React, { useEffect } from "react";
import styles from "./Dates.module.css";
import calender from "./calender.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  getImportantDates,
} from "../../../actions/importantDates";
import { DateConvert, TimeConvert } from "../../../utils";
const Dates = () => {
  const importantDates = useSelector((state) => state.importantDates);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getImportantDates());
  }, [dispatch]);
  return (
    <div className="w-">
      <h1 className="font-normal text-2xl pt-8 pb-4 text-gray-800"> Important Dates </h1>
      <div>
        <table>
        {importantDates.length !== 0 &&
                importantDates.filter((dt=>dt.title!=="Basic Info Deadline")).map((data, idx) => {
                  return (
                    <tr>
            <td className="p-4">
              <img src={calender} alt="calender" className={styles.image} />
            </td>
            <td className="p-4 text-gray-800 font-medium text-base">
            {data?.title}
            </td>
            <td className="p-4 text-gray-700 font-normal text-base">
            {DateConvert(data?.date)}, {TimeConvert(data?.date)}
            </td>
          </tr>
          );
          })}
        </table>
      </div>
    </div>
  );
};

export default Dates;