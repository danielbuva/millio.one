import { addEntry } from "./session";
import { csrfFetch } from "./utils";

const GET_ENTRIES = "journey/entries/get";
const SET_ENTRY = "journey/entry/set";
const SET_AVG_MOOD = "journey/mood/set";

const getEntries = (entries) => ({ type: GET_ENTRIES, payload: entries });
const setEntry = (entry) => ({ type: SET_ENTRY, payload: entry });
const getAvgMood = (avgMood) => ({ type: SET_AVG_MOOD, payload: avgMood });

export const createEntry = (entry, type) => async (dispatch) => {
  const res = await csrfFetch(`/api/journey/${type}`, {
    method: "POST",
    body: JSON.stringify(entry),
  });
  const data = await res.json();
  const add1 =
    type === "morning"
      ? { hasDayEntryToday: 1 }
      : type === "evening"
      ? { hasNightEntryToday: 1 }
      : null;
  dispatch(addEntry(add1));
  return data.id;
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

export const readAvgMood = () => async (dispatch) => {
  const data = await (await csrfFetch(`/api/journey/mood/avg`)).json();
  dispatch(getAvgMood(data));
};

const initialState = { avgMood: null, days: [], entry: {} };

/*

state shape: { 
   avgMood: number,

   days: {
    date: string,
     entries: Entry[]
   },

   entry: Entry,
  }

*/

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ENTRIES:
      return {
        avgMood: state.avgMood,
        days: action.payload,
        entry: state.entry,
      };
    case SET_ENTRY:
      return { ...state, entry: action.payload };
    case SET_AVG_MOOD:
      return { ...state, avgMood: action.payload };
    default:
      return state;
  }
};

export default reducer;
