import { GET_USER } from "../constants";
import * as api from "../api";

function deleteAllCookies() {
  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}

export const getUser = () => async (dispatch) => {
  try {
    const data = await api.fetchUserData();
    // data.data.euser.roll_number = data.data.last_name;
    dispatch({ type: GET_USER, payload: data.data });
  } catch (error) { 
    console.log(error.message);
  }
};

export const logout = () => async (dispatch) => {
  try {
    const data = await api.logout();
    dispatch({ type: GET_USER, payload: null });
    localStorage.clear();
    deleteAllCookies();
  } catch (error) {
    console.log(error.message);
  }
};
