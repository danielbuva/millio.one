import { csrfFetch } from "./utils";

const ADD_ENTRY = "journey/entry/add";
const GET_ENTRIES = "journey/entries/get";
const SET_ENTRY = "journey/entry/set";
const DELETE_ENTRY = "journey/entry/delete";
const EDIT_ENTRY = "journey/entry/edit";

const addEntry = (entry) => ({ type: ADD_ENTRY, payload: entry });
const getEntries = (entries) => ({ type: GET_ENTRIES, payload: entries });
export const setEntry = (entry) => ({ type: SET_ENTRY, payload: entry });
const removeEntry = (idAndType) => ({
  type: SET_ENTRY,
  payload: idAndType,
});
const editEntry = (entry) => ({ type: EDIT_ENTRY, payload: entry });

export const createEntry = (entry, type) => async (dispatch) => {
  const res = await csrfFetch(`/api/journey/${type}`, {
    method: "POST",
    body: JSON.stringify(entry),
  });
  const data = await res.json();
  console.log(data);
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

const initialState = { entries: [], entry: {} };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ENTRIES:
      return { entries: action.payload, entry: state.entry };
    case ADD_ENTRY:
      return {
        entries: [action.payload, ...state.entries],
        entry: state.entry,
      };
    case SET_ENTRY:
      return { entries: [...state.entries], entry: action.payload };
    case DELETE_ENTRY:
      return {
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
    default:
      return state;
  }
};

export default reducer;
