import { csrfFetch } from "./utils";

const ADD_ENTRY = "journey/entry/add";
const GET_ENTRIES = "journey/entries/get";

const addEntry = (entry) => ({ type: ADD_ENTRY, payload: entry });
const getEntries = (entries) => ({ type: GET_ENTRIES, payload: entries });

export const createEntry = (entry, type) => async (dispatch) => {
  console.log({ entry });
  const res = await csrfFetch(`/api/journey/${type}`, {
    method: "POST",
    body: JSON.stringify(entry),
  });
  const data = await res.json();
  console.log(data);
  dispatch(addEntry(data));
};

export const readEntries = () => async (dispatch) => {
  const data = await (await csrfFetch("api/journey")).json();
  dispatch(getEntries(data));
};

const initialState = { entries: [] };

const reducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_ENTRIES:
      return { entries: action.payload };
    case ADD_ENTRY:
      newState = { ...state };
      newState.entries.push(action.payload);
      return newState;
    default:
      return state;
  }
};

export default reducer;
