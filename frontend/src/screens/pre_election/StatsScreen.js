import React, { useEffect } from "react";
import { Router, Routes } from "react-router-dom";
import StatsChart from "../../components/Home/StatsChart/StatsChart";
import { useDispatch, useSelector } from "react-redux";
import getStats from "../../actions/getStats"
import HOSTELS from "../../constants/hostels";
import DEPT from "../../constants/depts";
var data;
const StatsScreen = () => {
  const statsData = useSelector((state) => state.getStats);
  const dispatch = useDispatch();
  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(getStats());
    }, 5000);
    return ()=> {
      clearInterval(intervalId);
    }
    // dispatch(getStats());
  }, [dispatch]);

  if(statsData == null){
    return (
      <div>
        Loading...
      </div>
    );
  }

  const hosStats = statsData.filter(el=>el?.stat_title==="Hostel");
  const depStats = statsData.filter(el=>el?.stat_title==="Branch");
  const genStats = statsData.filter(el=>el?.stat_title==="Gender");

  //console.log({hosStats},{genStats},{depStats});


  let hostels = []
  let depts = []
  let genders = []
  for(let key in hosStats[0]?.stat_cnt){
    hostels = [...hostels, {name: HOSTELS[key], count: hosStats[0].stat_cnt[key],total:hosStats[0].stat_total[key]}]
  }
  for(let key in depStats[0]?.stat_cnt){
    depts = [...depts, {name: DEPT[key], count: depStats[0].stat_cnt[key],total:depStats[0].stat_total[key]}]
  }
  for(let key in genStats[0]?.stat_cnt){
    genders = [...genders, {name: key, count: genStats[0].stat_cnt[key],total:genStats[0].stat_total[key]}]
  }
 
  return (
    <>
      <StatsChart hostel={hostels} dept={depts} genders={genders}/>
    </>
  );
};
export default StatsScreen;
