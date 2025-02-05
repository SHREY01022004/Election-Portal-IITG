import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import CardGallery from "../../components/Home/Gallery/CardGallery";
import FAQSection from "../../components/Home/FAQ/FAQSection";
import StepList from "../../components/Home/StepList/StepList";
import SideBarSection from "../../components/Home/SideNav/Sidebar";
import StickyBox from "react-sticky-box";
import { Helmet } from "react-helmet";
import styles from "./ResultsScreen.module.css";
import Card from "../../components/Home/Results/Card/Card";
import results from "../../constants/result";
import winners from "../../constants/winners";
import StatsChart from "../../components/Home/StatsChart/StatsChart";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Chart } from "react-chartjs-2";
import useAuthCheck from "../../hooks/useAuthCheck";
import { useSelector } from "react-redux";

function dynamicColors() {
  var r = Math.floor(Math.random() * 255);
  var g = Math.floor(Math.random() * 255);
  var b = Math.floor(Math.random() * 255);
  return "rgba(" + r + "," + g + "," + b + ", 0.5)";
}
function poolColors(a) {
  var pool = [];
  for (let i = 0; i < a; i++) {
    pool.push(dynamicColors());
  }
  return pool;
}

const ResultsScreen = (props) => {
  const location = useLocation();
  let currPage = location.pathname.split("/");
  currPage = currPage[currPage.length - 1];
  const result = results[currPage];
  const winner = winners[currPage];

  const data = {
    labels: Object.keys(result).map((d) => {
      return d;
    }),
    datasets: [
      {
        label: "# of Votes",
        data: Object.values(result).map((d) => {
          return d;
        }),
        backgroundColor: poolColors(11),
        borderColor: poolColors(11),
        borderWidth: 0,
      },
    ],
  };

  // const isLoggedIn = useAuthCheck();
  // let userData = useSelector((store) => store.auth);

  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     navigate("/login", { replace: true });
  //     return;
  //   }
  // }, [isLoggedIn]);

  return (
    <>
      <Helmet>
        <title>Winners | Election Portal</title>
      </Helmet>
      <div>
        <div className={`${styles.win} ml-3`}>Winners</div>
        <div className="md:flex">
          <div className="w-full md:w-3/12">
            <StickyBox offsetTop={20} offsetBottom={20}>
              <SideBarSection posts={props.posts} />
            </StickyBox>
          </div>
          <div className="flex flex-col">
            {/* <div className={`${styles.title} ml-8`}>
              Vice President, SGC ‘22
            </div> */}
            {currPage === "ug" || currPage === "pg" || currPage === "girl" ? (
              winner.map((wnr) => (
                <div className="flex mt-3 ml-8">
                  <Card person={wnr} isSenator={true} />
                </div>
              ))
            ) : (
              <div className="flex mt-3 md:ml-8 ml-0 justify-center">
                <Card person={winner} isSenator={false} />
              </div>
            )}
            <div className={`${styles.title} ml-8 mt-8 mb-8`}>Vote Count</div>
            <div>
              <Bar
                data={data}
                options={{
                  plugins: {
                    title: {
                      display: false,
                      text: "Number of Votes",
                    },
                    legend: {
                      display: false,
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {/* <StatsChart hostel={hostels} dept={depts}/> */}
    </>
  );
};
export default ResultsScreen;
