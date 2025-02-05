import {
  ADD_VOTE,
  DELETE_VOTE,
  DELETE_ALL_VOTES,
  POST_ALL_VOTES,
  GET_VOTE_COUNT,
  POST_VOTES,
} from "../constants";
import * as api from "../../api";

export const addVote = (id, pos) => {
  return { type: ADD_VOTE, payload: { id, pos } };
};

export const deleteVote = (id, pos) => {
  //pos = vicepresident, ug, pg etc.
  return { type: DELETE_VOTE, payload: { id, pos } };
};

export const deleteAllVotes = (pos) => {
  return { type: DELETE_ALL_VOTES, payload: { pos } };
};
export const getVoteCount = () => async (dispatch) => {
  try {
    const res = await api.getVoteCount();
    const data = await res.json();
    //console.log("BY position: ", data);
    dispatch({ type: GET_VOTE_COUNT, payload: data });
  } catch (error) {
    console.log("[getVoteCount action error] :", error.message);
  }
};

export const postAllVotes = (votes, id) => async (dispatch) => {
  try {
    //throw Error("this is error");
    const data = await api.postAllVotes(votes, id); //votes is an string with candidate id sample - "1,2,10,33"
    // const data = await res.json();
    console.log("[Post all votes response]", data);
    return { type: POST_ALL_VOTES, payload: { ...data, isShow: true } };
    //dispatch();
  } catch (err) {
    const data = {
      transactionHash: "",
      voterId: "",
      blockHash: "",
      gasUsed: "",
      isShow: false,
    };
    console.log("[Post all votes response]", data);
    return {
      type: POST_ALL_VOTES,
      payload: data,
    };
  }
};

export const postVotes = (votes, id) => async (dispatch) => {
  try {
    //throw Error("this is error");
    const data = await api.postVotes(votes, id);
    console.log("[post votes response] ", data);
    //dispatch({ type: POST_VOTES, payload: data });
    return { type: POST_VOTES, payload: data };
  } catch (err) {
    console.log("[postVotes action error] ", err.message);
    return { type: POST_VOTES, payload: err.message };
  }
};
