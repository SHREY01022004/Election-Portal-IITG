import React from "react"
import styles from "./Loading.module.css"

const Loader = (props) =>{
    return(
        <div className="flex items-center  rounded-2xl ">
            <div className="text-lg font-atkinson mx-4 text-gray-700">
                {props.text}
            </div>
            <div class={styles.loader}>
            <div class={styles.circle}>
                <div></div>
            </div>
            </div>
        </div>
    )
}
export default Loader;