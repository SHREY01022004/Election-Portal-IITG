import React from "react"
import styles from "./Loading.module.css"

const Loading = (props) =>{
    return(
        <div className="flex flex-row items-center w-96 rounded-lg ">
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
export default Loading;