import {
  GET_ALL_CANDIDATES,
  GET_CANDIDATE_BY_ID,
  GET_CANDIDATE_BY_POS,
} from "../constants";
import * as api from "../../api";
import { shuffle } from "../../utils/shuffleArray";

export const getAllCandidates = () => async (dispatch) => {
  try {
    const res = await api.getCandidateData();
    const data = await res.json();
    console.log("all cand: ", data);
    dispatch({ type: GET_ALL_CANDIDATES, payload: data });
  } catch (error) {
    console.log("getAllCandidates action error: ", error.message);
  }
};

export const getCandidateByPos = (id, pos) => async (dispatch) => {
  try {
    const res = await api.getCandidateByPosition(id);
    const data = await res.json();
    const shuffledData = shuffle(data);
    //console.log("BY position: ", data);
    dispatch({
      type: GET_CANDIDATE_BY_POS,
      payload: { data: shuffledData, pos },
    });
  } catch (error) {
    console.log("getCandidateByPos action error: ", error.message);
  }
};
