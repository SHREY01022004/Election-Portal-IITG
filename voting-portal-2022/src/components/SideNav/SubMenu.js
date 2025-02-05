import React from "react";
import { NavLink, useParams } from "react-router-dom";
import styles from "./Sidebar.module.css";
const SubMenu = ({ item, index }) => {
  const { position } = useParams();
  return (
    <>
      {/* {item.subposts.length === 1 ? (
        // <NavLink
        //   className={
        //     position === item.subposts[0].path
        //       ? `${styles.sidebarLabel} ${styles.selected} rounded-md ml-1 p-3 py-2 text-lg flex justify-between text-black font-bold md:border-blue-700 md:border-l-4 md:border-b-0 md:border-t-0 md:border-r-0 md:text-blue-700 ${styles.electionBlue}`
        //       : `${styles.sidebarLabel} rounded-md p-3 py-2 ml-1 text-lg flex justify-between text-black font-bold md:flex`
        //   }
        //   style={{
        //     transition: "all 0.4s ease-out",
        //   }}
        //   to={item.subposts[0].path}
        // >
        //   <div>
        //     <span className={`${styles.sidebarLabel}`}>{item.title}</span>
        //   </div>
        // </NavLink>
        <></>
      ) : ( */}
      <div
        // className={
        //   subnav
        //     ? `${styles.sidebarLabel} cursor-pointer p-3 text-lg flex justify-between text-black rounded-md border font-bold md:border-blue-700 md:border-l-4 md:border-b-0 md:border-t-0 md:border-r-0 md:text-blue-700 ${styles.electionBlue}`
        //     : `${styles.sidebarLabel} cursor-pointer p-3 text-lg flex justify-between text-black rounded-md font-bold border md:flex`
        // }
        className={`${styles.sidebarLabel} p-3 text-lg ml-1 flex justify-between font-semibold md:flex`}
        style={{
          transition: "all 0.4s ease-out",
        }}
      >
        <div>
          <span className={`${styles.sidebarLabel}`}>{item.title}</span>
        </div>
      </div>
      {/* )} */}

      {item.subposts.map((item, index) => {
        console.log(item);
        return (
          <NavLink
            className={() =>
              position === item.path
                ? `${styles.dropdownLink} py-1 ml-1 rounded-md cursor-pointer hidden md:flex !text-[#2b00ff] font-semibold`
                : `${styles.dropdownLink} py-1 ml-1 rounded-md cursor-pointer hidden md:flex`
            }
            to={item.path}
            key={index}
          >
            <div
              className={
                position === item.path
                  ? `${styles.dropdownLink} ${styles.selected} rounded-md pl-0.25 bg-gray-700 !text-[#2b00ff] font-semibold`
                  : `${styles.dropdownLink} rounded-md pl-0.25 bg-gray-500`
              }
            >
              {item.title}
            </div>
          </NavLink>
        );
      })}
    </>
  );
};

export default SubMenu;
