import React, { useEffect } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import AboutScreen from "./AboutScreen";
import NominationScreen from "./NominationScreen";
import BlockchainMessage from "../../components/Home/BlockchainMessage/BlockchainMessage";
import HomeRouteNavBar from "../../components/Home/HomeRouteNavbar/HomeRouteNavBar";
import StatsScreen from "./StatsScreen";
import RulesScreen from "./RulesScreen";
import OrganisersScreen from "./OrganisersScreen";
import ResultsScreen from "./ResultsScreen";
import Footer from "../../components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getCandidateFromPosition } from "../../actions/positions";
import CandidateNominationScreen from "./CandidateNominationScreen";

const Layout = () => {
  return (
    <>
      <div
        style={{
          minHeight: "83vh",
        }}
      >
        <BlockchainMessage />
        <div className="mt-5 ml-1 mr-1 md:ml-16 md:mr-10">
          <HomeRouteNavBar />
        </div>
        <div
          className="mt-12  ml-1 mr-1 md:ml-16 md:mr-10"
          style={{ maxWidth: "1240px" }}
        >
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
};

const position_ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

const PreElectionScreen = () => {
  const positions = useSelector((store) => store.positions);
  const dispatch = useDispatch();

  useEffect(() => {
    position_ids.forEach((pos) => {
      dispatch(getCandidateFromPosition(pos));
    });
  }, []);

  let all_positions = {};

  positions.forEach((pos) => {
    if (Array.isArray(pos.data)) all_positions[`${pos.id}`] = pos.data;
    else all_positions[`${pos.id}`] = [];
  });

  let posts = [
    {
      title: "Vice President",
      subposts: [
        {
          title: "",
          path: "vicepresident",
          persons: all_positions["1"],
        },
      ],
    },
    {
      title: "Board Secretary",
      subposts: [
        {
          title: "Sports",
          path: "sports",
          persons: all_positions["6"],
        },
        {
          title: "Welfare",
          path: "welfare",
          persons: all_positions["3"],
        },
        {
          title: "Technical",
          path: "technical",
          persons: all_positions["5"],
        },
        {
          title: "HAB",
          path: "hab",
          persons: all_positions["2"],
        },
        {
          title: "Sail",
          path: "sail",
          persons: all_positions["7"],
        },
        {
          title: "SWC",
          path: "swc",
          persons: all_positions["4"],
        },
        {
          title: "Cultural",
          path: "cultural",
          persons: all_positions["9"],
        },
      ],
    },
    {
      title: "Senator",
      subposts: [
        {
          title: "UG Senator",
          path: "ug",
          persons: all_positions["8"],
        },
        {
          title: "PG Senator",
          path: "pg",
          persons: all_positions["10"],
        },
        {
          title: "Girl Senator",
          path: "girl",
          persons: all_positions["11"],
        },
      ],
    },
  ];

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" exact element={<AboutScreen />} />
        <Route
          path="/nominations"
          exact
          element={<Navigate to="/nominations/vicepresident" />}
        />
        <Route
          path="nominations/*"
          exact
          element={<NominationScreen posts={posts} faq={[]} />}
        />
        <Route path="stats" exact element={<StatsScreen />} />
        {/* <Route
              path="results/*"
              exact
              element={<ResultsScreen posts={posts} />}
            /> */}
        <Route path="rules" exact element={<RulesScreen faq={[]} />} />
        <Route path="organisers" exact element={<OrganisersScreen />} />
      </Route>
      <Route
        path="/candidate/:id/:name"
        exact
        element={<CandidateNominationScreen />}
      />
    </Routes>
  );
};

export default PreElectionScreen;
