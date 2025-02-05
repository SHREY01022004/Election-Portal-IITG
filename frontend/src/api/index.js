import axios from "axios";
import { BASEURL, BASEAPIURL, VALIDAPIURL, ELECTIONAPI } from "../constants";

export const API = axios.create({
  baseURL: `${BASEAPIURL}`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const MULTIPARTAPI = axios.create({
  baseURL: `${BASEAPIURL}`,
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const VALIDAPI = axios.create({
  baseURL: `${VALIDAPIURL}`,
});

export const AUTH_API = axios.create({
  baseURL: `${ELECTIONAPI}/auth`,
  withCredentials: true,
});

export const fetchUserData = () => API.get("/profile");
export const verifyLogin = () => AUTH_API.get("/token/verify/");
export const userRegistration = (data) =>
  API.patch("/registration/complete/", data);
export const logout = () => AUTH_API.get("/logout/");

// Important Dates API
export const fetchImportantDates = () => API.get("/imp_dates");
export const addImportantDateAPI = (newDate) =>
  API.post("/imp_dates/", newDate);
export const editImportantDateAPI = (id, updateDate) =>
  API.put(`/imp_dates/${id}/`, updateDate);
export const deleteImportantDate = (id) => API.delete(`/imp_dates/${id}/`);

// FAQs API
export const fetchFAQs = () => API.get("/faqs");
export const addFAQ = (newFAQ) => API.post("/faqs/", newFAQ);
export const editFAQ = (id, updateFAQ) => API.put(`/faqs/${id}/`, updateFAQ);
export const deleteFAQ = (id) => API.delete(`/faqs/${id}/`);

//POS APIS
export const fetchPos = () => API.get("/positions");

//Candidate APIS
export const candidateRegistration = (data) => API.post("/candidates/", data);
export const updateCandidateData = (id, data) =>
  API.patch(`/candidates/${id}/`, data);
export const getCandidateDataAdmin = () => API.get(`/candidates/`);
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

export const getStats = () => {
  return API.get("/get_stats/");
};

export const getUserImg = (data) => {
  return API.post("/voting/get_eprofile/", data);
}

//credentials
export const uploadCredentials = (data) =>
  MULTIPARTAPI.post("/add_credentials/", data);
//Debates API
export const fetchDebates = () => API.get("/debates");
export const addDebate = (newDebate) => API.post("/debates/", newDebate);
export const editDebate = (id, updateDebate) =>
  API.put(`/debates/${id}/`, updateDebate);
export const deleteDebate = (id) => API.delete(`/debates/${id}/`);

export const generateVoterId = (email) => API.post("/voting/voterid/",{email});
