import {
  GET_ALL_CANDIDATES,
  GET_CANDIDATE_BY_ID,
  GET_CANDIDATE_BY_POS,
} from "../constants";

const initialState = {
  all: [],
};

const candidates = (candidates = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CANDIDATES:
      return { ...candidates, all: action.payload };
    case GET_CANDIDATE_BY_POS:
      const updatedCandidates = { ...candidates };
      updatedCandidates[action.payload.pos] = action.payload.data;
      return updatedCandidates;
    default:
      return candidates;
  }
};

export default candidates;
