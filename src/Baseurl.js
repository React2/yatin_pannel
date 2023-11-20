/** @format */

import { Store } from "react-notifications-component";

export const Baseurl = "https://wefast-logistic-backend-app.vercel.app";

export const Auth = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
  },
});
export const showMsg = (title, message, type) =>
  Store.addNotification({
    title: title,
    message: message,
    type: type,
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 3000,
      onScreen: true,
    },
  });
