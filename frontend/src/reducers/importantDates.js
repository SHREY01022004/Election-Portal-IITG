import {
  GET_IMPORTANT_DATES,
  ADD_IMPORTANT_DATE,
  EDIT_IMPORTANT_DATE,
  DELETE_IMPORTANT_DATE,
} from "../constants";

const importantDates = (dates = [], action) => {
  switch (action.type) {
    case GET_IMPORTANT_DATES:
      return action.payload;
    case ADD_IMPORTANT_DATE:
      return [...dates, action.payload];
    case EDIT_IMPORTANT_DATE:
      return [action.payload];
    case DELETE_IMPORTANT_DATE:
      return dates.filter((date) => date.id !== action.payload);
    default:
      return dates;
  }
};

export default importantDates;
