import React, { useRef, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import styles from "./RouteNavbar.module.css";
const RouteNavbar = (props) => {
  const mobNav = useRef();
  const mobNavActive = useRef();
  const nabDiv = useRef();

  const activeClassFunc = ({ isActive },text) => {
    const activeTabType = window.location.pathname.split("/")[2];
    if(activeTabType==="nominations" && text==="Nominations"){
      return `${styles.link} ${styles.active}`;
    }
    if (isActive) {
      return `${styles.link} ${styles.active}`;
    }
    return styles.link;
  };
  const activeClassFunc2 = ({ isActive },text) => {
    const activeTabType = window.location.pathname.split("/")[2];
    if (activeTabType === "nominations" && text === "Nominations") {
      return `${styles.link} ${styles.active}`;
    }
    if (isActive) {
      return `${styles.link} ${styles.active}`;
    }
    return `hidden`;
  };

  const width = props.mobWidth;

  const HamburgerClickListener = () => {
    var el = mobNav.current;
    let el2 = mobNavActive.current;
    let nd = nabDiv.current;

    if (el.classList.contains("hidden")) {
      el.classList.remove("hidden");
      el2.classList.add("hidden");
      nd.classList.remove(width);
      props.onOpenMenu();
    } else {
      el.classList.add("hidden");
      el2.classList.remove("hidden");
      nd.classList.add(width);
      props.onCloseMenu();  
    }
  };

  let linksDesktop = [];
  for(let i=0; i<props.text.length; i++){
      linksDesktop = [...linksDesktop, <NavLink id={i} className={(el)=>activeClassFunc(el,props.text[i])} to={`${props.routes[i]}`}> {props.text[i]} </NavLink>]
  }
  let linksMob = [];
  for(let i=0; i<props.text.length; i++){
    linksMob = [...linksMob, <NavLink id={i} className={(el)=>activeClassFunc2(el,props.text[i])} to={`${props.routes[i]}`}> {props.text[i]} </NavLink>]
}
  return (
    <div className={`${styles.routeNavbar} relative pl-1 sm:pl-5`}>
      {props.children}
      <div className={`${styles.links} hidden md:flex mt-4`}>
        {linksDesktop}
      </div>

      <div className={`${width} flex md:hidden ${styles.linkCont}`} ref={nabDiv}>
        <div className="flex flex-col">
          <div className={`flex flex-col`} ref={mobNavActive}>
            {linksMob}
          </div>
          <div className={`flex flex-col hidden`} ref={mobNav}>
            {linksDesktop}
          </div>
        </div>
        <div className="flex flex-col mt-4 pb-4 ml-auto">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="self-end mr-6"
            onClick={HamburgerClickListener}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1 2.75C1 2.55109 1.07902 2.36032 1.21967 2.21967C1.36032 2.07902 1.55109 2 1.75 2H14.25C14.4489 2 14.6397 2.07902 14.7803 2.21967C14.921 2.36032 15 2.55109 15 2.75C15 2.94891 14.921 3.13968 14.7803 3.28033C14.6397 3.42098 14.4489 3.5 14.25 3.5H1.75C1.55109 3.5 1.36032 3.42098 1.21967 3.28033C1.07902 3.13968 1 2.94891 1 2.75ZM1 7.75C1 7.55109 1.07902 7.36032 1.21967 7.21967C1.36032 7.07902 1.55109 7 1.75 7H14.25C14.4489 7 14.6397 7.07902 14.7803 7.21967C14.921 7.36032 15 7.55109 15 7.75C15 7.94891 14.921 8.13968 14.7803 8.28033C14.6397 8.42098 14.4489 8.5 14.25 8.5H1.75C1.55109 8.5 1.36032 8.42098 1.21967 8.28033C1.07902 8.13968 1 7.94891 1 7.75ZM1.75 12C1.55109 12 1.36032 12.079 1.21967 12.2197C1.07902 12.3603 1 12.5511 1 12.75C1 12.9489 1.07902 13.1397 1.21967 13.2803C1.36032 13.421 1.55109 13.5 1.75 13.5H14.25C14.4489 13.5 14.6397 13.421 14.7803 13.2803C14.921 13.1397 15 12.9489 15 12.75C15 12.5511 14.921 12.3603 14.7803 12.2197C14.6397 12.079 14.4489 12 14.25 12H1.75Z"
              fill="#2E2F2F"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
export default RouteNavbar;
