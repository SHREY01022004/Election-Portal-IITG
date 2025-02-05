import { GET_USER, LOGOUT } from "../constants";

const FAQ = (userData = null, action) => {
  switch (action.type) {
    case GET_USER:
      return action.payload;
    case LOGOUT:
      return action.payload;
    default:
      return userData;
  }
};

export default FAQ;
