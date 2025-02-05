import { GET_FAQS, ADD_FAQ, EDIT_FAQ, DELETE_FAQ } from "../constants";

const FAQ = (faqs = [], action) => {
  switch (action.type) {
    case GET_FAQS:
      return action.payload;
    case ADD_FAQ:
      return [...faqs, action.payload];
    case EDIT_FAQ:
      return [action.payload];
    case DELETE_FAQ:
      return faqs.filter((faq) => faq.id !== action.payload);
    default:
      return faqs;
  }
};

export default FAQ;
