import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import * as RiIcons from "react-icons/ri";
import styles from "./Sidebar.module.css";
const SubMenu = ({ item, index }) => {

  const checkOpen = () => {
    const postType = item.title;
    const subPostType = window.location.pathname.split("/")[3];
    if (!postType || !subPostType || postType==="Vice President") return false;
    else if (
      (postType === "Senator" && ["ug", "girl", "pg"].includes(subPostType)) ||
      (postType === "Board Secretary" &&
        ["sports", "welfare", "technical","hab","swc","sail","cultural"].includes(subPostType))
    )
      return true;
  };

  const [subnav, setSubnav] = useState(checkOpen());

  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      {item.subposts.length === 1 ? (
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${styles.sidebarLabel} p-3 text-lg flex justify-between text-black rounded-md border font-bold md:border-blue-700 md:border-l-4 md:border-b-0 md:border-t-0 md:border-r-0 md:text-blue-700 ${styles.electionBlue}`
              : `${styles.sidebarLabel} p-3 text-lg flex justify-between text-black rounded-md font-bold border md:flex`
          }
          style={{
            transition: "all 0.4s ease-out",
          }}
          to={item.subposts[0].path}
          onClick={
            item.subposts.length > 0 && item.subposts[0].title && showSubnav
          }
          activeClassName="decoration-blue-500 md:border-4 md:border-blue-600 md:text-blue-600 md:text-blue-600"
        >
          <div>
            <span className={`${styles.sidebarLabel}`}>{item.title}</span>
          </div>
          <div>
            {item.subposts.length > 0 && subnav ? (
              <div>
                <RiIcons.RiArrowUpSFill />
              </div>
            ) : item.subposts.length > 0 && item.subposts[0].title ? (
              <div>
                <RiIcons.RiArrowDownSFill />
              </div>
            ) : null}
          </div>
        </NavLink>
      ) : (
        <div
          // className={
          //   subnav
          //     ? `${styles.sidebarLabel} cursor-pointer p-3 text-lg flex justify-between text-black rounded-md border font-bold md:border-blue-700 md:border-l-4 md:border-b-0 md:border-t-0 md:border-r-0 md:text-blue-700 ${styles.electionBlue}`
          //     : `${styles.sidebarLabel} cursor-pointer p-3 text-lg flex justify-between text-black rounded-md font-bold border md:flex`
          // }
          className={`${styles.sidebarLabel} cursor-pointer p-3 text-lg flex justify-between text-black rounded-md font-bold border md:flex`}
          style={{
            transition: "all 0.4s ease-out",
          }}
          onClick={
            item.subposts.length > 0 && item.subposts[0].title && showSubnav
          }
          activeClassName="decoration-blue-500 md:border-4 md:border-blue-600 md:text-blue-600 md:text-blue-600"
        >
          <div>
            <span className={`${styles.sidebarLabel}`}>{item.title}</span>
          </div>
          <div>
            {item.subposts.length > 0 && subnav ? (
              <div>
                <RiIcons.RiArrowUpSFill />
              </div>
            ) : item.subposts.length > 0 && item.subposts[0].title ? (
              <div>
                <RiIcons.RiArrowDownSFill />
              </div>
            ) : null}
          </div>
        </div>
      )}

      {subnav &&
        item.subposts.map((item, index) => {
          return (
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? `${styles.dropdownLink} cursor-pointer border-l-4 border-[#2b00ff] hidden md:flex !text-[#2b00ff] font-semibold`
                  : `${styles.dropdownLink} cursor-pointer border hidden md:flex`
              }
              to={item.path}
              key={index}
            >
              <div
                className={({ isActive }) =>
                  isActive
                    ? `${styles.dropdownLink} border-b-2 rounded-md bg-gray-500 !text-[#2b00ff] font-semibold`
                    : `${styles.dropdownLink} border-b-2 rounded-md bg-gray-500`
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
