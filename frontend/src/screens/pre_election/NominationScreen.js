import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CardGallery from "../../components/Home/Gallery/CardGallery";
import FAQSection from "../../components/Home/FAQ/FAQSection";
import StepList from "../../components/Home/StepList/StepList";
import SideBarSection from "../../components/Home/SideNav/Sidebar";
import StickyBox from "react-sticky-box";
import { Helmet } from "react-helmet";
const NominationScreen = (props) => {
  return (
    <>
      <Helmet>
        <title>Nominations | Election Portal</title>
      </Helmet>
      {/* <StepList /> */}
      <div className="grid grid-cols-12 gap-4 lg:mr-12">
        <div className="mt-2 sm:mt-12 col-span-12 md:col-span-3">
          <StickyBox offsetTop={20} offsetBottom={20}>
            <SideBarSection posts={props.posts} />
          </StickyBox>
        </div>
        <div className="mt-2 sm:mt-12 col-span-12 md:col-span-9">
          <Routes>
            {props.posts.map((post) => {
              return post.subposts.map((subpost) => {
                return (
                  <Route
                    path={subpost.path}
                    element={<CardGallery persons={subpost.persons} />}
                  />
                );
              });
            })}
          </Routes>
        </div>
        {/* <div className="col-span-12 md:col-span-9">
          <FAQSection faq={props.faq} />
        </div> */}
      </div>
    </>
  );
};
export default NominationScreen;
