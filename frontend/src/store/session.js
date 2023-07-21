import { csrfFetch } from "./utils";

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";
const TOGGLE_MUTE = "session/toggleMute";
const ADD_ENTRY = "session/addEntry";
const MINUS_ENTRY = "session/minusEntry";

const setUser = (user) => ({ type: SET_USER, payload: user });

const removeUser = () => ({ type: REMOVE_USER });

export const addEntry = (entry) => ({
  type: ADD_ENTRY,
  payload: entry,
});

const setMute = () => ({ type: TOGGLE_MUTE });
const minusOneEntry = (type) => ({ type: MINUS_ENTRY, payload: type });

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
  await csrfFetch("/api/session", { method: "PUT" });
  dispatch(setMute());
};

export const deleteEntry = (type, id, sameDay) => async (dispatch) => {
  await csrfFetch(`/api/journey/${type}/${id}`, { method: "DELETE" });
  if (sameDay) {
    dispatch(minusOneEntry(type));
  }
  return null;
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
    case ADD_ENTRY:
      if (action.payload) {
        return {
          user: { ...state.user, ...action.payload },
        };
      } else return state;
    case MINUS_ENTRY:
      if (action.payload === "morning") {
        return {
          user: {
            ...state.user,
            hasDayEntryToday: state.user.hasDayEntryToday - 1,
          },
        };
      }
      if (action.payload === "evening") {
        return {
          user: {
            ...state.user,
            hasNightEntryToday: state.user.hasNightEntryToday - 1,
          },
        };
      }
      return state;
    default:
      return state;
  }
};

export default sessionReducer;
