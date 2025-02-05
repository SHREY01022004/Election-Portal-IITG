// import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getStats from "../../../actions/getStats"
import HOSTELS from "../../../constants/hostels";

import Icon from "../../../assets/svgs/spark.svg"
import { CountTotalVotes } from "../../../utils";
import { DateConvert, TimeConvert } from "../../../utils";
import { useEffect } from "react";

// const DateConvert2 = (creation) => {
//   var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//   var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
//   return (
//     <>
//       {new Date(creation).getUTCDate()} {months[new Date(creation).getUTCMonth()]} {new Date(creation).getUTCFullYear()}
//     </>
//   );
// };
const BlockchainMessage = () => {
  const statsData = useSelector((state) => state.getStats);
  const dispatch = useDispatch(); 
  useEffect(() => {
    dispatch(getStats()); 
  }, [dispatch]);

  const hosStats = statsData?.filter(el=>el?.stat_title==="Hostel");

  let hostels = []
  if(statsData) {
    for(let key in hosStats[0]?.stat_cnt){
      hostels = [...hostels, {name: HOSTELS[key], count: hosStats[0].stat_cnt[key]}]
    }
  }
 
  const totalVotes = CountTotalVotes(hostels)
  return (
    <div className={`flex justify-center items-center bg-pink-100 px-4 md:px-3 py-2`}>
      <span className="flex justify-center items-center text-center text-[#f71873] text-sm md:text-lg font-medium md:font-normal">
        <img src={Icon}/>&nbsp;Current vote count: <b>&nbsp;{totalVotes}</b>
        {/* <img src={Icon}/>&nbsp;SGC Elections 2024 are over. */}
         {/* <img src={Icon}/>&nbsp;Voting statistics are live!! */}
         {/* <img src={Icon}/>&nbsp;Deadline to file your nomination is {DateConvert2(importantDates[0]?.date)} */}
      </span>
    </div>
  );
};

export default BlockchainMessage;
