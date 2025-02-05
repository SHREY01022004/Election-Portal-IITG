import { GET_POS, GET_CANDIDATE_FROM_POS } from "../constants";

const POS = (positons = [], action) => {
  switch (action.type) {
    case GET_POS:
      return action.payload;
    case GET_CANDIDATE_FROM_POS:
      // console.log(action.payload);
      return [...positons, action.payload];
    default:
      return positons;
  }
};

export default POS;
