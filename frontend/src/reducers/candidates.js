import {
    GET_CANDIDATE_DATA,
    EDIT_CANDIDATE_DATA,    
} from "../constants";

const candidates = (candidate = [], action) => {
    switch (action.type) {
        case GET_CANDIDATE_DATA:
            return action.payload;
        case EDIT_CANDIDATE_DATA:
            return [...candidate, action.payload];
        default:
            return candidate;
    }
}

export default candidates;