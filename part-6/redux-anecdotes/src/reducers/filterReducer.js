const filterReducer = function (state = "", action) {
  switch (action.type) {
    case "SET_FILTER":
      return action.payload;
    default:
      return state;
  }
};

const filter = (filter) => {
  return {
    type: "SET_FILTER",
    payload: filter,
  };
};

export { filterReducer, filter };
