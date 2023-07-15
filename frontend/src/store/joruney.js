import { csrfFetch } from "./utils";

const ADD_MOOD = "journey/mood/add";

const addMood = (entry) => {
  return {
    type: ADD_MOOD,
    payload: entry,
  };
};

export const createMood = (mood) => async (dispatch) => {
  const response = await csrfFetch("/api/journey/mood", {
    method: "POST",
    body: JSON.stringify(mood),
  });
  const data = await response.json();
  console.log(data);
  dispatch(addMood(data));
};

const initialState = { entries: [] };

const reducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case ADD_MOOD:
      newState = { ...state };
      newState.entries.push(action.payload);
      return newState;
    default:
      return state;
  }
};

export default reducer;
