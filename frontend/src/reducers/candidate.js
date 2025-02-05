import { SET_CANDIDATE_DATA } from "../constants";

const CANDIDATE = (candidate = {}, action) => {
  switch (action.type) {
    case SET_CANDIDATE_DATA:
      return {
        ...candidate,
        ...action.data,
      };
    default:
      return candidate;
  }
};

export default CANDIDATE;
