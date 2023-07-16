import { csrfFetch } from "./utils";

const ADD_ENTRY = "journey/entry/add";
const GET_ENTRIES = "journey/entries/get";
const SET_ENTRY = "journey/entry/set";
const DELETE_ENTRY = "journey/entry/delete";
const EDIT_ENTRY = "journey/entry/edit";
const SET_AVG_MOOD = "journey/mood/set";

const addEntry = (entry) => ({ type: ADD_ENTRY, payload: entry });
const getEntries = (entries) => ({ type: GET_ENTRIES, payload: entries });
export const setEntry = (entry) => ({ type: SET_ENTRY, payload: entry });
const removeEntry = (idAndType) => ({
  type: SET_ENTRY,
  payload: idAndType,
});
const editEntry = (entry) => ({ type: EDIT_ENTRY, payload: entry });
const getAvgMood = (avgMood) => ({ type: SET_AVG_MOOD, payload: avgMood });

export const createEntry = (entry, type) => async (dispatch) => {
  const res = await csrfFetch(`/api/journey/${type}`, {
    method: "POST",
    body: JSON.stringify(entry),
  });
  const data = await res.json();
  dispatch(addEntry(data));
};

export const deleteEntry = (id, type) => async (dispatch) => {
  const data = await (
    await csrfFetch(`/api/journey/${type}/${id}`, { method: "DELETE" })
  ).json();

  if (data.message === "success") {
    const entryType =
      type === "morning"
        ? 0
        : type === "evening"
        ? 1
        : type === "mood"
        ? 2
        : 3;
    dispatch(removeEntry({ id, entryType }));
  }
};

export const getEntry = (id, type) => async (dispatch) => {
  const data = await (
    await csrfFetch(`/api/journey/${type}/${id}`)
  ).json();

  dispatch(setEntry(data));
};

export const readEntries = () => async (dispatch) => {
  const data = await (await csrfFetch("/api/journey")).json();
  dispatch(getEntries(data));
};

export const updateEntry = (entry, type) => async (dispatch) => {
  const data = await (
    await csrfFetch(`/api/journey/${type}/${entry.id}`, {
      method: "PUT",
      body: JSON.stringify(entry),
    })
  ).json();

  dispatch(editEntry(data));
};

export const readAvgMood = () => async (dispatch) => {
  const data = await (await csrfFetch(`/api/journey/mood/avg`)).json();
  dispatch(getAvgMood(data));
};

const initialState = { avgMood: null, entries: [], entry: {} };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ENTRIES:
      return {
        avgMood: state.avgMood,
        entries: action.payload,
        entry: state.entry,
      };
    case ADD_ENTRY:
      return {
        avgMood: state.avgMood,
        entries: [action.payload, ...state.entries],
        entry: state.entry,
      };
    case SET_ENTRY:
      return {
        avgMood: state.avgMood,
        entries: [...state.entries],
        entry: action.payload,
      };
    case DELETE_ENTRY:
      return {
        avgMood: state.avgMood,
        entries: [...state.entries].filter(
          (e) =>
            /* eslint-disable */
            e.id != action.payload.id &&
            e.entryType != action.payload.entryType
        ),
        entry: {},
      };
    case EDIT_ENTRY:
      return {
        avgMood: state.avgMood,
        entries: [...state.entries].map((e) => {
          if (
            e.id == action.payload.id &&
            e.entryType == action.payload.entryType
          ) {
            return action.payload;
          } else {
            return e;
          }
        }),
        entry: action.payload,
      };
    case SET_AVG_MOOD:
      return { ...state, avgMood: action.payload };
    default:
      return state;
  }
};

export default reducer;
