import {
  GET_IMPORTANT_DATES,
  ADD_IMPORTANT_DATE,
  EDIT_IMPORTANT_DATE,
  DELETE_IMPORTANT_DATE,
} from "../constants";
import * as api from "../api";

export const getImportantDates = () => async (dispatch) => {
  try {
    const data = await api.fetchImportantDates();
    dispatch({ type: GET_IMPORTANT_DATES, payload: data.data });
  } catch (error) {
    console.log(error.message);
  }
};

export const addImportantDate = (formData) => async (dispatch) => {
  try {
    console.log(formData);
    const { data } = await api.addImportantDateAPI(formData);
    console.log(data);
    dispatch({ type: ADD_IMPORTANT_DATE, payload: data.data });
  } catch (error) {
    console.log(error.message);
  }
};

export const editImportantDate = (id, formData) => async (dispatch) => {
  try {
    console.log(id);
    const { data } = await api.editImportantDateAPI(id, formData);
    console.log(data);
    dispatch({ type: EDIT_IMPORTANT_DATE, payload: data.data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteImportantDate = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteImportantDate(id);
    dispatch({ type: DELETE_IMPORTANT_DATE, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};
