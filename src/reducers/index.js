import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import Login from "./Login";

const reducers = combineReducers({ Login });

const store = () => {
  return createStore(reducers, composeWithDevTools());
};

export default store();
