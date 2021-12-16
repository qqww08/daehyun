import { combineReducers } from "redux";

import { HYDRATE } from "next-redux-wrapper";

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };

    default: {
      const combineReducer = combineReducers({});
      return combineReducer(state, action);
    }
  }
};

export default rootReducer;
