import { GET_USER_IMG } from "../constants";

const getUserImg = (userImg = null, action) => {
    switch (action.type) {
        case GET_USER_IMG:
          return action.payload;
        default:
          return userImg;
    }
}

export default getUserImg;