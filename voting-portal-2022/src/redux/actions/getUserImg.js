import {
    GET_USER_IMG
  } from "../constants";
  import * as api from "../../api";
  
  const getUserImg = (d) => async (dispatch) => {
    try {
        // console.log("d:", d);
      const data = await api.getUserImg(d);
      dispatch({ type: GET_USER_IMG, payload: data.data });
    } catch (error) {
      console.log(error.message);
    }
  };
  export default getUserImg;