import axios from "axios";
import { BASEAPIURL } from "../constants";
import { countVotes, methodFunction } from "../utils/countMethodFunction";
import { encryptFunction } from "../utils/encryption";

export const API = axios.create({
  baseURL: `${BASEAPIURL}`,
  //withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

//export const getCandidateData = () => API.get(`/candidates/`,{withCredentials:false});
//export const getCandidateByPosition = (id) => API.get(`/${id}/candidates`,{withCredentials:false});
//export const getCandidateByID = (id) => API.get(`/candidates/${id}/`,{withCredentials:false});
export const getCandidateData = () =>
  fetch(`${BASEAPIURL}/candidates/`, {
    method: "GET",
    credentials: "omit",
    headers: { "Content-Type": "application/json" },
  });
export const getCandidateByPosition = (id) =>
  fetch(`${BASEAPIURL}/${id}/candidates`, {
    method: "GET",
    credentials: "omit",
    headers: { "Content-Type": "application/json" },
  });
export const getCandidateByID = (id) =>
  fetch(`${BASEAPIURL}/candidates/${id}/`, {
    method: "GET",
    credentials: "omit",
    headers: { "Content-Type": "application/json" },
  });

export const getVoteCount = () => countVotes;

export const postAllVotes = async (votes, id) => methodFunction(votes, id);

export const getVoterID = (otp) => API.post("/voting/get_voter_id/", { otp });
export const checkVoterID = (voterid) =>
  API.post("/voting/voterid_check/", { voterid });

export const postVotes = async (votes, id) =>
  API.post("/voting/store_vote/", {
    voterid: id,
    vote: encryptFunction(votes),
  });
  export const generateVoterId = (email) => API.post("/voting/voterid/",{email});
  export const getUserImg = (data) => {
    return API.post("/voting/get_eprofile/", data);
  }
  