import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import importantDates from "./reducers/importantDates";
import FAQ from "./reducers/faq";
import auth from "./reducers/auth";
import positions from "./reducers/positions";
import debates from "./reducers/debates";
import candidate from "./reducers/candidate";
import candidates from "./reducers/candidates";
import getStats from "./reducers/getStats"
import getUserImg from "./reducers/getUserImg";

const reducer = combineReducers({
  importantDates,
  FAQ,
  auth,
  positions,
  candidate,
  debates,
  candidates,
  getStats,
  getUserImg
});

const initialState = {};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
