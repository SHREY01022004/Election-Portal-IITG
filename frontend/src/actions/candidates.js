import {
    GET_CANDIDATE_DATA,
    EDIT_CANDIDATE_DATA,
  } from "../constants";
  import * as api from "../api";
  
  export const getCandidateData = () => async (dispatch) => {
    try {
        const data = await api.getCandidateDataAdmin();
        dispatch({ type: GET_CANDIDATE_DATA, payload: data.data });
    } catch (error) {
        console.log(error.message);
    }
    };
    export const editCandidateData = (id, formData) => async (dispatch) => {
        try {
            console.log(id);
            const { data } = await api.updateCandidateData(id, formData);
            console.log("editCandidateData", data);
            dispatch({ type: EDIT_CANDIDATE_DATA, payload: data.data });
        } catch (error) {
            console.log(error.message);
        }
    };
  