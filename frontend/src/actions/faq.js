import { GET_FAQS, ADD_FAQ, EDIT_FAQ, DELETE_FAQ } from "../constants";
import * as api from "../api";

export const getFaq = () => async (dispatch) => {
  try {
    const data = await api.fetchFAQs();
    dispatch({ type: GET_FAQS, payload: data.data });
  } catch (error) {
    console.log(error.message);
  }
};

export const addFAQ = (formData) => async (dispatch) => {
  try {
    console.log(formData);
    const { data } = await api.addFAQ(formData);
    console.log(data);
    dispatch({ type: ADD_FAQ, payload: data.data });
  } catch (error) {
    console.log(error.message);
  }
};

export const editFAQ = (id, formData) => async (dispatch) => {
  try {
    console.log(id);
    const { data } = await api.editFAQ(id, formData);
    console.log(data);
    dispatch({ type: EDIT_FAQ, payload: data.data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteFAQ = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteFAQ(id);
    dispatch({ type: DELETE_FAQ, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};
