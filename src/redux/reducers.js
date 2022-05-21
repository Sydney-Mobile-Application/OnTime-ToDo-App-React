import {
  SET_TODO_DATA,
  SET_PRIORITY_DATA,
  SET_DONE_DATA,
  SET_PRIORITY_DASHBORD_DATA,
} from "./actions";

const initState = {
  data: [],
  dataPriority: [],
  dataPriorityDashboard: [],
  dataDone: [],
};

function toDoDataReducer(state = initState, action) {
  switch (action.type) {
    case SET_TODO_DATA:
      return { ...state, data: action.data };
    case SET_PRIORITY_DATA:
      return { ...state, dataPriority: action.dataPriority };
    case SET_PRIORITY_DASHBORD_DATA:
      return { ...state, dataPriorityDashboard: action.dataPriorityDashboard };
    case SET_DONE_DATA:
      return { ...state, dataDone: action.dataDone };
    default:
      return state;
  }
}

export default toDoDataReducer;
