import {
    GET_DEBATES,
    ADD_DEBATE,
    EDIT_DEBATE,
    DELETE_DEBATE,
  } from "../constants";
  import * as api from "../api";
  
  export const getDebates = () => async (dispatch) => {
    try {
        const data = await api.fetchDebates();
        dispatch({ type: GET_DEBATES, payload: data.data });
    } catch (error) {
        console.log(error.message);
    }
    };
    export const addDebate = (formData) => async (dispatch) => {
        try {
            console.log(formData);
            const { data } = await api.addDebate(formData);
            console.log(data);
            dispatch({ type: ADD_DEBATE, payload: data.data });
        } catch (error) {
            console.log(error.message);
        }
    };
    export const editDebate = (id, formData) => async (dispatch) => {
        try {
            console.log(id);
            const { data } = await api.editDebate(id, formData);
            console.log(data);
            dispatch({ type: EDIT_DEBATE, payload: data.data });
        } catch (error) {
            console.log(error.message);
        }
    };
    export const deleteDebate = (id) => async (dispatch) => {
        try {
            const { data } = await api.deleteDebate(id);
            dispatch({ type: DELETE_DEBATE, payload: id });
        } catch (error) {
            console.log(error.message);
        }
    };

  