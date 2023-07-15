import { csrfFetch } from "./utils";

const ADD_ENTRY = "journey/mood/add";

const addEntry = (entry) => {
  return {
    type: ADD_ENTRY,
    payload: entry,
  };
};

export const createEntry = (entry, type) => async (dispatch) => {
  const response = await csrfFetch(`/api/journey/${type}`, {
    method: "POST",
    body: JSON.stringify(entry),
  });
  const data = await response.json();
  console.log(data);
  dispatch(addEntry(data));
};

const initialState = { entries: [] };

const reducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case ADD_ENTRY:
      newState = { ...state };
      newState.entries.push(action.payload);
      return newState;
    default:
      return state;
  }
};

export default reducer;
