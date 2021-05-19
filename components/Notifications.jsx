import { notification } from "antd";

const Notification = (type, message) => {
  notification[type]({
    message: message,
    description: "",
  });
};

export default Notification;
