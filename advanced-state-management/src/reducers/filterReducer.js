const filterReducer = function (state = "ALL", action) {
  switch (action.type) {
    case "SET_FILTER":
      return action.payload;
    default:
      return state;
  }
};

const filterChange = function (filter) {
  return {
    type: "SET_FILTER",
    payload: filter,
  };
};

export { filterReducer, filterChange };
