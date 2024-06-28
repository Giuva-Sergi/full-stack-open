import { useNotificationContext } from "../contexts/NotificationContext";

const Notification = () => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  const { message } = useNotificationContext();

  return <div style={style}>{message}</div>;
};

export default Notification;
