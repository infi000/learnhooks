import { createContext } from "react";

export const initialState = {
  searchCondition: {
    name: "",
    age: ""
  }
};
export const StoreContext = createContext(null);
export const init = initialState => {
  return initialState;
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_SEARCH_CONDITION":
      return { ...state, ...action.payload };
    case "reset":
      return init(action.payload);
    default:
      throw new Error();
  }
};
