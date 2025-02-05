import React from "react";
import { SidebarData } from "./SidebarData";
import styles from "./Sidebar.module.css";
import SubMenu from "./SubMenu";

const Sidebar = (props) => {
  return (
    <div className="shadow-lg m-3 rounded-2xl">
      {props.posts.map((item, index) => {
        return <SubMenu item={item} key={index} />;
      })}
    </div>
  );
};

export default Sidebar;
