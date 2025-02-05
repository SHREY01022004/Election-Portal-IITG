import {  VALIDAPI as API } from "../api";

export const signVote = async (vote, access_token = null) => {
  try {
    const res = await API.post(
      "/sign_vote/",
      { blinded_vote: vote.toString() },
      {
        headers: { Authorization: `JWT ${access_token}` },
      }
    );
    return { status: res.status, data: res.data, isError: false };
  } catch (err) {
    if (err.response) {
      return {
        status: err.response.status,
        data: err.response.data,
        isError: true,
      };
    } else if (err.request) {
      return { status: null, data: err.request, isError: true };
    } else {
      return { status: null, data: err.message, isError: true };
    }
  }
};
