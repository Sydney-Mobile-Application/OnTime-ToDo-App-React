import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import toDoDataReducer from "./reducers";

const rootReducer = combineReducers({ toDoDataReducer });

export const Store = createStore(rootReducer, applyMiddleware(thunk));
