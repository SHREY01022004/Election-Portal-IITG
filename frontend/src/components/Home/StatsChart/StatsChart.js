import React from "react";
import styles from "./StatsChart.module.css"
import { useState } from "react";
import { Bar } from 'react-chartjs-2'
import { CountTotalVotes } from "../../../utils";

const COLORS = [
  "#e6cd8a",
  "#d8e68a",
  "#d28ae6",
  "#a5bafa",
  "#af92de",
  "#ed8c8c",
  "#8ceddd",
  "#ed8ce7",
  "#c8f5b8",
  "#e9f5b8",
  "#bb98e3",
  "#f792c1",
  "#f592f7",
  "#c4fffe",
  "#cac4ff",
  "#ffe9c4",
  "#f9ffc4"
]

function poolColors(a) {
  var pool = [];
  for(let i = 0; i < a; i++) {
      pool.push(COLORS[i]);
  }
  return pool;
}
const genderTotalVoters = [6408,2038]

const StatsChart = ({hostel, dept, genders}) => {
  const totalVotes = CountTotalVotes(hostel);
  const hostelData = {
      labels: hostel.map((d)=>{if(d.name=="Married Scholar Hostel") return "MSH"; else return d.name}),
      datasets: [
        {
          label: '% of Votes',
          data: hostel.map((d)=>{return (100*d.count)/d.total}),
          backgroundColor: poolColors(11),
          borderColor: poolColors(11),
          borderWidth: 0,
        },
      ],
    };
    const deptData = {
      labels: dept.map((d)=>{return d.name}),
      datasets: [
        {
          label: '% of Votes',
          data: dept.map((d)=>{return (100*d.count/d.total)}),
          backgroundColor: poolColors(11),
          borderColor: poolColors(11),
          borderWidth: 0,
        },
      ],
    };
    const genderData = {
      labels: genders.map((d)=>{return d.name}),
      datasets: [
        {
          label: 'Voter Turnout',
          data: genders.map((d, index)=>{return d.count/genderTotalVoters[index] * 100}),
          backgroundColor: poolColors(11),
          borderColor: poolColors(11),
          borderWidth: 0,
        },
      ],
    }
  const [active, setActive] = useState(0);
    const hostDeptClickListener = (elem)=>{
      if(elem.target.innerText === "Hostels"){
          setActive(0);
      }else if(elem.target.innerText === "Departments"){
          setActive(1);        
      }else if(elem.target.innerText === "Genders"){
          setActive(2);
      }
    }
    let data = {};
    if(active===0){
      data=hostelData;
    }else if(active===1){
      data=deptData;
    }else if(active===2){
      data=genderData;
    }
    // console.log("hostels' data: ",hostel);
  return (
    <>
      <div className='w-full h-screen'>
            {/* <span className={`${styles.head} hidden md:block`}>Vote Count</span> */}
            <div className={`flex ${styles.main} md:flex-row flex-col`}>
                <div className="flex mt-4 md:my-0 md:flex-col md:self-center ml-8 pr-10 lg:pr-32">
                  <div className="flex flex-col sm:items-start sm:mb-3">
                    <span className={`${styles.dhead} text-center`}>{totalVotes}</span>
                    <span className={styles.et}>Voters Count</span>   
                  </div>
                  <div className="flex flex-col sm:items-start ml-auto mr-0 md:mx-0">
                    <span className={`${styles.dhead} text-center`}>{Math.round((100*totalVotes)/8446)}%</span>
                    <span className={styles.et}>Voters Turnout</span>   
                  </div>
                </div>
                <div className='border-l my-10 pl-0 md:pl-14 w-full'>
                  <div className='flex justify-center' onClick={hostDeptClickListener}>
                    <button className={`${styles.btn} ${active===0 ? styles.active : ""} px-4`}>Hostels</button>
                    <button className={`${styles.btn} ${active===2 ? styles.active : ''} px-4`}>Genders</button>
                    <button className={`${styles.btn} ${active===1 ? styles.active : ''} px-4`}>Departments</button>
                  </div>
                  <br/>
                  {/* <div> */}
                    <div>
                      <Bar data={data} options={{
                        plugins: {
                            title: {
                            display: true,
                            text: data===genderData ? "Voter turnout (Percentage)" :"Number of Votes"
                            },
                            legend: { 
                              display:false
                            }
                        }
                        }}/>
                    </div>
                    {/* <div className='flex gap-5 flex-wrap'>
                      {color_map.map((x)=><LegendItem data={x.name} color={x.color}/>)}
                    </div> */}
                  {/* </div> */}
              </div>
            </div>
        </div>
    </>
  );
};
export default StatsChart;
