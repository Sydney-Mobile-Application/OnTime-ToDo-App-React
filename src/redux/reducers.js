import { SET_TODO_DATA } from "./actions";

const initState = {
  data: [],
};

function toDoDataReducer(state = initState, action) {
  switch (action.type) {
    case SET_TODO_DATA:
      return { ...state, data: action.data };
    default:
      return state;
  }
}

export default toDoDataReducer;
