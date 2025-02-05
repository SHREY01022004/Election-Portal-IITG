import React from "react"
const OtpInput = ()=> {
    return(
        <div className="w-80">
            <div className="flex flex-col items-center justify-between p-4">
                <div className="text-4xl font-atkinson">
                    <p className="text-gray-600">Enter Your OTP</p>
                </div>
                <div>
                    <input type="text" className="w-64 h-12 p-2 border-2 mt-5 border-purple-400 rounded-md text-purple-600 focus:border-purple-400 font-bold text-center text-2xl " />
                </div>
                <div>
                    <button className="w-64 bg-blueBg mt-5 h-12 text-white rounded-lg font-roboto">Continue</button>
                </div>
            </div>
        </div>
    )
}

export default OtpInput;