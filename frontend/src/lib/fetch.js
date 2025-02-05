import { VALIDAPI as API } from "../api";

export const getNEpair = async (access_token = null) => {
  try {
    const res = await API.get("/retrieve_ne_pair/", {
      headers: { Authorization: `JWT ${access_token}` },
    });
    return { status: res.status, data: res.data, isError: false };
  } catch (err) {
    if (err.response) {
      return {
        status: err.response.status,
        data: err.response.data.detail,
        isError: true,
      };
    } else if (err.request) {
      return { status: null, data: err.request, isError: true };
    } else {
      return { status: null, data: err.message, isError: true };
    }
  }
};
