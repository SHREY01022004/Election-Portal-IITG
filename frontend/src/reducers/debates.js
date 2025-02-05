import {
    GET_DEBATES,
    ADD_DEBATE,
    EDIT_DEBATE,
    DELETE_DEBATE,    
} from "../constants";

const debates = (debates = [], action) => {
    switch (action.type) {
        case GET_DEBATES:
            return action.payload;
        case ADD_DEBATE:
            return [...debates, action.payload];
        case EDIT_DEBATE:
            return [action.payload];
        case DELETE_DEBATE:
            return debates.filter((debate) => debate.id !== action.payload);
        default:
            return debates;
    }
}

export default debates;