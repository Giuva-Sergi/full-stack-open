import { createContext, useContext, useReducer } from "react";

const counterReducer = (state, action) => {
  switch (action.type) {
    case "INCREASE":
      return state + 1;
    case "DECREASE":
      if (state === 0) return 0;
      return state - 1;
    case "RESET":
      return 0;
    default:
      break;
  }
};

export const CounterContext = createContext();

export const CounterContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(counterReducer, 0);

  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      {children}
    </CounterContext.Provider>
  );
};

export const useCounterContext = () => {
  if (useContext(CounterContext) === undefined)
    throw new Error("CounterContext was used outside of its provider");
  return useContext(CounterContext);
};
