import React from "react";
import rules from "../../assets/elections_rules.pdf";
import styles from "../../components/Home/Register/Register.module.css";
import rules_vector from "../../assets/rules_vector.png";
import { Helmet } from "react-helmet";
import FAQSection from "../../components/Home/FAQ/FAQSection";

const RulesScreen = (props) => {
  return (
    <>
      <Helmet>
        <title>Rules | Election Portal</title>
      </Helmet>
      <div className="w-full" style={{ minHeight: "30vh" }}>
        <div className={`${styles.cont} w-full md:w-4/6 px-2 md:p-0 `}>
          <div className={styles.regCont}>
            <div className={`${styles.reg}`}>
              <span className="pt-3 pr-3 leading-7">
                Comprehensive rules and regulations for candidates and voters
                for the upcoming Gymkhana Elections 2024.
              </span>
              <div className={styles.btns}>
                {/* <button
                  className={`${styles.nomBtn} bg-blue-700 hover:bg-blue-800 bg-coolGray-50 text-[14px] text-white font-medium py-2 px-6 rounded border-2`}
                >
                  <a
                    // href="https://elections.swciitg.in/"
                    href="rules/#"
                    // target="_blank"
                    rel="noreferrer"
                  >
                    Open rules
                  </a>
                </button> */}
                <button
                  className={`${styles.nomBtn} hover:bg-gray-300 bg-coolGray-50 text-[14px] font-medium py-2 px-6 rounded border-2`}
                  //onClick={routeChange2}
                >
                  <a href={rules} download>
                    Download
                  </a>
                </button>
              </div>
            </div>
            <div className="hidden sm:block">
              <img src={rules_vector} alt="rules icon" />
            </div>
          </div>
        </div>
        <div className="w-full md:w-4/6">
          <FAQSection faq={props.faq} />
        </div>
      </div>
    </>
  );
};
export default RulesScreen;
