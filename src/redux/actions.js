export const SET_TODO_DATA = "SET_TODO_DATA";
export const SET_PRIORITY_DATA = "SET_PRIORITY_DATA";
export const SET_DONE_DATA = "SET_DONE_DATA";
export const SET_PRIORITY_DASHBORD_DATA = "SET_PRIORITY_DASHBORD_DATA";

export const setToDoData = (data) => (dispatch) => {
  dispatch({
    type: SET_TODO_DATA,
    data: data,
  });
};

export const setPriorityData = (dataPriority) => (dispatch) => {
  dispatch({
    type: SET_PRIORITY_DATA,
    dataPriority: dataPriority,
  });
};

export const setPriorityDashboardData =
  (dataPriorityDashboard) => (dispatch) => {
    dispatch({
      type: SET_PRIORITY_DASHBORD_DATA,
      dataPriorityDashboard: dataPriorityDashboard,
    });
  };

export const setDoneData = (dataDone) => (dispatch) => {
  dispatch({
    type: SET_DONE_DATA,
    dataDone: dataDone,
  });
};
