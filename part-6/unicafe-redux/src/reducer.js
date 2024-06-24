const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GOOD":
      return {
        ...state,
        good: state.good + 1,
      };
    case "OK":
      return {
        ...state,
        ok: state.ok + 1,
      };
    case "BAD":
      return {
        ...state,
        bad: state.bad + 1,
      };
    case "ZERO":
      return {
        ...state,
        good: 0,
        ok: 0,
        bad: 0,
      };
    default:
      return state;
  }
};

const increaseGood = () => {
  return {
    type: "GOOD",
  };
};

const increaseBad = () => {
  return {
    type: "BAD",
  };
};

const increaseOk = () => {
  return {
    type: "OK",
  };
};

const reset = () => {
  return {
    type: "ZERO",
  };
};

const getOk = (store) => {
  return store.getState().ok;
};

const getGood = (store) => {
  return store.getState().good;
};

const getBad = (store) => {
  return store.getState().bad;
};

export {
  reducer,
  increaseBad,
  increaseGood,
  increaseOk,
  reset,
  getOk,
  getGood,
  getBad,
};
