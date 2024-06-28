import { createContext, useContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_MESSAGE":
      return action.payload;
    case "CLEAR_MESSAGE":
      return "";
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, "");

  const setNotification = (message, seconds) => {
    dispatch({ type: "SET_MESSAGE", payload: message });
    setTimeout(() => {
      dispatch({ type: "CLEAR_MESSAGE" });
    }, seconds * 1000);
  };

  return (
    <NotificationContext.Provider value={{ message: state, setNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  if (useContext(NotificationContext) === undefined)
    throw new Error("Context consumed outside of its provider");
  return useContext(NotificationContext);
};
