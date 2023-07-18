import { csrfFetch } from "./utils";

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";
const TOGGLE_MUTE = "session/toggleMute";

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

const setMute = () => ({ type: TOGGLE_MUTE });

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

export const restoreUser =
  (redirect = true) =>
  async (dispatch) => {
    const res = await csrfFetch("/api/session");
    const data = await res.json();

    dispatch(setUser(data.user));

    if (redirect && data.user == null) {
      window.location.href = "/login";
    }

    return !data;
  };

export const toggleMute = () => async (dispatch) => {
  await (
    await csrfFetch("/api/session", { method: "PUT" })
  ).json;

  dispatch(setMute());
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload };
    case REMOVE_USER:
      return { user: null };
    case TOGGLE_MUTE:
      return { user: { ...state.user, mute: !state.user.mute } };
    default:
      return state;
  }
};

export default sessionReducer;
