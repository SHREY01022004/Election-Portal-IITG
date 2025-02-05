import {
    GET_STATS
  } from "../constants";
  
  const getStats = (stats = null, action) => {
    switch (action.type) {
      case GET_STATS:
        return action.payload;
      default:
        return stats;
    }
  };
  
  export default getStats;
  