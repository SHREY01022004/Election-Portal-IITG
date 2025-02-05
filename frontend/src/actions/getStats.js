import {
    GET_STATS
  } from "../constants";
  import * as api from "../api";
  
  const getStats = () => async (dispatch) => {
    try {
      const data = await api.getStats();
      dispatch({ type: GET_STATS, payload: data.data });
    } catch (error) {
      console.log(error.message);
    }
  };
  export default getStats;