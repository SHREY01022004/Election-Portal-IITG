import { SET_VOTERID_VALID, CHECK_VOTERID } from "../constants";

const initialState = {
  isVoterIdValid: false,
  voterId: "",
  gender: "",
  degree: "",
};

const voterInfo = (voterId = initialState, action) => {
  switch (action.type) {
    case SET_VOTERID_VALID:
      return {
        ...voterId,
        isVoterIdValid: action.payload?.isValid,
        voterId: action.payload?.voterId,
      };
    case CHECK_VOTERID:
      return {
        ...voterId,
        gender: action.payload?.gender,
        isVoterIdValid: action.payload?.isVoterIdValid,
        degree: action.payload?.degree,
        voterId: action.payload?.voterId,
      };
    default:
      return voterId;
  }
};

export default voterInfo;
