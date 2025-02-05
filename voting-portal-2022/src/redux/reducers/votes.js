import {
  ADD_VOTE,
  DELETE_VOTE,
  DELETE_ALL_VOTES,
  POST_ALL_VOTES,
  GET_VOTE_COUNT,
  POST_VOTES,
} from "../constants";
import { removeByValue } from "../../utils/removeByValue";
import { posIdtoNotaId } from "../../constants";

const initialState = {
  vicepresident: 0,
  sports: 0,
  welfare: 0,
  technical: 0,
  hab: 0,
  sail: 0,
  swc: 0,
  cultural: 0,
  ug: [],
  pg: [],
  girl: [],
  err: "",
};

const votes = (votes = initialState, action) => {
  const updatedVotes = { ...votes };
  const pos = action.payload?.pos;
  let id = action.payload?.id;
  const data = action.payload?.data;

  switch (action.type) {
    case ADD_VOTE:
      if (pos === "ug" || pos === "pg" || pos === "girl") {
        if (pos === "girl") {
          if (updatedVotes[pos].length < 3) {
            if ([...updatedVotes[pos]].includes(posIdtoNotaId[pos]))
              updatedVotes[pos] = [];
            updatedVotes[pos] = [...updatedVotes[pos], id];
          } else {
            updatedVotes.err = "You can only vote for 3 candidates";
          }
        } else {
          if (updatedVotes[pos].length < 7) {
            if ([...updatedVotes[pos]].includes(posIdtoNotaId[pos]))
              updatedVotes[pos] = [];
            updatedVotes[pos] = [...updatedVotes[pos], id];
          } else {
            updatedVotes.err = "You can only vote for 7 candidates";
          }
        }
      } else {
        updatedVotes[pos] = id;
      }
      console.log(updatedVotes);
      return updatedVotes;

    case DELETE_VOTE:
      if (pos === "ug" || pos === "pg" || pos === "girl") {
        const arr = [...updatedVotes[pos]];
        updatedVotes[pos] = removeByValue(arr, id);
      } else {
        updatedVotes[pos] = 0;
      }
      console.log(updatedVotes);
      return updatedVotes;

    case DELETE_ALL_VOTES:
      const newId = posIdtoNotaId[pos] * 1;
      if (pos === "ug" || pos === "pg" || pos === "girl") {
        updatedVotes[pos] = [newId];
      } else {
        updatedVotes[pos] = newId;
      }
      console.log("[From delete all votes]", updatedVotes);
      return updatedVotes;

    case POST_ALL_VOTES:
      return initialState;

    case GET_VOTE_COUNT:
      return initialState;
    case POST_VOTES:
      return initialState;
    default:
      return votes;
  }
};

export default votes;
