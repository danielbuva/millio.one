const SET_SHOW = "layout/setShow";

export const setShow = (show) => ({ type: SET_SHOW, payload: show });

const initialState = { show: true };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SHOW:
      return { show: action.payload };
    default:
      return state;
  }
};

export default reducer;
