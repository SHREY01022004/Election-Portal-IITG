import React from "react";
import tick from "./tick.png"
const VoterId = (props) => {
    return(
        <div className="w-80">
            <div className="flex flex-col">
                <div className="flex flex-col mt-5 shadow-md rounded-2xl p-3 text-xl mb-5 font-atkinson text-gray-600 font-regular">
                     Here is your Voter ID
                </div>
                <div className="bg-greenBg flex flex-row justify-between items-center p-4 rounded-lg">
                    <div className="text-white font-bold text-xl font-atkinson">
                        {props.voterId}
                    </div>
                    <div className="w-8 h-8">
                        <img src={tick} alt="" />
                    </div>
                </div>
                <div className="text-sm text-center text-gray-500 text-roboto font-regular mt-2">
                    You may now write this down and enter this in your voting system
                </div>
                <div className="text-sm text-center text-pink-500 text-roboto font-regular mt-2">
                    If you forget this ID you will not be able to vote
                </div>
            </div>
        </div>
    )
}
export default VoterId;