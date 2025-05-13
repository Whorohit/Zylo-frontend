import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { clearToast } from "../store/toastslice";
import "react-toastify/dist/ReactToastify.css";

const ToastNotifications = () => {
  const dispatch = useDispatch();
  const { message, type, show } = useSelector((state) => state.toast);

  useEffect(() => {
    if (show && message) {
      toast[type](message, {
        position: "top-right",
        autoClose: 3000,
      });
      dispatch(clearToast());
    }
  }, [show, message, type, dispatch]);

  return <ToastContainer />;
};

export default ToastNotifications;
