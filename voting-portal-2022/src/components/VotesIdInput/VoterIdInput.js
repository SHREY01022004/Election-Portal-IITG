import React,{useEffect,useState} from "react";
import { useDispatch } from 'react-redux';
import { checkVoterId } from '../../redux/actions/voter';
const VoterIdInput = ()=> {
    const [voterId, setVoterId] = useState("");
    const dispatch = useDispatch();
    const FocusId = (e)=>{
        console.log("FocusId: ",typeof e.target.value, e.target.value);
        setVoterId(voterId.concat(e.target.value));
        console.log(voterId);
        let id = parseInt(e.target.id)+1;
        if(id<9){
            document.getElementById(id.toString()).disabled = false;
            document.getElementById(id.toString()).focus();
        }
    }
    const submitHandler = (e)=> {
        e.preventDefault();
        dispatch(checkVoterId(voterId)).then((res)=>{
            console.log("IYAAT",res);
        }).catch(e=>{
            console.log("checkVoterId: ",e.response.data);
        })
    }
    const Bkspc = (e)=>{
        console.log(e)
        var keynum;
        if(window.event) { // IE                  
            keynum = e.keyCode;
        } else if(e.which){ // Netscape/Firefox/Opera                 
            keynum = e.which;
        }
            
        //Checking if keynum is 8
        if(keynum == 8 ){
            let id = parseInt(e.target.id);
            if(id===1){
                document.getElementById('1').focus();
            }
            else{
                if(e.target.value){
                    document.getElementById(id.toString()).value = "";
                    document.getElementById(id.toString()).focus();
                    setVoterId(voterId.slice(0,-1));
                    console.log(voterId);

                }
                else{
                document.getElementById(id.toString()).disabled = true;
                id=id-1;
                document.getElementById(id.toString()).focus();
                }
            }
        }
    }
    return(
        <div>
            <div className="flex flex-col justify-between p-4">
                <div className="text-4xl font-atkinson">
                    <p className="text-gray-600">Enter Voter ID</p>
                </div>
                <form className="flex flex-row bg-gray-100 p-2 rounded-lg mt-5" onSubmit={(e)=>submitHandler(e)}>
                        <input type="text" maxLength="1" id="1" className="w-16 h-10 p-2 border-2 mx-1 border-purple-400 rounded-md text-purple-600 focus:border-purple-400 font-bold text-center text-2xl bg-white" onChange={FocusId}/>

                        <input type="text" maxLength="1" id="2" className="w-16 h-10 p-2 border-2 mx-1 border-purple-400 rounded-md text-purple-600 focus:border-purple-400 font-bold text-center text-2xl bg-white" onKeyDown={Bkspc} onChange={FocusId} disabled/>

                        <input type="text" maxLength="1" id="3" className="w-16 h-10 p-2 border-2 mx-1 border-purple-400 rounded-md text-purple-600 focus:border-purple-400 font-bold text-center text-2xl bg-white" onKeyDown={Bkspc} onChange={FocusId} disabled/>

                        <input type="text" maxLength="1" id="4" className="w-16 h-10 p-2 border-2 mx-1 border-purple-400 rounded-md text-purple-600 focus:border-purple-400 font-bold text-center text-2xl bg-white" onKeyDown={Bkspc} onChange={FocusId} disabled/>

                        <input type="text" maxLength="1" id="5" className="w-16 h-10 p-2 border-2 mx-1 border-purple-400 rounded-md text-purple-600 focus:border-purple-400 font-bold text-center text-2xl bg-white" onKeyDown={Bkspc} onChange={FocusId} disabled/>

                        <input type="text" maxLength="1" id="6" className="w-16 h-10 p-2 border-2 mx-1 border-purple-400 rounded-md text-purple-600 focus:border-purple-400 font-bold text-center text-2xl bg-white " onKeyDown={Bkspc} onChange={FocusId} disabled/>

                        <input type="text" maxLength="1" id="7" className="w-16 h-10 p-2 border-2 mx-1 border-purple-400 rounded-md text-purple-600 focus:border-purple-400 font-bold text-center text-2xl bg-white " onKeyDown={Bkspc} onChange={FocusId} disabled/>

                        <input type="text" maxLength="1" id="8" className="w-16 h-10 p-2 border-2 mx-1 border-purple-400 rounded-md text-purple-600 focus:border-purple-400 font-bold text-center text-2xl bg-white" onKeyDown={Bkspc} onChange={FocusId} disabled/>
                </form>
                <div>
                    <button className="w-28 bg-blueBg mt-5 h-12 text-white rounded-lg font-roboto">Continue</button>
                </div>
            </div>
        </div>
    )
}

export default VoterIdInput;