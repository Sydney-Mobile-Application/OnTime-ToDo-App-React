export const SET_TODO_DATA = "SET_TODO_DATA";

export const setToDoData = (data) => (dispatch) => {
  dispatch({
    type: SET_TODO_DATA,
    data: data,
  });
};

// export const setToDoData = (data) => ({
//   type: SET_TODO_DATA,
//   data: data,
// });
