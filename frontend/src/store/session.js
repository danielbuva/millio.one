import { csrfFetch } from "./utils";

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

export const login = (body) => async (dispatch) => {
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify(body),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const signup = (body) => async (dispatch) => {
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify(body),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch("/api/session", {
    method: "DELETE",
  });
  dispatch(removeUser());
  return response;
};

export const restoreUser = () => async (dispatch) => {
  const res = await csrfFetch("/api/session");
  const data = await res.json();

  dispatch(setUser(data.user));

  if (data.user == null) {
    window.location.href = "/login";
  }

  return !data;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
